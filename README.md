# Chartink coming-soon website

A trader-focused coming-soon experience for Chartink with a secure early-access signup flow backed by Supabase.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Fill in the Supabase values when available.
3. Run the app:

```bash
npm run dev
```

Open http://localhost:3000.

## Required environment variables

The signup route needs a Supabase project URL and service-role key. Set either `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`, plus `SUPABASE_SERVICE_ROLE_KEY`. The service-role key is server-only and must never use a `NEXT_PUBLIC_` prefix.

For local development, put these in `.env.local`:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CONTACT_EMAIL=hello@chartink.si
```

The `SUPABASE_SERVICE_ROLE_KEY` must remain on the server only. It must never be exposed to the browser.

The landing page shows an animated development tracker instead of a launch date or percentage, so it does not promise a timeline before one is set.

## Supabase setup

1. Create a Supabase project.
2. In the Supabase dashboard, open **SQL Editor**, paste the contents of `supabase/migrations/20261010_create_early_access_signups.sql`, and run it.
3. In **Project Settings → API**, copy the project URL and the `service_role` key. Keep the key private.
4. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` for local testing and in Vercel for production.
5. The form stores submitted addresses in `early_access_signups`. It does not send confirmation or notification emails; an email delivery provider would need to be added for that.

## Database migration

The migration creates the `public.early_access_signups` table and enforces:

- UUID primary key
- required email field
- lowercase normalized unique index
- created timestamp
- source and status defaults
- no public read/update/delete access
- public insert access for the landing page signup route

## Production deployment

This project is set up for Vercel deployment:

1. Push the project to GitHub.
2. Sign in to Vercel, choose **Add New → Project**, and import the repository.
3. In **Project Settings → Environment Variables**, add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for Production (and Preview if you want signup enabled on preview deployments).
4. Deploy the project. Vercel will provide a temporary `*.vercel.app` URL to test.
5. In **Project Settings → Domains**, add your domain and follow the DNS records Vercel displays. At your domain registrar, create those records exactly; DNS changes can take time to propagate.
6. Set `chartink.si` as the primary domain in Vercel and configure its DNS records at your registrar. The canonical URL is configured in `lib/site-config.ts`.
7. After DNS is verified and the deployment is live, submit a test address and confirm a row appears in Supabase **Table Editor → early_access_signups**.

## Verification status

The landing page and build were checked in the local environment. Database integration has not been live-tested because the workspace does not contain valid Supabase credentials.

## Future email provider hook
The signup currently saves addresses to Supabase but does not send emails. To send confirmation or owner notification emails, add an email delivery provider in the server route and keep its API key server-side.
