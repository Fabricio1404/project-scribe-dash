"use strict";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DataTable, Panel, PanelTitle, ProgressBar, StatCard } from "@/components/ui-bits";
import {
  convenios,
  diagnosticosPorMes,
  formatMoney,
  investigadores,
  lineas,
  proyectos,
  publicaciones,
  totalPresupuesto,
  transferencias
} from "@/data/mock";
import { Download } from "lucide-react";
export default function ReportesPage() {
  const maxDiag = Math.max(...diagnosticosPorMes.map((d) => d.positivos + d.negativos));
  const totales = proyectos.reduce(
    (acc, p) => {
      const t = totalPresupuesto(p);
      return { asignado: acc.asignado + t.asignado, ejecutado: acc.ejecutado + t.ejecutado };
    },
    { asignado: 0, ejecutado: 0 }
  );
  return <AppShell>
      <PageHeader
    title="Reportes institucionales"
    description="Indicadores consolidados para memoria anual y rendición ante organismos de financiamiento."
    actions={<button
      type="button"
      className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
            <Download className="size-4" /> Exportar memoria
          </button>}
  />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Proyectos" value={proyectos.length} detail={`${lineas.length} l\xEDneas de investigaci\xF3n`} />
        <StatCard label="Producción científica" value={publicaciones.length} detail="Artículos, capítulos y congresos" />
        <StatCard label="Transferencias" value={transferencias.length} detail={`${convenios.length} convenios registrados`} />
        <StatCard label="Ejecutado" value={formatMoney(totales.ejecutado)} detail={`de ${formatMoney(totales.asignado)} asignados`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelTitle hint="Servicios de diagnóstico prestados a terceros durante 2025">
            Diagnósticos mensuales
          </PanelTitle>
          <div className="flex h-52 items-end gap-3">
            {diagnosticosPorMes.map((d) => {
    const total = d.positivos + d.negativos;
    return <div key={d.mes} className="flex flex-1 flex-col items-center gap-2">
                  <div
      className="flex w-full flex-col justify-end overflow-hidden rounded-t-md"
      style={{ height: `${total / maxDiag * 100}%` }}
      title={`${total} an\xE1lisis \xB7 ${d.positivos} positivos`}
    >
                    <div className="w-full bg-primary" style={{ height: `${d.negativos / total * 100}%` }} />
                    <div className="w-full bg-warning" style={{ height: `${d.positivos / total * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.mes}</span>
                </div>;
  })}
          </div>
          <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-primary" /> Negativos
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-warning" /> Positivos
            </span>
          </div>
        </Panel>

        <Panel>
          <PanelTitle hint="Distribución de recursos humanos por línea">Personal por línea</PanelTitle>
          <ul className="space-y-4">
            {lineas.map((l) => {
    const cantidad = investigadores.filter((i) => i.lineas.includes(l.nombre)).length;
    return <li key={l.id}>
                  <div className="flex justify-between text-sm">
                    <span>{l.nombre}</span>
                    <span className="text-xs text-muted-foreground">{cantidad} personas</span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={cantidad / investigadores.length * 100} tone="accent" />
                  </div>
                </li>;
  })}
          </ul>
        </Panel>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Producción por línea
        </h2>
        <DataTable head={["L\xEDnea", "Proyectos", "Publicaciones", "Transferencias", "Estado"]}>
          {lineas.map((l) => {
    const ids = proyectos.filter((p) => p.lineaId === l.id).map((p) => p.id);
    return <tr key={l.id}>
                <td className="px-4 py-3 font-medium">{l.nombre}</td>
                <td className="px-4 py-3 text-muted-foreground">{ids.length}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {publicaciones.filter((p) => ids.includes(p.proyectoId)).length}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {transferencias.filter((t) => ids.includes(t.proyectoId)).length}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{l.estado}</td>
              </tr>;
  })}
        </DataTable>
      </div>
    </AppShell>;
}
