import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import {
  alertas,
  formatMoney,
  lineas,
  proyectos,
  publicaciones,
  totalPresupuesto,
  transferencias,
} from "@/data/mock";

interface Mensaje {
  de: "bot" | "usuario";
  texto: string;
}

const sugerencias = [
  "¿Qué proyectos están en ejecución?",
  "¿Hay alertas activas?",
  "¿Cuánto presupuesto se ejecutó?",
  "¿Qué transferencias están listas?",
];

function responder(q: string): string {
  const t = q.toLowerCase();

  if (t.includes("alerta")) {
    return `Hay ${alertas.length} alertas activas: ${alertas.map((a) => `${a.tipo} — ${a.texto}`).join(" · ")}`;
  }
  if (t.includes("ejecución") || t.includes("ejecucion") || t.includes("proyecto")) {
    const lista = proyectos
      .filter((p) => p.estado === "En ejecución")
      .map((p) => `${p.codigo} "${p.titulo}" (${p.avance}% de avance)`)
      .join("; ");
    return `Los proyectos en ejecución son: ${lista}. Podés ver el detalle en la sección Proyectos.`;
  }
  if (t.includes("presupuesto") || t.includes("ejecut")) {
    const t2 = proyectos.reduce(
      (acc, p) => {
        const x = totalPresupuesto(p);
        return { asignado: acc.asignado + x.asignado, ejecutado: acc.ejecutado + x.ejecutado };
      },
      { asignado: 0, ejecutado: 0 },
    );
    const pct = Math.round((t2.ejecutado / t2.asignado) * 100);
    return `Se ejecutaron ${formatMoney(t2.ejecutado)} de ${formatMoney(t2.asignado)} asignados (${pct}%). El detalle por rubro está en la sección Presupuesto.`;
  }
  if (t.includes("transferencia")) {
    const listas = transferencias.filter((x) => x.estado === "Lista para transferir");
    return listas.length
      ? `Están listas para transferir: ${listas.map((x) => x.nombre).join("; ")}.`
      : "Por ahora no hay transferencias marcadas como listas; el detalle está en Transferencia tecnológica.";
  }
  if (t.includes("línea") || t.includes("linea")) {
    return `Hay ${lineas.length} líneas registradas: ${lineas
      .map((l) => `${l.nombre} (${l.estado.toLowerCase()})`)
      .join(", ")}. La línea en riesgo necesita designar un director.`;
  }
  if (t.includes("publicacion") || t.includes("publicación")) {
    return `Hay ${publicaciones.length} producciones registradas, ${publicaciones.filter((p) => p.visibilidad === "Pública").length} de ellas públicas.`;
  }
  if (t.includes("hola") || t.includes("buenas")) {
    return "¡Hola! Puedo ayudarte con dudas sobre proyectos, presupuesto, alertas, líneas, publicaciones y transferencias del CIT. ¿Qué necesitás saber?";
  }
  return "Puedo ayudarte con proyectos, presupuesto, alertas, líneas de investigación, publicaciones y transferencias. Probá con alguna de las sugerencias de arriba.";
}

export function AssistantBubble() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { de: "bot", texto: "¡Hola! Soy el asistente de CIT Nexus. ¿En qué puedo ayudarte?" },
  ]);
  const [entrada, setEntrada] = useState("");
  const listaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listaRef.current?.scrollTo({ top: listaRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, abierto]);

  const enviar = (texto: string) => {
    const limpio = texto.trim();
    if (!limpio) return;
    setMensajes((m) => [...m, { de: "usuario", texto: limpio }, { de: "bot", texto: responder(limpio) }]);
    setEntrada("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {abierto ? (
        <div className="surface-panel flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-sidebar px-4 py-3 text-sidebar-foreground">
            <span className="grid size-7 place-items-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
              <Bot className="size-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-tight">Asistente CIT Nexus</p>
              <p className="text-xs text-sidebar-foreground/60">Responde con datos del sistema</p>
            </div>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar asistente"
              className="rounded-md p-1 transition-colors hover:bg-sidebar-accent"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={listaRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {mensajes.map((m, i) => (
              <div key={i} className={m.de === "usuario" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={
                    m.de === "usuario"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2 text-sm text-foreground"
                  }
                >
                  {m.texto}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pt-2">
            {sugerencias.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => enviar(s)}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            className="flex items-center gap-2 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              enviar(entrada);
            }}
          >
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Escribí tu consulta…"
              className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente"}
        className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
      >
        {abierto ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>
    </div>
  );
}
