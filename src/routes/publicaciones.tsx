import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, DataTable, StatCard } from "@/components/ui-bits";
import { formatDate, getProyecto, publicaciones } from "@/data/mock";

export const Route = createFileRoute("/publicaciones")({
  head: () => ({
    meta: [
      { title: "Publicaciones — CIT Nexus" },
      {
        name: "description",
        content: "Producción científica del CIT Formosa: artículos, capítulos y congresos con DOI y proyecto asociado.",
      },
      { property: "og:title", content: "Publicaciones — CIT Nexus" },
      { property: "og:description", content: "Artículos, capítulos y congresos producidos por los proyectos del CIT Formosa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PublicacionesPage,
});

function PublicacionesPage() {
  const publicas = publicaciones.filter((p) => p.visibilidad === "Pública");

  return (
    <AppShell>
      <PageHeader
        title="Publicaciones"
        description="Producción científica vinculada a los proyectos, con control de visibilidad pública o interna."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total registradas" value={publicaciones.length} />
        <StatCard label="Públicas" value={publicas.length} detail="Visibles en el repositorio institucional" />
        <StatCard label="Solo internas" value={publicaciones.length - publicas.length} />
      </div>

      <DataTable head={["Título", "Tipo", "Autores", "Proyecto", "Fecha", "Visibilidad"]}>
        {publicaciones.map((p) => (
          <tr key={p.id} className="align-top">
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
                to="/proyectos/$proyectoId"
                params={{ proyectoId: p.proyectoId }}
                className="text-xs text-primary hover:underline"
              >
                {getProyecto(p.proyectoId)?.codigo}
              </Link>
            </td>
            <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(p.fecha)}</td>
            <td className="px-4 py-3">
              <Chip tone={p.visibilidad === "Pública" ? "success" : "neutral"}>{p.visibilidad}</Chip>
            </td>
          </tr>
        ))}
      </DataTable>
    </AppShell>
  );
}
