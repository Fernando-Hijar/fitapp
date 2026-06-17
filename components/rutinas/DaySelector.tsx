"use client";

import type { DiaSemana } from "@/types";
import { DIAS_SEMANA } from "@/lib/constants/routines";

type Props = {
  selected: DiaSemana;
  onSelect: (dia: DiaSemana) => void;
};

export default function DaySelector({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {DIAS_SEMANA.map(({ id, label }) => {
        const active = selected === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
              active
                ? "bg-bronze text-black"
                : "bg-bg-elevated text-text-secondary hover:text-text-primary"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
