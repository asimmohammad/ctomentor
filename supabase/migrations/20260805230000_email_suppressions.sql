-- Unsubscribe / suppression list — service-role writes only.
-- Backs /unsubscribe and the mail-merge suppression export.
create extension if not exists "pgcrypto";

create table if not exists public.email_suppressions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  email text not null,
  source text,
  campaign text,
  reason text,
  user_agent text
);

create unique index if not exists email_suppressions_email_uidx
  on public.email_suppressions (lower(email));

create index if not exists email_suppressions_created_at_idx
  on public.email_suppressions (created_at desc);

alter table public.email_suppressions enable row level security;

revoke all on table public.email_suppressions from anon, authenticated;
grant all on table public.email_suppressions to service_role;
