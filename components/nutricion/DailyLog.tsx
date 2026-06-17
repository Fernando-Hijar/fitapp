"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import type { Platillo, RegistroComida, SlotComidaId } from "@/types";
import { SLOT_LABELS } from "@/lib/constants/meals";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
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
  const [registros, setRegistros] = useState<RegistroComida[]>([]);
  const [loading, setLoading] = useState(true);

  const fechaStr = formatDateISO(fecha);

  const loadRegistros = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setRegistros([]);
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setRegistros([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("registro_comidas")
      .select("*")
      .eq("fecha", fechaStr)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setRegistros(data as RegistroComida[]);
    }
    setLoading(false);
  }, [fechaStr]);

  useEffect(() => {
    loadRegistros();
  }, [loadRegistros, refreshKey]);

  const totals = useMemo(
    () =>
      registros.reduce(
        (acc, r) => ({
          calorias: acc.calorias + (r.calorias ?? 0),
          proteina: acc.proteina + Number(r.proteina ?? 0),
          carbohidratos: acc.carbohidratos + Number(r.carbohidratos ?? 0),
          grasas: acc.grasas + Number(r.grasas ?? 0),
        }),
        { calorias: 0, proteina: 0, carbohidratos: 0, grasas: 0 }
      ),
    [registros]
  );

  const grouped = useMemo(() => {
    const slots: SlotComidaId[] = [
      "desayuno",
      "mediaManana",
      "comida",
      "postEntreno",
      "cena",
    ];
    return slots
      .map((slot) => ({
        slot,
        items: registros.filter((r) => r.slot === slot),
      }))
      .filter((g) => g.items.length > 0);
  }, [registros]);

  async function handleDelete(id: string) {
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase.from("registro_comidas").delete().eq("id", id);
    if (!error) {
      setRegistros((prev) => prev.filter((r) => r.id !== id));
    }
  }

  function shiftDay(delta: number) {
    setFecha((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + delta);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftDay(-1)}
          className="rounded-lg p-2 text-text-secondary hover:bg-bg-elevated"
          aria-label="Día anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="text-sm font-medium capitalize text-text-primary">
          {formatDisplayDate(fecha)}
        </p>
        <button
          type="button"
          onClick={() => shiftDay(1)}
          className="rounded-lg p-2 text-text-secondary hover:bg-bg-elevated"
          aria-label="Día siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <MacroSummary totals={totals} />

      {!isSupabaseConfigured() && (
        <p className="rounded-xl border border-bronze-border bg-bronze-subtle p-3 text-xs text-bronze">
          Configura Supabase en .env.local para guardar tu registro de comidas.
        </p>
      )}

      {loading ? (
        <p className="text-center text-sm text-text-muted">Cargando...</p>
      ) : registros.length === 0 ? (
        <div className="rounded-2xl border border-border bg-bg-card p-8 text-center">
          <p className="text-sm text-text-secondary">
            No hay registros para este día.
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Agrega platillos desde &quot;Mis opciones&quot;
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {grouped.map(({ slot, items }) => (
            <div key={slot}>
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-bronze">
                {SLOT_LABELS[slot]}
              </p>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-bg-card px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-text-muted">
                        {item.calorias ?? 0} kcal
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-2 text-text-muted hover:bg-bg-elevated hover:text-red-400"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function addPlatilloToLog(platillo: Platillo, slot: SlotComidaId) {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: "Supabase no configurado" };
  }

  const fecha = formatDateISO(new Date());
  const { error } = await supabase.from("registro_comidas").insert({
    fecha,
    slot,
    nombre: platillo.nombre,
    calorias: platillo.calorias,
    proteina: platillo.proteina,
    carbohidratos: platillo.carbohidratos,
    grasas: platillo.grasas,
  });

  return { success: !error, error: error?.message };
}
