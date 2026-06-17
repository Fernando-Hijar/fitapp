import type { BloqueRutina, DiaSemana } from "@/types";

export const DIAS_SEMANA: { id: DiaSemana; label: string }[] = [
  { id: "lunes", label: "LUN" },
  { id: "martes", label: "MAR" },
  { id: "miercoles", label: "MIÉ" },
  { id: "jueves", label: "JUE" },
  { id: "viernes", label: "VIE" },
];

export type RutinaDia = {
  nombre: string;
  chips: string[];
  tiempoEstimado: string;
  tieneToggle?: boolean;
  bloques: BloqueRutina[] | MiercolesBloques;
};

export type MiercolesBloques = {
  piernaCasa: BloqueRutina[];
  piernaGym: BloqueRutina[];
  hombros: BloqueRutina[];
  abs: { tipo: "abs-completo"; nota: string };
};

export const RUTINAS: Record<DiaSemana, RutinaDia> = {
  lunes: {
    nombre: "Espalda A + Abs",
    chips: ["Espalda", "Abs corto", "Nuevo"],
    tiempoEstimado: "~75 min",
    bloques: [
      {
        nombre: "Calentamiento",
        ejercicios: [
          {
            nombre: "Pull-ups sin peso",
            series: "2 × 5 reps",
            nota: "Solo activar el patrón. Sin esfuerzo, sin lastrar.",
          },
        ],
      },
      {
        nombre: "Fuerza",
        ejercicios: [
          {
            nombre: "Dominadas lastradas",
            series: "5 × 3–5 reps",
            nota: "El ejercicio rey. Añade peso hasta que 3–5 reps sean difíciles pero limpias. 2.5–3 min de descanso entre series.",
          },
          {
            nombre: "Remo Pendlay con barra",
            series: "4 × 5 reps",
            nota: "La barra vuelve al piso entre cada rep. Espalda plana, jalón explosivo desde abajo.",
          },
          {
            nombre: "Jalón agarre neutro",
            series: "3 × 10–12 reps",
            nota: "Palmas una frente a otra. Activa más el dorsal bajo que el agarre abierto.",
          },
        ],
      },
      {
        nombre: "Skill",
        ejercicios: [
          {
            nombre: "Front lever (progresión)",
            series: "4 × 10–15 s",
            nota: "Prioriza calidad de posición sobre tiempo.",
          },
          {
            nombre: "Pullover para FL a una mano",
            series: "3 × (10 reps + 5 s hold)",
            nota: "10 reps seguidas de 5s sosteniendo la posición. Tres veces.",
          },
        ],
      },
      {
        nombre: "Salud articular",
        ejercicios: [
          {
            nombre: "Face pull",
            series: "3 × 15 reps",
            nota: "Nunca lo saltes en días de jalones pesados. Protege el manguito rotador.",
          },
        ],
      },
      {
        nombre: "Abs (versión corta)",
        tipo: "abs-corto",
        nota: "Dragon flag + Circuito 1 + Circuito 2 de la rutina de abs. Sin C3 ni finisher.",
      },
    ],
  },

  martes: {
    nombre: "Pecho A + Tríceps",
    chips: ["Pecho", "Tríceps"],
    tiempoEstimado: "~60 min + casa",
    bloques: [
      {
        nombre: "Gimnasio",
        ejercicios: [
          {
            nombre: "Press inclinado mancuernas",
            series: "4 × 6 reps",
            nota: "Inicio 40 lbs, +5 lbs por serie, −2 reps. Tu sistema de progresión funciona, mantenlo.",
          },
          {
            nombre: "Fly máquina",
            series: "2 × 15 reps pesado",
            nota: "Estirar completamente en el punto bajo. Contracción máxima arriba.",
          },
          {
            nombre: "Lagartijas",
            series: "3 × 10 reps",
            nota: "Opcional según energía del día.",
          },
          {
            nombre: "Trícep cuerda + reverencia",
            series: "4 pares (12 + 10)",
            nota: "Superset sin descanso entre el cable y la reverencia. 45–60 s al terminar cada par.",
          },
          {
            nombre: "Trícep mancuerna",
            series: "20–15–10–5 reps",
            nota: "El peso sube conforme bajan las reps. Codos fijos.",
          },
        ],
      },
      {
        nombre: "En casa (mismo día o noche)",
        tipo: "nota-especial",
        nota: "100 lagartijas + 50 fondos · Formato: (10 lagartijas + 5 fondos) × 10 rondas. Si el pecho está muy fatigado, baja a 60 + 30.",
      },
    ],
  },

  miercoles: {
    nombre: "Pierna + Hombros + Abs",
    chips: ["Pierna", "Hombros", "Abs"],
    tiempoEstimado: "~95 min",
    tieneToggle: true,
    bloques: {
      piernaCasa: [
        {
          nombre: "Calentamiento",
          ejercicios: [
            {
              nombre: "Sentadilla BW + movilidad cadera",
              series: "2 × 15 · 2 × 10 c/lado",
              nota: "5 minutos. Círculos de cadera amplios para activar antes de cargar.",
            },
          ],
        },
        {
          nombre: "Cuádriceps",
          ejercicios: [
            {
              nombre: "Pistol squat (progresión)",
              series: "4 × 5–6 c/lado",
              nota: "Con asistencia (anilla, marco de puerta) o a cajón si no tienes la técnica limpia. Profundidad máxima controlada.",
              destacado: true,
            },
            {
              nombre: "Bulgarian split squat con mochila",
              series: "4 × 10 c/lado",
              nota: "Carga la mochila con 10–15 kg (libros, botellas). Pie trasero en escalón o sofá. 90 s de descanso entre piernas.",
            },
          ],
        },
        {
          nombre: "Posterior",
          ejercicios: [
            {
              nombre: "Nordic curl",
              series: "4 × 4–6 reps",
              nota: "Pies bajo el sofá o mueble pesado. Baja lento (5 s) con el cuerpo recto. El ejercicio más difícil e importante del día.",
              destacado: true,
            },
            {
              nombre: "Hip thrust con mochila",
              series: "4 × 12–15 reps",
              nota: "Espalda apoyada en el sofá. Mochila sobre la cadera. Aprieta glúteo 1 s arriba.",
            },
          ],
        },
        {
          nombre: "Pantorrillas",
          ejercicios: [
            {
              nombre: "Calf raise unilateral en escalón",
              series: "4 × 20 c/lado",
              nota: "Talón completamente colgado. Sube hasta la punta máxima y mantén 1 s. Rango completo.",
            },
          ],
        },
      ],
      piernaGym: [
        {
          nombre: "Calentamiento",
          ejercicios: [
            {
              nombre: "Bici estática o caminadora",
              series: "5 min",
              nota: "Ritmo moderado. Para calentar rodillas y caderas, no es cardio.",
            },
            {
              nombre: "Sentadilla con barra vacía",
              series: "2 × 10 reps",
              nota: "Solo 20 kg. Perfección técnica antes de cargar.",
            },
          ],
        },
        {
          nombre: "Fuerza principal",
          ejercicios: [
            {
              nombre: "Sentadilla trasera",
              series: "5 × 5 reps",
              nota: "Rey del día. Añade 2.5 kg cada semana que completes las 5×5 limpio. Profundidad mínima: muslo paralelo al piso.",
              destacado: true,
            },
            {
              nombre: "Prensa de piernas",
              series: "4 × 10–12 reps",
              nota: "Pies a la anchura de los hombros en el centro. No bloquees completamente arriba.",
            },
          ],
        },
        {
          nombre: "Cadena posterior",
          ejercicios: [
            {
              nombre: "Peso muerto rumano (RDL)",
              series: "4 × 8–10 reps",
              nota: "Bisagra en la cadera, espalda neutra. Baja hasta sentir el estiramiento del isquiotibial. Si la espalda se redondea, menos peso.",
            },
            {
              nombre: "Curl de isquiotibiales en máquina",
              series: "3 × 12–15 reps",
              nota: "Baja lento (3 s), sube en 1.",
            },
          ],
        },
        {
          nombre: "Aislamiento",
          ejercicios: [
            {
              nombre: "Extensión de cuádriceps",
              series: "3 × 12–15 reps",
              nota: "Al final, con el cuádricep ya fatigado. Aprieta arriba 1 s.",
            },
            {
              nombre: "Elevación de gemelos de pie",
              series: "5 × 15–20 reps",
              nota: "Rango completo. Descanso corto de 45 s entre series.",
            },
          ],
        },
      ],
      hombros: [
        {
          nombre: "Hombros",
          ejercicios: [
            {
              nombre: "Pike pushup",
              series: "3 × 8 reps",
              nota: "Caderas bien arriba.",
            },
            {
              nombre: "Darle flores (elevaciones laterales)",
              series: "3 × 12 reps",
              nota: "Codos ligeramente doblados, sube hasta la altura del hombro. Sin impulso del cuerpo.",
            },
            {
              nombre: "Tocar el techo (press overhead)",
              series: "3 × 10 c/lado",
              nota: "Una mancuerna de cada lado. Core apretado, sin arquear la espalda baja.",
            },
            {
              nombre: "Ligas: laterales + frontales",
              series: "2 rondas (10 + 15)",
              nota: "Sin descanso entre ejercicios dentro de la ronda.",
            },
          ],
        },
      ],
      abs: {
        tipo: "abs-completo",
        nota: "Rutina completa de abs (C1 + C2 + C3 + finisher). Dragon flag al inicio del C1.",
      },
    },
  },

  jueves: {
    nombre: "Espalda B + Bíceps",
    chips: ["Espalda", "Bíceps"],
    tiempoEstimado: "~80 min",
    bloques: [
      {
        nombre: "Calentamiento",
        ejercicios: [
          {
            nombre: "Pull-ups sin peso",
            series: "10 reps",
            nota: "Solo calentamiento articular.",
          },
        ],
      },
      {
        nombre: "Volumen y resistencia",
        ejercicios: [
          {
            nombre: "Muscle-ups",
            series: "10 reps en ≤ 3:00",
            nota: "Cronometrado. Si terminas antes del tiempo, descansa el resto antes de pasar al siguiente.",
          },
          {
            nombre: "50 dominadas",
            series: "en ≤ 3:30",
            nota: "Distribuye las reps como necesites: 15-15-10-10, 10×5, etc.",
          },
          {
            nombre: "Face pull",
            series: "3 × 15 reps pesado",
            nota: "Salud articular del hombro. Siempre presente en días de espalda.",
          },
          {
            nombre: "Remo máquina",
            series: "3 × 8 al fallo pesado",
            nota: "Objetivo es fatiga máxima de dorsal. Diferente al Pendlay del lunes.",
          },
        ],
      },
      {
        nombre: "Bíceps",
        ejercicios: [
          {
            nombre: "Curl con barra",
            series: "1 serie al fallo",
            nota: "Una sola serie al fallo total. Codos fijos pegados al cuerpo.",
          },
          {
            nombre: "Curl 5 y 5, 4 y 4...",
            series: "Hasta 1 y 1",
            nota: "Técnica alternada descendente.",
          },
        ],
      },
      {
        nombre: "Skill",
        ejercicios: [
          {
            nombre: "Front lever (intentos)",
            series: "7–10 intentos",
            nota: "Si el cuerpo está muy fatigado del volumen anterior, baja a 5 intentos.",
          },
          {
            nombre: "Pullover para FL a una mano",
            series: "3 × (10 reps + 5 s hold)",
            nota: "Tu protocolo actual. Finaliza el día con esto.",
          },
        ],
      },
    ],
  },

  viernes: {
    nombre: "Pecho B + Abs",
    chips: ["Pecho B", "Abs", "Nuevo"],
    tiempoEstimado: "~75 min",
    bloques: [
      {
        nombre: "Pecho — ángulos distintos al martes",
        ejercicios: [
          {
            nombre: "Press plano mancuernas",
            series: "4 × 10–12 reps",
            nota: "Trabaja la porción central y baja del pectoral. Más volumen, menos peso que el martes.",
            destacado: true,
          },
          {
            nombre: "Apertura inclinada (fly) mancuernas",
            series: "4 × 12 reps",
            nota: "Banco a 30–45°. Codos ligeramente doblados siempre. Baja hasta sentir el estiramiento.",
          },
          {
            nombre: "Fondos lastrados",
            series: "4 × 8–10 reps",
            nota: "Inclínate hacia adelante para cargar más pecho que trícep. Añade peso igual que en las dominadas.",
          },
          {
            nombre: "Pullover con mancuerna",
            series: "3 × 12 reps",
            nota: "Banco plano, mancuerna con ambas manos sobre la cabeza. Trabaja inserción inferior del pecho y dorsal.",
          },
          {
            nombre: "Press cerrado con barra",
            series: "3 × 10 reps",
            nota: "Agarre ancho de hombros, codos pegados al cuerpo. Trícep puro, diferente al cable del martes.",
          },
        ],
      },
      {
        nombre: "Abs",
        tipo: "abs-completo",
        nota: "Rutina completa (C1 + C2 + C3 + finisher). Dragon flag al inicio del C1.",
      },
    ],
  },
};

