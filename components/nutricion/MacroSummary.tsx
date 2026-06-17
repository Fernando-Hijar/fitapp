import { USER_PROFILE } from "@/lib/constants/profile";

type MacroTotals = {
  calorias: number;
  proteina: number;
  carbohidratos: number;
  grasas: number;
};

type Props = {
  totals: MacroTotals;
};

export default function MacroSummary({ totals }: Props) {
  const { objetivoDiario } = USER_PROFILE;
  const calPct = Math.min((totals.calorias / objetivoDiario.calorias) * 100, 100);

  return (
    <div className="rounded-2xl border border-border bg-bg-card p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm text-text-secondary">Calorías</span>
        <span className="text-sm font-medium text-text-primary">
          {totals.calorias} / {objetivoDiario.calorias}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
        <div
          className="h-full rounded-full bg-bronze transition-all duration-200"
          style={{ width: `${calPct}%` }}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <MacroChip
          label="Proteína"
          current={totals.proteina}
          target={objetivoDiario.proteina}
        />
        <MacroChip
          label="Carbos"
          current={totals.carbohidratos}
          target={objetivoDiario.carbohidratos}
        />
        <MacroChip
          label="Grasas"
          current={totals.grasas}
          target={objetivoDiario.grasas}
        />
      </div>
    </div>
  );
}

function MacroChip({
  label,
  current,
  target,
}: {
  label: string;
  current: number;
  target: number;
}) {
  return (
    <span className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs text-text-secondary">
      {label} {Math.round(current)}g / {target}g
    </span>
  );
}
