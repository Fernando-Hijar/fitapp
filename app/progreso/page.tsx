"use client";

import { useCallback, useEffect, useState } from "react";
import { USER_PROFILE } from "@/lib/constants/profile";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { InBodyScan } from "@/types";
import InBodyUpload from "@/components/progreso/InBodyUpload";
import ProgressBar from "@/components/progreso/ProgressBar";
import ScanHistory from "@/components/progreso/ScanHistory";
import StatsCard from "@/components/progreso/StatsCard";

export default function ProgresoPage() {
  const [scans, setScans] = useState<InBodyScan[]>([]);
  const [loading, setLoading] = useState(true);

  const loadScans = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setScans([]);
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setScans([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("inbody_scans")
      .select("*")
      .order("fecha_scan", { ascending: false });

    if (!error && data) {
      setScans(data as InBodyScan[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadScans();
  }, [loadScans]);

  const latestScan = scans[0] ?? null;
  const previousScan = scans[1] ?? null;
  const pesoActual = latestScan?.peso ?? USER_PROFILE.pesoInicial;

  return (
    <main className="space-y-6 px-4 pt-6">
      <header>
        <h1 className="text-xl font-semibold text-text-primary">Progreso</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Seguimiento hacia {USER_PROFILE.pesoObjetivo} kg
        </p>
      </header>

      <StatsCard latestScan={latestScan} />
      <ProgressBar pesoActual={Number(pesoActual)} />

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-bronze">
          InBody
        </h2>
        <InBodyUpload
          onSaved={loadScans}
          previousScan={previousScan}
        />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-bronze">
          Historial
        </h2>
        {loading ? (
          <p className="text-center text-sm text-text-muted">Cargando...</p>
        ) : (
          <ScanHistory scans={scans} />
        )}
      </section>
    </main>
  );
}
