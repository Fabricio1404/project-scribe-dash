import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, Panel, estadoTone } from "@/components/ui-bits";
import { lineas } from "@/data/mock";

export const Route = createFileRoute("/lineas")({
  head: () => ({
    meta: [
      { title: "Líneas de investigación — CIT Nexus" },
      {
        name: "description",
        content: "Líneas de investigación del CIT Formosa, sus directores, historial de dirección y estado de continuidad.",
      },
      { property: "og:title", content: "Líneas de investigación — CIT Nexus" },
      { property: "og:description", content: "Direcciones, historial y continuidad de las líneas científicas del CIT Formosa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LineasPage,
});

function LineasPage() {
  return (
    <AppShell>
      <PageHeader
        title="Líneas de investigación"
        description="Cada línea agrupa proyectos y mantiene la memoria institucional de su dirección."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {lineas.map((l) => (
          <Panel key={l.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold">{l.nombre}</h2>
                <p className="text-xs text-muted-foreground">{l.area}</p>
              </div>
              <Chip tone={estadoTone(l.estado)}>{l.estado}</Chip>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{l.descripcion}</p>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Director actual</dt>
                <dd className="font-medium">{l.directorActual}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Proyectos</dt>
                <dd className="font-medium">{l.proyectos}</dd>
              </div>
            </dl>

            <div className="mt-4 border-t border-border pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Historial de dirección
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {l.historialDirectores.map((h) => (
                  <li key={h.nombre} className="flex justify-between gap-3">
                    <span>{h.nombre}</span>
                    <span className="text-xs">{h.periodo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
