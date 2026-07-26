-- Engagement applications (/engage) — service-role writes only.
create table if not exists public.engage_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  role text not null,
  stage text not null,
  challenge text not null,
  budget text not null,
  timeline text not null,
  attribution text not null,
  equity_alignment text,
  company_website text,
  phone text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  user_agent text,
  notified_at timestamptz
);

create index if not exists engage_submissions_created_at_idx
  on public.engage_submissions (created_at desc);

create index if not exists engage_submissions_email_idx
  on public.engage_submissions (lower(email));

alter table public.engage_submissions enable row level security;

revoke all on table public.engage_submissions from anon, authenticated;
grant all on table public.engage_submissions to service_role;
