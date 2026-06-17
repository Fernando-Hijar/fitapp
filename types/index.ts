export type DiaSemana = "lunes" | "martes" | "miercoles" | "jueves" | "viernes";

export type SlotComidaId =
  | "desayuno"
  | "mediaManana"
  | "comida"
  | "postEntreno"
  | "cena";

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

export type InBodyAnalysisResult = {
  peso: number | null;
  porcentajeGrasa: number | null;
  masaMuscular: number | null;
  masaGrasa: number | null;
  imc: number | null;
  grasaVisceral: number | null;
  aguaCorporal: number | null;
  proteinaKg: number | null;
  mineralKg: number | null;
  metabolismoBasal: number | null;
};

export type RegistroComida = {
  id: string;
  created_at: string;
  fecha: string;
  slot: SlotComidaId;
  nombre: string;
  calorias: number | null;
  proteina: number | null;
  carbohidratos: number | null;
  grasas: number | null;
};

export type Ejercicio = {
  nombre: string;
  series: string;
  nota: string;
  destacado?: boolean;
};

export type BloqueRutina = {
  nombre: string;
  ejercicios?: Ejercicio[];
  tipo?: "abs-corto" | "abs-completo" | "nota-especial";
  nota?: string;
};

export type Platillo = {
  id: string;
  nombre: string;
  tags: string[];
  calorias: number;
  proteina: number;
  carbohidratos: number;
  grasas: number;
  ingredientes: {
    nombre: string;
    cantidad: string;
    proteina: number;
    carbohidratos: number;
    grasas: number;
  }[];
  nota?: string;
};

export type SlotComida = {
  id: SlotComidaId;
  hora: string;
  nombre: string;
  opciones: Platillo[];
};
