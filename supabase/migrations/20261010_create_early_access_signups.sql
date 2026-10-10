create extension if not exists pgcrypto;

create table if not exists public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  source text not null default 'coming-soon',
  status text not null default 'subscribed',
  constraint early_access_signups_email_not_blank check (length(trim(email)) > 0)
);

create unique index if not exists early_access_signups_email_normalized_idx
  on public.early_access_signups (lower(trim(email)));

alter table public.early_access_signups enable row level security;

create policy "Public can insert signup records"
on public.early_access_signups
for insert
with check (true);

create policy "Public cannot read signup records"
on public.early_access_signups
for select
using (false);

create policy "Public cannot update signup records"
on public.early_access_signups
for update
using (false)
with check (false);

create policy "Public cannot delete signup records"
on public.early_access_signups
for delete
using (false);

grant usage on schema public to anon;
grant insert on table public.early_access_signups to anon;
grant select, update, delete on table public.early_access_signups to authenticated;
