"use strict";
import { Link } from "react-router-dom";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, DataTable, StatCard, estadoTone } from "@/components/ui-bits";
import { convenios, formatDate, getProyecto } from "@/data/mock";
export default function ConveniosPage() {
  const vigentes = convenios.filter((c) => c.estado === "Vigente");
  return <AppShell>
      <PageHeader
    title="Convenios"
    description="Acuerdos marco, específicos y cartas de intención con seguimiento de vencimientos."
  />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Vigentes" value={vigentes.length} />
        <StatCard label="En negociación" value={convenios.filter((c) => c.estado === "En negociaci\xF3n").length} />
        <StatCard label="Vencidos" value={convenios.filter((c) => c.estado === "Vencido").length} detail="Requieren renovación" />
      </div>

      <DataTable head={["Convenio", "Entidad", "Tipo", "Vigencia", "Proyectos", "Estado"]}>
        {convenios.map((c) => <tr key={c.id} className="align-top">
            <td className="px-4 py-3 font-medium">{c.titulo}</td>
            <td className="px-4 py-3 text-muted-foreground">{c.entidad}</td>
            <td className="px-4 py-3 text-muted-foreground">{c.tipo}</td>
            <td className="px-4 py-3 text-xs text-muted-foreground">
              {formatDate(c.firma)} → {formatDate(c.vencimiento)}
            </td>
            <td className="px-4 py-3 text-xs">
              <span className="flex flex-wrap gap-2">
                {c.proyectos.map((pid) => <Link
    key={pid}
    to={`/proyectos/${pid}`}
    className="text-primary hover:underline"
  >
                    {getProyecto(pid)?.codigo}
                  </Link>)}
              </span>
            </td>
            <td className="px-4 py-3">
              <Chip tone={estadoTone(c.estado)}>{c.estado}</Chip>
            </td>
          </tr>)}
      </DataTable>
    </AppShell>;
}
