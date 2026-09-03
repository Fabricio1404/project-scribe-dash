import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  alertas,
  convenios,
  formatMoney,
  investigadores,
  lineas,
  proyectos,
  publicaciones,
  totalPresupuesto,
  transferencias,
} from "@/data/mock";

const contextoSistema = () => {
  const t = proyectos.reduce(
    (acc, p) => {
      const x = totalPresupuesto(p);
      return { asignado: acc.asignado + x.asignado, ejecutado: acc.ejecutado + x.ejecutado };
    },
    { asignado: 0, ejecutado: 0 },
  );
  return `Sos el asistente virtual de "CIT Nexus", el panel interno de gestión científico-tecnológica del CIT Formosa (Centro de Investigación y Transferencia de Formosa, Argentina).
Respondés consultas de gestión institucional usando ÚNICAMENTE los datos del sistema incluidos abajo. Si te preguntan algo que no está en los datos, decí que no tenés esa información y sugerí la sección correspondiente del panel.
Respondé en español rioplatense, tono formal pero cercano, respuestas breves (máximo 3-4 oraciones salvo que pidan un listado).

DATOS DEL SISTEMA:

Líneas de investigación: ${JSON.stringify(lineas.map((l) => ({ id: l.id, nombre: l.nombre, estado: l.estado, director: l.directorActualId })))}

Investigadores y becarios: ${JSON.stringify(investigadores)}

Proyectos: ${JSON.stringify(
    proyectos.map((p) => ({
      codigo: p.codigo,
      titulo: p.titulo,
      lineaId: p.lineaId,
      estado: p.estado,
      avance: p.avance,
      inicio: p.inicio,
      fin: p.fin,
      financiador: p.financiador,
      directorId: p.directorId,
      presupuesto: totalPresupuesto(p),
    })),
  )}

Presupuesto consolidado: asignado ${formatMoney(t.asignado)}, ejecutado ${formatMoney(t.ejecutado)} (${Math.round((t.ejecutado / t.asignado) * 100)}%).

Publicaciones: ${JSON.stringify(publicaciones)}

Transferencias tecnológicas: ${JSON.stringify(transferencias)}

Convenios: ${JSON.stringify(convenios)}

Alertas activas: ${JSON.stringify(alertas)}`;
};

const MensajeSchema = z.object({
  de: z.enum(["usuario", "bot"]),
  texto: z.string(),
});

export const preguntarAsistente = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        pregunta: z.string().min(1).max(1000),
        historial: z.array(MensajeSchema).max(20).default([]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("IA no configurada");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-lite",
        messages: [
          { role: "system", content: contextoSistema() },
          ...data.historial.map((m) => ({
            role: m.de === "usuario" ? "user" : "assistant",
            content: m.texto,
          })),
          { role: "user", content: data.pregunta },
        ],
      }),
    });

    if (!res.ok) throw new Error(`Error del servicio de IA (${res.status})`);
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const texto = json.choices?.[0]?.message?.content?.trim();
    if (!texto) throw new Error("La IA no devolvió respuesta");
    return { respuesta: texto };
  });
