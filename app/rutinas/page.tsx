"use client";

import { useState } from "react";
import { getDiaActual } from "@/lib/constants/routines";
import type { DiaSemana } from "@/types";
import DaySelector from "@/components/rutinas/DaySelector";
import WorkoutDay from "@/components/rutinas/WorkoutDay";

export default function RutinasPage() {
  const [selectedDay, setSelectedDay] = useState<DiaSemana>(getDiaActual());

  return (
    <main className="px-4 pt-6">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">Mis Rutinas</h1>
        <p className="mt-1 text-sm font-medium uppercase tracking-wide text-bronze">
          Lunes – Viernes · 4:00 pm
        </p>
      </header>

      <div className="mb-6">
        <DaySelector selected={selectedDay} onSelect={setSelectedDay} />
      </div>

      <WorkoutDay dia={selectedDay} />
    </main>
  );
}
