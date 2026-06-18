"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { getMealsByDate, deleteMealEntry, saveMealEntry } from "@/lib/supabase";
import type { Platillo } from "@/types";
import type { SlotComidaId } from "@/types";
import MacroSummary from "./MacroSummary";

function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

type Props = {
  refreshKey?: number;
};

export default function DailyLog({ refreshKey = 0 }: Props) {
  const [fecha, setFecha] = useState(() => new Date());
  const [registros, setRegistros] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fechaStr = formatDateISO(fecha);

  const loadRegistros = useCallback(() => {
    setLoading(true);
    const data = getMealsByDate(fechaStr);
    setRegistros(data);
    setLoading(false);
  }, [fechaStr]);

  useEffect(() => {
    loadRegistros();
  }, [loadRegistros, refreshKey]);

  const handleDelete = (id: string) => {
    deleteMealEntry(fechaStr, id);
    loadRegistros();
  };

  const totales = registros.reduce(
    (acc, r) => ({
      calorias: acc.calorias + (r.calorias || 0),
      proteina: acc.proteina + (r.proteina || 0),
      carbohidratos: acc.carbohidratos + (r.carbohidratos || 0),
      grasas: acc.grasas + (r.grasas || 0),
    }),
    { calorias: 0, proteina: 0, carbohidratos: 0, grasas: 0 }
  );

  const cambiarDia = (dias: number) => {
    const nueva = new Date(fecha);
    nueva.setDate(nueva.getDate() + dias);
    setFecha(nueva);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => cambiarDia(-1)}
          className="p-2 rounded-xl bg-bg-elevated text-text-secondary hover:text-text-primary"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-medium text-text-primary capitalize">
          {formatDisplayDate(fecha)}
        </span>
        <button
          onClick={() => cambiarDia(1)}
          className="p-2 rounded-xl bg-bg-elevated text-text-secondary hover:text-text-primary"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <MacroSummary totales={totales} />

      {loading ? (
        <p className="text-text-muted text-sm text-center py-4">Cargando...</p>
      ) : registros.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted text-sm">Nada registrado aún.</p>
          <p className="text-text-muted text-xs mt-1">
            Elige tus opciones en la pestaña anterior.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {registros.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between bg-bg-card border border-border rounded-xl px-4 py-3"
            >
              <div>
                <p className="text-text-primary text-sm font-medium">{r.nombre}</p>
                <p className="text-text-muted text-xs mt-0.5">
                  {r.calorias} kcal · {r.proteina}g P · {r.carbohidratos}g C · {r.grasas}g G
                </p>
              </div>
              <button
                onClick={() => handleDelete(r.id)}
                className="text-text-muted hover:text-red-400 p-1"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function addPlatilloToLog(platillo: Platillo, slot: SlotComidaId) {
  const today = formatDateISO(new Date());
  const result = saveMealEntry({
    fecha: today,
    slot,
    nombre: platillo.nombre,
    calorias: platillo.calorias,
    proteina: platillo.proteina,
    carbohidratos: platillo.carbohidratos,
    grasas: platillo.grasas,
  });
  return { success: true, data: result };
}