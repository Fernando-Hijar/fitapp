import type { InBodyAnalysisResult } from "@/types";

export function mapAnalysisToScanFields(data: InBodyAnalysisResult) {
  return {
    peso: data.peso,
    porcentaje_grasa: data.porcentajeGrasa,
    masa_muscular: data.masaMuscular,
    masa_grasa: data.masaGrasa,
    imc: data.imc,
    grasa_visceral: data.grasaVisceral,
    agua_corporal: data.aguaCorporal,
    proteina_kg: data.proteinaKg,
    mineral_kg: data.mineralKg,
    metabolismo_basal: data.metabolismoBasal,
  };
}

export function generarFeedback(
  scan: { peso: number | null; porcentaje_grasa: number | null; masa_muscular: number | null },
  anterior?: { peso: number | null; porcentaje_grasa: number | null; masa_muscular: number | null }
): string {
  if (!anterior?.peso || !scan.peso) {
    return "¡Primer registro guardado! Aquí empieza el seguimiento.";
  }

  const pesoGanado = (scan.peso ?? 0) - (anterior.peso ?? 0);
  const grasaCambio = (scan.porcentaje_grasa ?? 0) - (anterior.porcentaje_grasa ?? 0);
  const musculoGanado = (scan.masa_muscular ?? 0) - (anterior.masa_muscular ?? 0);

  if (musculoGanado > 0 && grasaCambio < 1) {
    return `¡Excelente lean bulk! +${musculoGanado.toFixed(1)} kg de músculo puro.`;
  }
  if (pesoGanado > 0 && musculoGanado > 0) {
    return `Vas bien. +${pesoGanado.toFixed(1)} kg totales, +${musculoGanado.toFixed(1)} kg de músculo.`;
  }
  if (pesoGanado <= 0) {
    return "Sin cambio de peso. Revisa si estás llegando a las 3300 kcal diarias.";
  }
  return "Progreso registrado. Sigue consistente con el plan.";
}
