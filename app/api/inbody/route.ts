import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, mediaType } = await request.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType as "image/jpeg" | "image/png" | "image/webp",
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: `Analiza esta imagen de un reporte InBody de composición corporal.
Extrae todos los valores numéricos visibles y devuelve ÚNICAMENTE un objeto JSON válido sin markdown ni explicaciones.
Estructura exacta:
{
  "peso": number | null,
  "porcentajeGrasa": number | null,
  "masaMuscular": number | null,
  "masaGrasa": number | null,
  "imc": number | null,
  "grasaVisceral": number | null,
  "aguaCorporal": number | null,
  "proteinaKg": number | null,
  "mineralKg": number | null,
  "metabolismoBasal": number | null
}
Si un valor no aparece en el reporte usa null. Todos los valores numéricos deben ser de tipo number, no string.`,
            },
          ],
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const clean = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Error leyendo InBody:", error);
    return Response.json(
      {
        success: false,
        error: "No se pudo leer el reporte. Intenta con una foto más nítida.",
      },
      { status: 400 }
    );
  }
}
