"use client";

type Props = {
  mode: "casa" | "gym";
  onChange: (mode: "casa" | "gym") => void;
};

export default function HomeGymToggle({ mode, onChange }: Props) {
  return (
    <div className="flex rounded-xl bg-bg-elevated p-1">
      <button
        type="button"
        onClick={() => onChange("casa")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
          mode === "casa"
            ? "bg-bronze text-black"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        En casa
      </button>
      <button
        type="button"
        onClick={() => onChange("gym")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
          mode === "gym"
            ? "bg-bronze text-black"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        Gimnasio
      </button>
    </div>
  );
}
