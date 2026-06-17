import { USER_PROFILE } from "@/lib/constants/profile";

type Props = {
  pesoActual: number;
};

export default function ProgressBar({ pesoActual }: Props) {
  const { pesoInicial, pesoObjetivo } = USER_PROFILE;
  const range = pesoObjetivo - pesoInicial;
  const progress = Math.max(0, Math.min(((pesoActual - pesoInicial) / range) * 100, 100));
  const faltante = Math.max(0, pesoObjetivo - pesoActual);

  return (
    <div className="rounded-2xl border border-border bg-bg-card p-5">
      <div className="mb-3 flex justify-between text-xs text-text-secondary">
        <span>{pesoInicial} kg</span>
        <span>{pesoObjetivo} kg</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-bg-elevated">
        <div
          className="h-full rounded-full bg-bronze transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-bg-primary bg-bronze-light shadow"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>
      <p className="mt-3 text-center text-sm font-medium text-bronze">
        {progress.toFixed(0)}% completado
      </p>
      <p className="mt-1 text-center text-xs text-text-secondary">
        Faltan {faltante.toFixed(1)} kg para tu objetivo
      </p>
    </div>
  );
}
