-- ============================================================
-- Oels — booking storage
-- Run this once in the Supabase SQL editor.
--
-- REGION: create the Supabase project in London (eu-west-2) or an EEA
-- region BEFORE running this. The site claims UK and EEA data residency
-- on six pages. A project created in the default US region makes that
-- claim false, and it cannot be changed after creation without
-- rebuilding the project.
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 1. The table
-- ------------------------------------------------------------
create table if not exists public.bookings (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  slot_date    date not null,
  slot_time    text not null,

  name         text not null,
  firm         text,
  email        text not null,
  interest     text,

  -- operational, not marketing
  status       text not null default 'new',
  notes        text,

  constraint bookings_name_len   check (char_length(name)  between 1 and 120),
  constraint bookings_firm_len   check (firm is null or char_length(firm) <= 160),
  constraint bookings_email_len  check (char_length(email) between 5 and 254),
  constraint bookings_email_shape check (email ~* '^[^@\s]+@[^@\s.]+\.[^@\s]+$'),
  constraint bookings_time_shape check (slot_time ~ '^[0-2][0-9]:[0-5][0-9]$'),
  constraint bookings_interest_len check (interest is null or char_length(interest) <= 120),
  constraint bookings_status_ok   check (status in ('new','confirmed','held','cancelled')),

  -- one demo per slot. The client turns the resulting 23505 into
  -- "that slot has just gone" rather than a generic failure.
  constraint bookings_slot_unique unique (slot_date, slot_time)
);

-- Do not accept bookings in the past or absurdly far ahead.
create or replace function public.bookings_guard()
returns trigger language plpgsql as $$
begin
  if new.slot_date < current_date then
    raise exception 'slot_date is in the past';
  end if;
  if new.slot_date > current_date + interval '120 days' then
    raise exception 'slot_date is too far ahead';
  end if;
  -- never let a client set these
  new.status := 'new';
  new.notes  := null;
  return new;
end $$;

drop trigger if exists bookings_guard on public.bookings;
create trigger bookings_guard
  before insert on public.bookings
  for each row execute function public.bookings_guard();

create index if not exists bookings_slot_idx on public.bookings (slot_date, slot_time);

-- ------------------------------------------------------------
-- 2. Row level security
--
-- The anon key ships inside the page. It is designed to be public, and
-- it is only safe because of what follows. Anonymous callers may INSERT
-- and nothing else: no select, no update, no delete. With RLS enabled
-- and no SELECT policy, a stolen anon key cannot read a single booking.
-- ------------------------------------------------------------
alter table public.bookings enable row level security;

drop policy if exists "anon may create a booking" on public.bookings;
create policy "anon may create a booking"
  on public.bookings
  for insert
  to anon
  with check (true);

-- Deliberately absent: any SELECT, UPDATE or DELETE policy for anon or
-- authenticated. Read bookings in the Supabase dashboard, or with the
-- service_role key from a server you control. NEVER put the service_role
-- key in this website.

-- ------------------------------------------------------------
-- 3. Which slots are already taken
--
-- The calendar has to grey out taken slots, but anon cannot read the
-- table. This function returns times only: no name, no firm, no email.
-- security definer lets it read the table; the narrow return type is
-- what makes that safe.
-- ------------------------------------------------------------
create or replace function public.booked_slots(from_date date, to_date date)
returns table (slot_date date, slot_time text)
language sql
security definer
set search_path = public
stable
as $$
  select b.slot_date, b.slot_time
  from public.bookings b
  where b.slot_date between from_date and to_date
    and b.status <> 'cancelled'
$$;

revoke all on function public.booked_slots(date, date) from public;
grant execute on function public.booked_slots(date, date) to anon;

-- ------------------------------------------------------------
-- 4. Retention
--
-- The privacy notice says demo enquiries that do not become clients are
-- deleted after 12 months. That promise needs something that actually
-- deletes them. Run this from a scheduled job (pg_cron) or a monthly
-- calendar reminder, but do run it: an unkept retention promise is
-- worse than no promise.
--
--   select cron.schedule('purge-bookings','0 3 1 * *',
--     $$ select public.purge_old_bookings() $$);
-- ------------------------------------------------------------
create or replace function public.purge_old_bookings()
returns integer language plpgsql security definer
set search_path = public as $$
declare n integer;
begin
  delete from public.bookings
  where created_at < now() - interval '12 months'
    and status <> 'confirmed';
  get diagnostics n = row_count;
  return n;
end $$;

revoke all on function public.purge_old_bookings() from public;
-- no grant to anon: this is yours to run, not the website's.
