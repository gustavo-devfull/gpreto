-- Admins do painel (#/admin) + permissões de upload e de edição do conteúdo.
-- Rode no Supabase: SQL Editor (projeto tumbrwxliqwzjyaipclj) > New query > Run.
-- Pode rodar mais de uma vez.

-- 1) lista de admins (por e-mail)
create table if not exists public.admins (email text primary key);
alter table public.admins enable row level security;  -- sem policies: só o servidor/SQL Editor mexe
insert into public.admins (email) values ('gutopc@me.com') on conflict do nothing;
-- para incluir outro admin:  insert into public.admins (email) values ('outro@email.com');

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where lower(email) = lower(auth.jwt() ->> 'email'));
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- 2) bucket público das imagens (BUCKET = 'site-media')
insert into storage.buckets (id, name, public) values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

drop policy if exists "site-media leitura publica" on storage.objects;
create policy "site-media leitura publica" on storage.objects for select using (bucket_id = 'site-media');

-- (remove a versão anterior, que liberava qualquer usuário logado)
drop policy if exists "site-media admin insert" on storage.objects;
drop policy if exists "site-media admin update" on storage.objects;
drop policy if exists "site-media admin delete" on storage.objects;
create policy "site-media admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.is_admin());
create policy "site-media admin update" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.is_admin()) with check (bucket_id = 'site-media' and public.is_admin());
create policy "site-media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.is_admin());

-- 3) conteúdo do site (tabela site_content): leitura pública, escrita só admin
alter table public.site_content enable row level security;
drop policy if exists "site_content leitura publica" on public.site_content;
create policy "site_content leitura publica" on public.site_content for select using (true);
drop policy if exists "site_content admin escreve" on public.site_content;
create policy "site_content admin escreve" on public.site_content for all to authenticated using (public.is_admin()) with check (public.is_admin());
