"use strict";
import { Link } from "react-router-dom";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, DataTable, StatCard } from "@/components/ui-bits";
import { formatDate, getProyecto, publicaciones } from "@/data/mock";
export default function PublicacionesPage() {
  const publicas = publicaciones.filter((p) => p.visibilidad === "P\xFAblica");
  return <AppShell>
      <PageHeader
    title="Publicaciones"
    description="Producción científica vinculada a los proyectos, con control de visibilidad pública o interna."
  />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total registradas" value={publicaciones.length} />
        <StatCard label="Públicas" value={publicas.length} detail="Visibles en el repositorio institucional" />
        <StatCard label="Solo internas" value={publicaciones.length - publicas.length} />
      </div>

      <DataTable head={["T\xEDtulo", "Tipo", "Autores", "Proyecto", "Fecha", "Visibilidad"]}>
        {publicaciones.map((p) => <tr key={p.id} className="align-top">
            <td className="px-4 py-3">
              <span className="font-medium">{p.titulo}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {p.revista} · DOI {p.doi}
              </span>
            </td>
            <td className="px-4 py-3 text-muted-foreground">{p.tipo}</td>
            <td className="px-4 py-3 text-xs text-muted-foreground">{p.autores.join("; ")}</td>
            <td className="px-4 py-3">
              <Link
    to={`/proyectos/${p.proyectoId}`}
    className="text-xs text-primary hover:underline"
  >
                {getProyecto(p.proyectoId)?.codigo}
              </Link>
            </td>
            <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(p.fecha)}</td>
            <td className="px-4 py-3">
              <Chip tone={p.visibilidad === "P\xFAblica" ? "success" : "neutral"}>{p.visibilidad}</Chip>
            </td>
          </tr>)}
      </DataTable>
    </AppShell>;
}
