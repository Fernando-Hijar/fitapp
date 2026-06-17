import type { InBodyAnalysisResult } from "@/types";
import {
  Activity,
  Droplets,
  Flame,
  Scale,
  Target,
  Zap,
} from "lucide-react";

type Props = {
  data: InBodyAnalysisResult;
};

const fields: {
  key: keyof InBodyAnalysisResult;
  label: string;
  icon: typeof Scale;
  suffix?: string;
}[] = [
  { key: "peso", label: "Peso", icon: Scale, suffix: " kg" },
  { key: "porcentajeGrasa", label: "% Grasa", icon: Target, suffix: "%" },
  { key: "masaMuscular", label: "Masa muscular", icon: Activity, suffix: " kg" },
  { key: "masaGrasa", label: "Masa grasa", icon: Target, suffix: " kg" },
  { key: "imc", label: "IMC", icon: Scale },
  { key: "grasaVisceral", label: "Grasa visceral", icon: Flame },
  { key: "aguaCorporal", label: "Agua corporal", icon: Droplets, suffix: " L" },
  { key: "proteinaKg", label: "Proteína", icon: Zap, suffix: " kg" },
  { key: "mineralKg", label: "Minerales", icon: Zap, suffix: " kg" },
  { key: "metabolismoBasal", label: "Metabolismo basal", icon: Flame, suffix: " kcal" },
];

export default function InBodyResults({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map(({ key, label, icon: Icon, suffix = "" }) => {
        const value = data[key];
        return (
          <div
            key={key}
            className="rounded-xl border border-border bg-bg-card p-3"
          >
            <div className="mb-2 flex items-center gap-2 text-bronze">
              <Icon size={14} />
              <span className="text-xs text-text-muted">{label}</span>
            </div>
            <p className="text-lg font-semibold text-text-primary">
              {value != null ? `${value}${suffix}` : "—"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
