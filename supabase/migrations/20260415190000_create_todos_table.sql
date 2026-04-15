create table if not exists public.todos (
  id          uuid primary key default gen_random_uuid(),
  description text             not null,
  completed   boolean          not null default false,
  created_at  timestamptz      not null default now()
);

alter table public.todos enable row level security;

-- Sin autenticación de usuarios por ahora: acceso público completo via anon key
create policy "Allow anon select"  on public.todos for select using (true);
create policy "Allow anon insert"  on public.todos for insert with check (true);
create policy "Allow anon update"  on public.todos for update using (true) with check (true);
create policy "Allow anon delete"  on public.todos for delete using (true);
