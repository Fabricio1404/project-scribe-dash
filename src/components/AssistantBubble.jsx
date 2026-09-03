"use strict";
import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, X } from "lucide-react";
import { preguntarAsistente } from "@/api/asistente";
const sugerencias = [
  "\xBFQu\xE9 proyectos est\xE1n en ejecuci\xF3n?",
  "\xBFHay alertas activas?",
  "\xBFCu\xE1nto presupuesto se ejecut\xF3?",
  "\xBFQu\xE9 transferencias est\xE1n listas?"
];
export function AssistantBubble() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      de: "bot",
      texto: "\xA1Hola! Soy el asistente de CIT Nexus, ahora con IA. Puedo responder dudas sobre proyectos, presupuesto, publicaciones, transferencias y convenios. \xBFEn qu\xE9 te ayudo?"
    }
  ]);
  const [entrada, setEntrada] = useState("");
  const [pensando, setPensando] = useState(false);
  const listaRef = useRef(null);
  useEffect(() => {
    listaRef.current?.scrollTo({ top: listaRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, pensando, abierto]);
  const enviar = async (texto) => {
    const limpio = texto.trim();
    if (!limpio || pensando) return;
    const historial = mensajes.slice(-10);
    setMensajes((m) => [...m, { de: "usuario", texto: limpio }]);
    setEntrada("");
    setPensando(true);
    try {
      const { respuesta } = await preguntarAsistente({ data: { pregunta: limpio, historial } });
      setMensajes((m) => [...m, { de: "bot", texto: respuesta }]);
    } catch {
      setMensajes((m) => [
        ...m,
        { de: "bot", texto: "No pude procesar tu consulta en este momento. Intent\xE1 de nuevo en unos segundos." }
      ]);
    } finally {
      setPensando(false);
    }
  };
  return <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {abierto ? <div className="surface-panel flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-sidebar px-4 py-3 text-sidebar-foreground">
            <span className="grid size-7 place-items-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
              <Bot className="size-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-tight">Asistente CIT Nexus</p>
              <p className="text-xs text-sidebar-foreground/60">IA conectada a los datos del sistema</p>
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
            {mensajes.map((m, i) => <div key={i} className={m.de === "usuario" ? "flex justify-end" : "flex justify-start"}>
                <p
    className={m.de === "usuario" ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground" : "max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2 text-sm text-foreground"}
  >
                  {m.texto}
                </p>
              </div>)}
            {pensando ? <div className="flex justify-start">
                <p className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2 text-sm text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" /> Pensando…
                </p>
              </div> : null}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pt-2">
            {sugerencias.map((s) => <button
    key={s}
    type="button"
    disabled={pensando}
    onClick={() => enviar(s)}
    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
  >
                {s}
              </button>)}
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
    disabled={pensando}
    className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
  >
              {pensando ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </button>
          </form>
        </div> : null}

      <button
    type="button"
    onClick={() => setAbierto((v) => !v)}
    aria-label={abierto ? "Cerrar asistente" : "Abrir asistente"}
    className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
  >
        {abierto ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>
    </div>;
}
