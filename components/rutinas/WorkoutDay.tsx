"use client";

import { useState } from "react";
import type { BloqueRutina, DiaSemana } from "@/types";
import {
  RUTINAS,
  isMiercolesBloques,
  type MiercolesBloques,
} from "@/lib/constants/routines";
import ExerciseCard from "./ExerciseCard";
import AbsRoutine from "./AbsRoutine";
import HomeGymToggle from "./HomeGymToggle";

type Props = {
  dia: DiaSemana;
};

export default function WorkoutDay({ dia }: Props) {
  const rutina = RUTINAS[dia];
  const [gymMode, setGymMode] = useState<"casa" | "gym">("casa");

  return (
    <div className="space-y-5 transition-all duration-200">
      <div className="rounded-2xl border border-border bg-bg-card p-4">
        <h2 className="text-lg font-semibold text-text-primary">{rutina.nombre}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {rutina.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-bronze-border bg-bronze-subtle px-2.5 py-0.5 text-xs text-bronze"
            >
              {chip}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-text-muted">{rutina.tiempoEstimado}</p>
      </div>

      {rutina.tieneToggle && isMiercolesBloques(rutina.bloques) && (
        <HomeGymToggle mode={gymMode} onChange={setGymMode} />
      )}

      {renderBloques(rutina.bloques, gymMode)}
    </div>
  );
}

function renderBloques(
  bloques: BloqueRutina[] | MiercolesBloques,
  gymMode: "casa" | "gym"
) {
  if (isMiercolesBloques(bloques)) {
    const pierna =
      gymMode === "casa" ? bloques.piernaCasa : bloques.piernaGym;
    return (
      <>
        {pierna.map((bloque) => (
          <BloqueSection key={bloque.nombre} bloque={bloque} />
        ))}
        {bloques.hombros.map((bloque) => (
          <BloqueSection key={bloque.nombre} bloque={bloque} />
        ))}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-bronze">
            Abs
          </p>
          <AbsRoutine variant="completo" nota={bloques.abs.nota} />
        </div>
      </>
    );
  }

  return bloques.map((bloque) => {
    if (bloque.tipo === "abs-corto") {
      return (
        <div key={bloque.nombre}>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-bronze">
            {bloque.nombre}
          </p>
          <AbsRoutine variant="corto" nota={bloque.nota} />
        </div>
      );
    }

    if (bloque.tipo === "abs-completo") {
      return (
        <div key={bloque.nombre}>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-bronze">
            {bloque.nombre}
          </p>
          <AbsRoutine variant="completo" nota={bloque.nota} />
        </div>
      );
    }

    if (bloque.tipo === "nota-especial") {
      return (
        <div
          key={bloque.nombre}
          className="rounded-2xl border border-bronze-border bg-bronze-subtle p-4"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-bronze">
            {bloque.nombre}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {bloque.nota}
          </p>
        </div>
      );
    }

    return <BloqueSection key={bloque.nombre} bloque={bloque} />;
  });
}

function BloqueSection({ bloque }: { bloque: BloqueRutina }) {
  if (!bloque.ejercicios?.length) return null;

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-bronze">
        {bloque.nombre}
      </p>
      <div className="space-y-3">
        {bloque.ejercicios.map((ejercicio, i) => (
          <ExerciseCard key={ejercicio.nombre} ejercicio={ejercicio} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
