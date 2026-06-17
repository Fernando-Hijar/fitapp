"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import type { Platillo } from "@/types";

type Props = {
  platillo: Platillo;
  onAdd: () => void;
};

export default function MealOptionCard({ platillo, onAdd }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-bg-elevated">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 p-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="font-medium text-text-primary">{platillo.nombre}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {platillo.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-bronze-border bg-bronze-subtle px-2.5 py-0.5 text-xs text-bronze"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            {platillo.calorias} kcal · {platillo.proteina}g proteína
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`mt-1 shrink-0 text-text-muted transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="border-t border-border px-3 pb-3 transition-all duration-200">
          {platillo.nota && (
            <p className="mb-3 pt-3 text-xs leading-relaxed text-text-muted">
              {platillo.nota}
            </p>
          )}
          <div className="space-y-2">
            {platillo.ingredientes.map((ing) => (
              <div
                key={ing.nombre}
                className="flex items-start justify-between gap-2 text-xs"
              >
                <div>
                  <p className="text-text-primary">{ing.nombre}</p>
                  <p className="text-text-muted">{ing.cantidad}</p>
                </div>
                <p className="shrink-0 text-text-secondary">
                  P{ing.proteina} · C{ing.carbohidratos} · G{ing.grasas}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-text-secondary">
            <span>Total</span>
            <span>
              {platillo.calorias} kcal · P{platillo.proteina} · C
              {platillo.carbohidratos} · G{platillo.grasas}
            </span>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-bronze py-3 font-medium text-black transition-opacity hover:opacity-90"
          >
            <Plus size={16} />
            Agregar al registro
          </button>
        </div>
      )}
    </div>
  );
}