export const RUTINA_ABS = {
  calentamiento: [
    { nombre: "Dead bug lento", duracion: "30 s" },
    { nombre: "Plancha", duracion: "30 s" },
  ],
  circuito1: {
    rondas: 3,
    descanso: "40–60 s entre rondas",
    nota: "Dragon flag primero cuando el core está fresco.",
    ejercicios: [
      {
        nombre: "Dragon flag",
        series: "al fallo",
        nota: "Va al inicio. El ejercicio más difícil.",
      },
      { nombre: "Crunch con peso", series: "20 reps" },
      { nombre: "Crunch con twist abajo (1 s)", series: "12 reps" },
      { nombre: "Leg raises en barra", series: "8 reps" },
    ],
  },
  circuito2: {
    rondas: 3,
    descanso: "45–60 s entre rondas",
    ejercicios: [
      { nombre: "Elevaciones de pierna completas", series: "12–15 reps" },
      { nombre: "Reverse crunch lento y abrir piernas abajo", series: "12 reps" },
      { nombre: "Hollow rock (barquito)", series: "15–20 s" },
    ],
  },
  circuito3: {
    rondas: 2,
    descanso: "45 s entre rondas",
    ejercicios: [
      { nombre: "Plancha lateral con levantamiento de cadera", series: "12 reps c/lado" },
      { nombre: "Russian twists con piernas elevadas", series: "20 reps (10 c/lado)" },
      { nombre: "Mountain climbers cruzados", series: "40–45 s" },
    ],
  },
  extra: [{ nombre: "L-sit leg raises", series: "4 × 6", descanso: "45 s" }],
  finisher: {
    opcional: true,
    ejercicios: [
      { nombre: "Leg hold bajo (10–20 cm del piso)", series: "20–30 s" },
      { nombre: "Crunch", series: "15 reps" },
      { nombre: "Plancha", series: "30 s" },
    ],
  },
};

export function getDiaActual(): DiaSemana {
  const day = new Date().getDay();
  const map: Record<number, DiaSemana> = {
    1: "lunes",
    2: "martes",
    3: "miercoles",
    4: "jueves",
    5: "viernes",
  };
  return map[day] ?? "lunes";
}

export function isMiercolesBloques(
  bloques: BloqueRutina[] | MiercolesBloques
): bloques is MiercolesBloques {
  return !Array.isArray(bloques);
}
