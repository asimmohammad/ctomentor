-- Vigil / Helix Platform qualification leads — SEPARATE from advisory pipeline.
create table if not exists public.vigil_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  role text not null,
  stack_summary text not null,
  release_cadence text not null,
  pain text not null,
  user_agent text,
  notified_at timestamptz
);

create index if not exists vigil_leads_created_at_idx
  on public.vigil_leads (created_at desc);

alter table public.vigil_leads enable row level security;

revoke all on table public.vigil_leads from anon, authenticated;
grant all on table public.vigil_leads to service_role;
