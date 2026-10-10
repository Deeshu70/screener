import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .transform((value) => value.toLowerCase())
  .pipe(z.string().email());

const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 5;
const rateLimitStore = new Map<string, number[]>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const attempts = rateLimitStore.get(ip) ?? [];
  const recentAttempts = attempts.filter((timestamp) => now - timestamp < rateLimitWindowMs);

  if (recentAttempts.length >= rateLimitMaxRequests) {
    rateLimitStore.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  rateLimitStore.set(ip, recentAttempts);
  return false;
}

function getSupabaseAdminClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    console.error("Supabase configuration is missing for the early-access signup route.");
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (contentLength > 1024) {
      return NextResponse.json(
        {
          status: "invalid",
          message: "The request is too large.",
        },
        { status: 413 },
      );
    }

    const ip = getClientIp(request);
    if (checkRateLimit(ip)) {
      return NextResponse.json(
        {
          status: "rate-limited",
          message: "Too many attempts. Please try again shortly.",
        },
        { status: 429 },
      );
    }

    const payload = (await request.json().catch(() => ({}))) as { email?: string };
    const parsedEmail = emailSchema.safeParse(payload.email);

    if (!parsedEmail.success) {
      return NextResponse.json(
        {
          status: "invalid",
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const email = parsedEmail.data;
    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      return NextResponse.json(
        {
          status: "error",
          message: "Signup is temporarily unavailable. Please try again later.",
        },
        { status: 503 },
      );
    }

    const { error } = await supabase.from("early_access_signups").insert({
      email,
      source: "coming-soon",
      status: "subscribed",
    });

    if (error) {
      const code = error.code ?? "";
      const message = String(error.message ?? "").toLowerCase();

      if (code === "23505" || message.includes("duplicate") || message.includes("unique")) {
        return NextResponse.json(
          {
            status: "already-registered",
            message: "This address is already on the list.",
          },
          { status: 200 },
        );
      }

      console.error("Supabase signup insertion failed", {
        code,
        message: error.message,
      });

      return NextResponse.json(
        {
          status: "error",
          message: "Signup is temporarily unavailable. Please try again later.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "YOU'RE ON THE LIST.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected early-access signup error", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Signup is temporarily unavailable. Please try again later.",
      },
      { status: 500 },
    );
  }
}
