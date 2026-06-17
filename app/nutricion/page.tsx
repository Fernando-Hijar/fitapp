"use client";

import { useState } from "react";
import { USER_PROFILE } from "@/lib/constants/profile";
import type { Platillo, SlotComidaId } from "@/types";
import DailyLog, { addPlatilloToLog } from "@/components/nutricion/DailyLog";
import MealSlotSection from "@/components/nutricion/MealSlot";

export default function NutricionPage() {
  const [tab, setTab] = useState<"opciones" | "registro">("opciones");
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  async function handleAdd(platillo: Platillo, slot: SlotComidaId) {
    const result = await addPlatilloToLog(platillo, slot);
    if (result.success) {
      setToast(`${platillo.nombre} agregado al registro de hoy`);
      setRefreshKey((k) => k + 1);
      setTimeout(() => setToast(null), 2500);
    } else {
      setToast(result.error ?? "No se pudo agregar");
      setTimeout(() => setToast(null), 3000);
    }
  }

  return (
    <main className="px-4 pt-6">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">Nutrición</h1>
        <p className="mt-1 text-sm font-medium uppercase tracking-wide text-bronze">
          {USER_PROFILE.enfoque}
        </p>
      </header>

      <div className="mb-6 flex rounded-xl bg-bg-elevated p-1">
        <button
          type="button"
          onClick={() => setTab("opciones")}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            tab === "opciones"
              ? "bg-bronze text-black"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Mis opciones
        </button>
        <button
          type="button"
          onClick={() => setTab("registro")}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            tab === "registro"
              ? "bg-bronze text-black"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Registro de hoy
        </button>
      </div>

      {tab === "opciones" ? (
        <MealSlotSection onAdd={handleAdd} />
      ) : (
        <DailyLog refreshKey={refreshKey} />
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 max-w-[380px] -translate-x-1/2 rounded-xl border border-bronze-border bg-bg-elevated px-4 py-3 text-center text-sm text-text-primary shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
