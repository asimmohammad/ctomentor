-- Bookings from Cal.com webhooks — service-role writes only.
-- Apply with: supabase db push / SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  cal_uid text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null check (status in ('created', 'rescheduled', 'cancelled')),
  scheduled_at timestamptz,
  name text,
  email text,
  company text,
  driver text,
  assessment_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  raw jsonb
);

create unique index if not exists bookings_cal_uid_uidx on public.bookings (cal_uid);

create index if not exists bookings_scheduled_at_idx on public.bookings (scheduled_at desc);

create index if not exists bookings_email_idx on public.bookings (lower(email));

create index if not exists bookings_assessment_id_idx on public.bookings (assessment_id);

alter table public.bookings enable row level security;

revoke all on table public.bookings from anon, authenticated;
grant all on table public.bookings to service_role;
