-- Corrige "new row violates row-level security policy" no envio de imagens do admin.
-- Rode no Supabase: SQL Editor (projeto tumbrwxliqwzjyaipclj) > New query > Run.

-- 1) garante o bucket público usado pelo admin (BUCKET = 'site-media')
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

-- 2) leitura pública das imagens
drop policy if exists "site-media leitura publica" on storage.objects;
create policy "site-media leitura publica" on storage.objects
  for select using (bucket_id = 'site-media');

-- 3) quem está logado (admin) pode enviar, trocar e apagar
drop policy if exists "site-media admin insert" on storage.objects;
create policy "site-media admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media');

drop policy if exists "site-media admin update" on storage.objects;
create policy "site-media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'site-media') with check (bucket_id = 'site-media');

drop policy if exists "site-media admin delete" on storage.objects;
create policy "site-media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site-media');
