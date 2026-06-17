"use client";

import { useState } from "react";
import type { Platillo, SlotComidaId } from "@/types";
import { SLOTS_COMIDA } from "@/lib/constants/meals";
import MealOptionCard from "./MealOptionCard";

type Props = {
  onAdd: (platillo: Platillo, slot: SlotComidaId) => void;
};

export default function MealSlotSection({ onAdd }: Props) {
  const [openSlot, setOpenSlot] = useState<string | null>(SLOTS_COMIDA[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {SLOTS_COMIDA.map((slot) => {
        const isOpen = openSlot === slot.id;
        return (
          <div
            key={slot.id}
            className="overflow-hidden rounded-2xl border border-border bg-bg-card"
          >
            <button
              type="button"
              onClick={() => setOpenSlot(isOpen ? null : slot.id)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div>
                <p className="font-medium text-text-primary">{slot.nombre}</p>
                <p className="text-xs text-text-muted">{slot.hora}</p>
              </div>
              <span className="text-xs text-bronze">
                {slot.opciones.length} opciones
              </span>
            </button>
            {isOpen && (
              <div className="space-y-3 border-t border-border p-4 transition-all duration-200">
                {slot.opciones.map((platillo) => (
                  <MealOptionCard
                    key={platillo.id}
                    platillo={platillo}
                    onAdd={() => onAdd(platillo, slot.id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
