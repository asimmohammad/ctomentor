-- Briefing email-gate unlocks (paid-ad destinations). Service-role writes only.
create table if not exists public.briefing_unlocks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  role text not null,
  slug text not null,
  title text not null,
  user_agent text
);

create index if not exists briefing_unlocks_created_at_idx
  on public.briefing_unlocks (created_at desc);

create index if not exists briefing_unlocks_slug_idx
  on public.briefing_unlocks (slug);

alter table public.briefing_unlocks enable row level security;

revoke all on table public.briefing_unlocks from anon, authenticated;
grant all on table public.briefing_unlocks to service_role;
