export type InBodyScan = {
  id: string;
  created_at: string;
  fecha_scan: string;
  imagen_url: string | null;
  peso: number | null;
  porcentaje_grasa: number | null;
  masa_muscular: number | null;
  masa_grasa: number | null;
  imc: number | null;
  grasa_visceral: number | null;
  agua_corporal: number | null;
  proteina_kg: number | null;
  mineral_kg: number | null;
  metabolismo_basal: number | null;
};

export type MealEntry = {
  id: string;
  fecha: string;
  slot: string;
  nombre: string;
  calorias: number;
  proteina: number;
  carbohidratos: number;
  grasas: number;
};

export function isSupabaseConfigured(): boolean {
  return true;
}

export function getSupabase() {
  return null;
}

export function saveMealEntry(entry: Omit<MealEntry, "id">): MealEntry {
  const newEntry = { ...entry, id: Date.now().toString() };
  const key = `meals_${entry.fecha}`;
  const existing: MealEntry[] = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push(newEntry);
  localStorage.setItem(key, JSON.stringify(existing));
  return newEntry;
}

export function getMealsByDate(fecha: string): MealEntry[] {
  return JSON.parse(localStorage.getItem(`meals_${fecha}`) || "[]");
}

export function deleteMealEntry(fecha: string, id: string): void {
  const key = `meals_${fecha}`;
  const existing: MealEntry[] = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify(existing.filter((e) => e.id !== id)));
}

export function saveInBodyScan(scan: Omit<InBodyScan, "id" | "created_at">): InBodyScan {
  const newScan = {
    ...scan,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  };
  const existing: InBodyScan[] = JSON.parse(localStorage.getItem("inbody_scans") || "[]");
  existing.unshift(newScan);
  localStorage.setItem("inbody_scans", JSON.stringify(existing));
  return newScan;
}

export function getInBodyScans(): InBodyScan[] {
  return JSON.parse(localStorage.getItem("inbody_scans") || "[]");
}