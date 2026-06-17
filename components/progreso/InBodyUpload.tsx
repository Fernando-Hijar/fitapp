"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import type { InBodyAnalysisResult } from "@/types";
import { generarFeedback, mapAnalysisToScanFields } from "@/lib/claude";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import InBodyResults from "./InBodyResults";

const MAX_SIZE = 5 * 1024 * 1024;

type Props = {
  onSaved: () => void;
  previousScan?: {
    peso: number | null;
    porcentaje_grasa: number | null;
    masa_muscular: number | null;
  } | null;
};

export default function InBodyUpload({ onSaved, previousScan }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [results, setResults] = useState<InBodyAnalysisResult | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_SIZE) {
      setError("La imagen debe ser menor a 5 MB.");
      return;
    }

    setError(null);
    setResults(null);
    setFeedback(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleAnalyze() {
    if (!file) return;

    setAnalyzing(true);
    setError(null);

    try {
      const base64 = await fileToBase64(file);
      const mediaType = file.type as "image/jpeg" | "image/png" | "image/webp";

      const res = await fetch("/api/inbody", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mediaType }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error ?? "Error al analizar");
      }

      setResults(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo analizar la imagen.");
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleSave() {
    if (!results || !file) return;

    if (!isSupabaseConfigured()) {
      setError("Configura Supabase en .env.local para guardar scans.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) return;

    setSaving(true);
    setError(null);

    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `inbody/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("inbody")
        .upload(path, file, { upsert: false });

      let imagenUrl: string | null = null;
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("inbody").getPublicUrl(path);
        imagenUrl = urlData.publicUrl;
      }

      const scanFields = mapAnalysisToScanFields(results);
      const { data, error: insertError } = await supabase
        .from("inbody_scans")
        .insert({
          fecha_scan: new Date().toISOString().split("T")[0],
          imagen_url: imagenUrl,
          ...scanFields,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const msg = generarFeedback(
        {
          peso: results.peso,
          porcentaje_grasa: results.porcentajeGrasa,
          masa_muscular: results.masaMuscular,
        },
        previousScan ?? undefined
      );
      setFeedback(msg);

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el scan.");
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    setPreview(null);
    setFile(null);
    setResults(null);
    setFeedback(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-bronze bg-bronze-subtle py-5 font-medium text-bronze transition-opacity hover:opacity-90"
        >
          <Camera size={22} />
          Subir estudio InBody
        </button>
      ) : (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border-2 border-bronze">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview InBody"
              className="aspect-square w-full object-cover"
            />
          </div>

          {!results && (
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-bronze py-3 font-medium text-black disabled:opacity-60"
            >
              {analyzing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analizando...
                </>
              ) : (
                "Analizar con IA"
              )}
            </button>
          )}

          {results && (
            <>
              <InBodyResults data={results} />
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-bronze py-3 font-medium text-black disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Confirmar y guardar"
                )}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={reset}
            className="w-full rounded-xl border border-bronze py-3 text-bronze"
          >
            Elegir otra imagen
          </button>
        </div>
      )}

      {feedback && (
        <p className="rounded-xl border border-bronze-border bg-bronze-subtle p-4 text-sm text-bronze">
          {feedback}
        </p>
      )}

      {error && (
        <p className="rounded-xl border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
