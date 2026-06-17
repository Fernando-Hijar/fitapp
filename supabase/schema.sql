create table inbody_scans (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  fecha_scan date not null,
  imagen_url text,
  peso numeric,
  porcentaje_grasa numeric,
  masa_muscular numeric,
  masa_grasa numeric,
  imc numeric,
  grasa_visceral numeric,
  agua_corporal numeric,
  proteina_kg numeric,
  mineral_kg numeric,
  metabolismo_basal integer
);

create table registro_comidas (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  fecha date not null,
  slot text not null,
  nombre text not null,
  calorias integer,
  proteina numeric,
  carbohidratos numeric,
  grasas numeric
);

-- Crear bucket público "inbody" en Supabase Dashboard > Storage para las imágenes.
