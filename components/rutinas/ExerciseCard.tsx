"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Ejercicio } from "@/types";

type Props = {
  ejercicio: Ejercicio;
  index: number;
};

export default function ExerciseCard({ ejercicio, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-bg-card transition-all duration-200 ${
        expanded ? "border-l-2 border-l-bronze border-border" : "border-border"
      } ${ejercicio.destacado ? "ring-1 ring-bronze-border" : ""}`}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bronze-subtle text-xs font-semibold text-bronze">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-text-primary">{ejercicio.nombre}</p>
          <span className="mt-1 inline-block rounded-full bg-bg-elevated px-2.5 py-0.5 text-xs text-text-secondary">
            {ejercicio.series}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-text-muted transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="border-t border-border bg-bg-elevated px-4 py-3">
          <p className="text-xs leading-relaxed text-text-muted">{ejercicio.nota}</p>
        </div>
      )}
    </div>
  );
}
