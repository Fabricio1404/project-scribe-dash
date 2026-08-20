import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, DataTable, Panel, PanelTitle, ProgressBar, StatCard, estadoTone } from "@/components/ui-bits";
import {
  alertas,
  convenios,
  formatMoney,
  getInvestigador,
  investigadores,
  lineas,
  proyectos,
  publicaciones,
  totalPresupuesto,
  transferencias,
} from "@/data/mock";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Panel general — CIT Nexus | CIT Formosa" },
      {
        name: "description",
        content:
          "Estado de proyectos, líneas de investigación, presupuesto y alertas del Centro de Investigación y Transferencia Formosa.",
      },
      { property: "og:title", content: "Panel general — CIT Nexus" },
      {
        property: "og:description",
        content: "Gestión científico-tecnológica integral del CIT Formosa: proyectos, equipos, presupuesto y transferencias.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const enEjecucion = proyectos.filter((p) => p.estado === "En ejecución");
  const becarios = investigadores.filter((i) => i.tipo === "Becario");
  const totales = proyectos.reduce(
    (acc, p) => {
      const t = totalPresupuesto(p);
      return { asignado: acc.asignado + t.asignado, ejecutado: acc.ejecutado + t.ejecutado };
    },
    { asignado: 0, ejecutado: 0 },
  );
  const ejecucionPct = Math.round((totales.ejecutado / totales.asignado) * 100);

  return (
    <AppShell>
      <PageHeader
        title="Panel general"
        description="Estado consolidado de la gestión científico-tecnológica del CIT Formosa."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Proyectos en ejecución" value={enEjecucion.length} detail={`${proyectos.length} proyectos registrados`} />
        <StatCard label="Líneas activas" value={lineas.filter((l) => l.estado === "Activa").length} detail="1 línea en riesgo de discontinuidad" />
        <StatCard label="Becarios vigentes" value={becarios.length} detail={`${investigadores.length} personas en el sistema`} />
        <StatCard label="Ejecución presupuestaria" value={`${ejecucionPct}%`} detail={`${formatMoney(totales.ejecutado)} de ${formatMoney(totales.asignado)}`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel>
          <PanelTitle hint="Avance de objetivos declarados en el plan de trabajo">Proyectos en ejecución</PanelTitle>
          <ul className="space-y-4">
            {enEjecucion.map((p) => (
              <li key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    to="/proyectos/$proyectoId"
                    params={{ proyectoId: p.id }}
                    className="font-medium hover:text-primary"
                  >
                    {p.titulo}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {p.codigo} · {getInvestigador(p.directorId)?.nombre}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <ProgressBar value={p.avance} />
                  <span className="w-10 shrink-0 text-right text-xs font-medium text-muted-foreground">{p.avance}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelTitle hint="Generadas por los agentes de seguimiento">Alertas activas</PanelTitle>
          <ul className="space-y-3">
            {alertas.map((a) => (
              <li key={a.id} className="rounded-md border border-border p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={a.severidad === "alta" ? "size-4 text-destructive" : "size-4 text-warning"} />
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{a.tipo}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{a.texto}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Líneas de investigación
          </h2>
          <DataTable head={["Línea", "Director actual", "Proyectos", "Estado"]}>
            {lineas.map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-3 font-medium">{l.nombre}</td>
                <td className="px-4 py-3 text-muted-foreground">{l.directorActual}</td>
                <td className="px-4 py-3 text-muted-foreground">{l.proyectos}</td>
                <td className="px-4 py-3">
                  <Chip tone={estadoTone(l.estado)}>{l.estado}</Chip>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          <StatCard label="Publicaciones" value={publicaciones.length} detail={`${publicaciones.filter((p) => p.visibilidad === "Pública").length} públicas`} />
          <StatCard
            label="Transferencias"
            value={transferencias.length}
            detail={`${transferencias.filter((t) => t.estado === "Lista para transferir").length} listas para transferir`}
          />
          <StatCard
            label="Convenios vigentes"
            value={convenios.filter((c) => c.estado === "Vigente").length}
            detail={`${convenios.filter((c) => c.estado === "En negociación").length} en negociación`}
          />
        </div>
      </div>
    </AppShell>
  );
}
