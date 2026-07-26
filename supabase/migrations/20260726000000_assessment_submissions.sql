-- Assessment submissions — service-role writes only (RLS enabled, no anon policies).
-- Apply with: supabase db push / SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  variant text not null check (variant in ('investor', 'engineering')),
  answers jsonb not null default '{}'::jsonb,
  dimension_scores jsonb not null default '[]'::jsonb,
  overall_score integer not null check (overall_score >= 0 and overall_score <= 100),
  tier text not null,
  email text not null,
  name text not null,
  company text not null,
  role text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  user_agent text,
  pdf_url text,
  notified_at timestamptz,
  payload_hash text,
  updated_at timestamptz not null default now()
);

create unique index if not exists assessment_submissions_email_variant_uidx
  on public.assessment_submissions (lower(email), variant);

create index if not exists assessment_submissions_created_at_idx
  on public.assessment_submissions (created_at desc);

create index if not exists assessment_submissions_payload_hash_idx
  on public.assessment_submissions (payload_hash, created_at desc);

create index if not exists assessment_submissions_overall_score_idx
  on public.assessment_submissions (overall_score);

alter table public.assessment_submissions enable row level security;

-- No policies for anon/authenticated — only service_role bypasses RLS.
revoke all on table public.assessment_submissions from anon, authenticated;
grant all on table public.assessment_submissions to service_role;

-- Storage bucket for assessment PDFs (private; signed URLs for delivery).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'assessment-pdfs',
  'assessment-pdfs',
  false,
  10485760,
  array['application/pdf']
)
on conflict (id) do nothing;

-- Block public storage access; service role uploads only.
drop policy if exists "assessment_pdfs_no_public_read" on storage.objects;
create policy "assessment_pdfs_no_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id <> 'assessment-pdfs');
