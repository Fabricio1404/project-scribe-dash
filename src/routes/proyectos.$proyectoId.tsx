import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, DataTable, Panel, PanelTitle, ProgressBar, StatCard, estadoTone } from "@/components/ui-bits";
import {
  formatDate,
  formatMoney,
  getInvestigador,
  getLinea,
  getProyecto,
  publicaciones,
  totalPresupuesto,
  transferencias,
} from "@/data/mock";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/proyectos/$proyectoId")({
  loader: ({ params }) => {
    const proyecto = getProyecto(params.proyectoId);
    if (!proyecto) throw notFound();
    return { proyecto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Proyecto no encontrado — CIT Nexus" }, { name: "robots", content: "noindex" }] };
    }
    const { proyecto } = loaderData;
    return {
      meta: [
        { title: `${proyecto.codigo} — CIT Nexus` },
        { name: "description", content: proyecto.resumen.slice(0, 155) },
        { property: "og:title", content: proyecto.titulo },
        { property: "og:description", content: proyecto.resumen.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ProyectoDetalle,
  notFoundComponent: ProyectoNoEncontrado,
});

function ProyectoNoEncontrado() {
  return (
    <AppShell>
      <PageHeader title="Proyecto no encontrado" description="El proyecto solicitado no existe en el sistema." />
      <Link to="/proyectos" className="text-sm text-primary hover:underline">
        Volver al listado
      </Link>
    </AppShell>
  );
}

function ProyectoDetalle() {
  const { proyecto: p } = Route.useLoaderData();
  const totales = totalPresupuesto(p);
  const pct = totales.asignado ? Math.round((totales.ejecutado / totales.asignado) * 100) : 0;
  const pubs = publicaciones.filter((x) => x.proyectoId === p.id);
  const transf = transferencias.filter((x) => x.proyectoId === p.id);

  return (
    <AppShell>
      <Link
        to="/proyectos"
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Proyectos
      </Link>

      <PageHeader
        title={p.titulo}
        description={p.resumen}
        actions={<Chip tone={estadoTone(p.estado)}>{p.estado}</Chip>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Código" value={p.codigo} detail={getLinea(p.lineaId)?.nombre} />
        <StatCard label="Avance general" value={`${p.avance}%`} detail={`${formatDate(p.inicio)} → ${formatDate(p.fin)}`} />
        <StatCard label="Ejecución presupuestaria" value={`${pct}%`} detail={`${formatMoney(totales.ejecutado)} de ${formatMoney(totales.asignado)}`} />
        <StatCard label="Financiador" value={p.financiador} detail={`Dirección: ${getInvestigador(p.directorId)?.nombre ?? "sin asignar"}`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelTitle hint={p.objetivoGeneral}>Objetivos específicos</PanelTitle>
          <ul className="space-y-4">
            {p.objetivos.map((o) => (
              <li key={o.descripcion}>
                <div className="flex justify-between gap-3 text-sm">
                  <span>{o.descripcion}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{o.avance}%</span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={o.avance} tone="accent" />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border pt-4">
            <PanelTitle>Metodología</PanelTitle>
            <p className="text-sm text-muted-foreground">{p.metodologia}</p>
          </div>
        </Panel>

        <Panel>
          <PanelTitle hint="Roles y dedicación declarada">Equipo</PanelTitle>
          <ul className="space-y-3">
            {p.equipo.map((m) => {
              const inv = getInvestigador(m.investigadorId);
              return (
                <li key={m.investigadorId} className="flex items-center justify-between gap-3 text-sm">
                  <span>
                    <span className="block font-medium">{inv?.nombre}</span>
                    <span className="block text-xs text-muted-foreground">{m.rol}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{m.dedicacion}%</span>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Cronograma
          </h2>
          <DataTable head={["Actividad", "Año", "Estado"]}>
            {p.cronograma.map((a) => (
              <tr key={a.nombre}>
                <td className="px-4 py-3">{a.nombre}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.anio}</td>
                <td className="px-4 py-3">
                  <Chip tone={estadoTone(a.estado)}>{a.estado}</Chip>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>

        <div>
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Presupuesto por rubro
          </h2>
          <DataTable head={["Rubro", "Categoría", "Asignado", "Ejecutado"]}>
            {p.presupuesto.map((r) => (
              <tr key={r.rubro + r.anio}>
                <td className="px-4 py-3">{r.rubro}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{r.categoria}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatMoney(r.asignado)}</td>
                <td className="px-4 py-3 font-medium">{formatMoney(r.ejecutado)}</td>
              </tr>
            ))}
            {p.presupuesto.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-muted-foreground">
                  Sin presupuesto asignado (proyecto en formulación).
                </td>
              </tr>
            ) : null}
          </DataTable>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel>
          <PanelTitle>Hitos y contingencias</PanelTitle>
          <ul className="space-y-3">
            {p.hitos.map((h) => (
              <li key={h.fecha + h.texto} className="rounded-md border border-border p-3 text-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-accent">Hito · {formatDate(h.fecha)}</span>
                <p className="mt-1 text-muted-foreground">{h.texto}</p>
              </li>
            ))}
            {p.contingencias.map((c) => (
              <li key={c.fecha + c.texto} className="rounded-md border border-border p-3 text-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-destructive">
                  Contingencia · {formatDate(c.fecha)}
                </span>
                <p className="mt-1 text-muted-foreground">{c.texto}</p>
              </li>
            ))}
            {p.hitos.length + p.contingencias.length === 0 ? (
              <li className="text-sm text-muted-foreground">Sin registros.</li>
            ) : null}
          </ul>
        </Panel>

        <Panel>
          <PanelTitle>Resultados asociados</PanelTitle>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Publicaciones</p>
          <ul className="mt-2 space-y-2 text-sm">
            {pubs.length ? (
              pubs.map((pub) => (
                <li key={pub.id}>
                  <span className="block">{pub.titulo}</span>
                  <span className="block text-xs text-muted-foreground">
                    {pub.tipo} · {pub.revista} · {formatDate(pub.fecha)}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">Sin publicaciones registradas.</li>
            )}
          </ul>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Transferencias</p>
          <ul className="mt-2 space-y-2 text-sm">
            {transf.length ? (
              transf.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3">
                  <span>{t.nombre}</span>
                  <Chip tone={estadoTone(t.estado)}>{t.estado}</Chip>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">Sin transferencias asociadas.</li>
            )}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
