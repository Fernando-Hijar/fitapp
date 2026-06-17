import { RUTINA_ABS } from "@/lib/constants/routines";

type Props = {
  variant: "corto" | "completo";
  nota?: string;
};

export default function AbsRoutine({ variant, nota }: Props) {
  const showC3 = variant === "completo";
  const showFinisher = variant === "completo";

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-bg-card p-4">
      {nota && (
        <p className="text-xs leading-relaxed text-text-muted">{nota}</p>
      )}

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-bronze">
          Calentamiento
        </p>
        <div className="space-y-2">
          {RUTINA_ABS.calentamiento.map((item) => (
            <div
              key={item.nombre}
              className="flex items-center justify-between rounded-xl bg-bg-elevated px-3 py-2"
            >
              <span className="text-sm text-text-primary">{item.nombre}</span>
              <span className="text-xs text-text-secondary">{item.duracion}</span>
            </div>
          ))}
        </div>
      </div>

      <Circuito
        title="Circuito 1"
        rondas={RUTINA_ABS.circuito1.rondas}
        descanso={RUTINA_ABS.circuito1.descanso}
        nota={RUTINA_ABS.circuito1.nota}
        ejercicios={RUTINA_ABS.circuito1.ejercicios}
      />

      <Circuito
        title="Circuito 2"
        rondas={RUTINA_ABS.circuito2.rondas}
        descanso={RUTINA_ABS.circuito2.descanso}
        ejercicios={RUTINA_ABS.circuito2.ejercicios}
      />

      {showC3 && (
        <Circuito
          title="Circuito 3"
          rondas={RUTINA_ABS.circuito3.rondas}
          descanso={RUTINA_ABS.circuito3.descanso}
          ejercicios={RUTINA_ABS.circuito3.ejercicios}
        />
      )}

      {showC3 &&
        RUTINA_ABS.extra.map((item) => (
          <div
            key={item.nombre}
            className="flex items-center justify-between rounded-xl bg-bg-elevated px-3 py-2"
          >
            <span className="text-sm text-text-primary">{item.nombre}</span>
            <span className="text-xs text-text-secondary">{item.series}</span>
          </div>
        ))}

      {showFinisher && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-bronze">
            Finisher {RUTINA_ABS.finisher.opcional && "(opcional)"}
          </p>
          <div className="space-y-2">
            {RUTINA_ABS.finisher.ejercicios.map((item) => (
              <div
                key={item.nombre}
                className="flex items-center justify-between rounded-xl bg-bg-elevated px-3 py-2"
              >
                <span className="text-sm text-text-primary">{item.nombre}</span>
                <span className="text-xs text-text-secondary">{item.series}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Circuito({
  title,
  rondas,
  descanso,
  nota,
  ejercicios,
}: {
  title: string;
  rondas: number;
  descanso: string;
  nota?: string;
  ejercicios: { nombre: string; series: string; nota?: string }[];
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-widest text-bronze">
        {title} · {rondas} rondas
      </p>
      <p className="mb-2 text-xs text-text-muted">{descanso}</p>
      {nota && <p className="mb-2 text-xs text-text-muted">{nota}</p>}
      <div className="space-y-2">
        {ejercicios.map((ej) => (
          <div
            key={ej.nombre}
            className="rounded-xl bg-bg-elevated px-3 py-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">{ej.nombre}</span>
              <span className="text-xs text-text-secondary">{ej.series}</span>
            </div>
            {ej.nota && (
              <p className="mt-1 text-xs text-text-muted">{ej.nota}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
