"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "already-registered"
  | "invalid"
  | "rate-limited"
  | "error";

const messageMap: Record<SubmitStatus, { title: string; detail: string }> = {
  idle: {
    title: "",
    detail: "",
  },
  submitting: {
    title: "Submitting...",
    detail: "Hold tight while we save your spot.",
  },
  success: {
    title: "YOU'RE ON THE LIST.",
    detail: "We'll let you know when there's something worth seeing.",
  },
  "already-registered": {
    title: "THIS ADDRESS IS ALREADY REGISTERED.",
    detail: "We have your details, and we'll be in touch when the next chapter begins.",
  },
  invalid: {
    title: "PLEASE CHECK YOUR EMAIL.",
    detail: "Use a valid email address to join the early-access list.",
  },
  "rate-limited": {
    title: "TOO MANY ATTEMPTS.",
    detail: "Please wait a moment before trying again.",
  },
  error: {
    title: "SOMETHING WENT WRONG.",
    detail: "Please try again in a moment.",
  },
};

export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus("invalid");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        status?: SubmitStatus;
        message?: string;
      };

      if (response.ok && payload.status === "success") {
        setEmail("");
        setStatus("success");
        return;
      }

      if (payload.status === "already-registered") {
        setStatus("already-registered");
        return;
      }

      if (payload.status === "invalid") {
        setStatus("invalid");
        return;
      }

      if (payload.status === "rate-limited") {
        setStatus("rate-limited");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const message = messageMap[status];
  const showMessage = status !== "idle" && status !== "submitting";

  return (
    <form onSubmit={handleSubmit} className="early-form" noValidate>
      <div className="early-form-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="early-form-input"
          aria-invalid={status === "invalid" || status === "error"}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="early-form-submit"
        >
          {status === "submitting" ? "SENDING..." : "REQUEST ACCESS"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <p className="early-form-caption">
        No noise in your inbox. Just your invitation when we&apos;re ready.
      </p>

      <div aria-live="polite" className="early-form-feedback">
        {showMessage ? (
          <div className="early-form-message">
            <p className="early-form-message-title">
              {message.title}
            </p>
            <p className="early-form-message-detail">{message.detail}</p>
          </div>
        ) : null}
      </div>

      <p className="early-form-privacy">
        We only use your email address for launch and product updates. See our
        <Link href="/privacy-policy">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
