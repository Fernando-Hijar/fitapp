import { USER_PROFILE } from "@/lib/constants/profile";
import type { InBodyScan } from "@/types";

type Props = {
  latestScan?: InBodyScan | null;
};

export default function StatsCard({ latestScan }: Props) {
  const peso = latestScan?.peso ?? USER_PROFILE.pesoInicial;
  const grasa = latestScan?.porcentaje_grasa;
  const musculo = latestScan?.masa_muscular;

  return (
    <div className="rounded-2xl border border-border bg-bg-card p-5">
      <div className="grid grid-cols-2 gap-4">
        <StatItem label="Peso actual" value={`${peso} kg`} />
        <StatItem label="Objetivo" value={`${USER_PROFILE.pesoObjetivo} kg`} />
        <StatItem label="Altura" value={`${USER_PROFILE.altura} cm`} />
        <StatItem label="Edad" value={`${USER_PROFILE.edad} años`} />
        <StatItem
          label="% Grasa"
          value={grasa != null ? `${grasa}%` : "—"}
        />
        <StatItem
          label="Masa muscular"
          value={musculo != null ? `${musculo} kg` : "—"}
        />
      </div>
      <p className="mt-4 border-t border-border pt-4 text-sm text-bronze">
        {USER_PROFILE.enfoque}
      </p>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-0.5 font-medium text-text-primary">{value}</p>
    </div>
  );
}
