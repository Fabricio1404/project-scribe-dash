"use strict";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DataTable, Panel, PanelTitle, ProgressBar, StatCard } from "@/components/ui-bits";
import { formatMoney, proyectos, totalPresupuesto } from "@/data/mock";
export default function PresupuestoPage() {
  const porRubro = /* @__PURE__ */ new Map();
  for (const p of proyectos) {
    for (const r of p.presupuesto) {
      const prev = porRubro.get(r.rubro) ?? { asignado: 0, ejecutado: 0, categoria: r.categoria };
      porRubro.set(r.rubro, {
        categoria: r.categoria,
        asignado: prev.asignado + r.asignado,
        ejecutado: prev.ejecutado + r.ejecutado
      });
    }
  }
  const totales = proyectos.reduce(
    (acc, p) => {
      const t = totalPresupuesto(p);
      return { asignado: acc.asignado + t.asignado, ejecutado: acc.ejecutado + t.ejecutado };
    },
    { asignado: 0, ejecutado: 0 }
  );
  const pct = Math.round(totales.ejecutado / totales.asignado * 100);
  return <AppShell>
      <PageHeader
    title="Presupuesto"
    description="Asignación y ejecución por proyecto y rubro, con distinción entre gastos de capital y corrientes."
  />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Asignado total" value={formatMoney(totales.asignado)} detail="Ejercicio 2025" />
        <StatCard label="Ejecutado" value={formatMoney(totales.ejecutado)} detail={`${pct}% del total asignado`} />
        <StatCard label="Saldo disponible" value={formatMoney(totales.asignado - totales.ejecutado)} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Panel>
          <PanelTitle hint="Consolidado de todos los proyectos">Ejecución por rubro</PanelTitle>
          <ul className="space-y-4">
            {[...porRubro.entries()].map(([rubro, v]) => {
    const p = Math.round(v.ejecutado / v.asignado * 100);
    return <li key={rubro}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">{rubro}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatMoney(v.ejecutado)} / {formatMoney(v.asignado)} · {p}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={p} tone={v.categoria === "Gastos de capital" ? "accent" : "primary"} />
                  </div>
                </li>;
  })}
          </ul>
        </Panel>

        <div>
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Ejecución por proyecto
          </h2>
          <DataTable head={["Proyecto", "Asignado", "Ejecutado", "%"]}>
            {proyectos.map((p) => {
    const t = totalPresupuesto(p);
    const pp = t.asignado ? Math.round(t.ejecutado / t.asignado * 100) : 0;
    return <tr key={p.id}>
                  <td className="px-4 py-3">
                    <span className="font-medium">{p.codigo}</span>
                    <span className="mt-0.5 block max-w-xs truncate text-xs text-muted-foreground">{p.titulo}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatMoney(t.asignado)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatMoney(t.ejecutado)}</td>
                  <td className="px-4 py-3 font-medium">{pp}%</td>
                </tr>;
  })}
          </DataTable>
        </div>
      </div>
    </AppShell>;
}
