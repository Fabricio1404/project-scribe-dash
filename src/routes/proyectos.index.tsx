import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, DataTable, ProgressBar, estadoTone } from "@/components/ui-bits";
import { formatDate, getInvestigador, getLinea, proyectos } from "@/data/mock";

export const Route = createFileRoute("/proyectos/")({
  head: () => ({
    meta: [
      { title: "Proyectos — CIT Nexus" },
      {
        name: "description",
        content: "Listado de proyectos del CIT Formosa con estado, línea, dirección, plazos y avance de objetivos.",
      },
      { property: "og:title", content: "Proyectos — CIT Nexus" },
      { property: "og:description", content: "Estado, plazos y avance de los proyectos científico-tecnológicos del CIT Formosa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProyectosPage,
});

function ProyectosPage() {
  return (
    <AppShell>
      <PageHeader
        title="Proyectos"
        description="Formulación, ejecución y cierre de proyectos con trazabilidad de objetivos y presupuesto."
      />

      <DataTable head={["Proyecto", "Línea", "Director", "Plazo", "Avance", "Estado"]}>
        {proyectos.map((p) => (
          <tr key={p.id} className="align-top">
            <td className="px-4 py-3">
              <Link
                to="/proyectos/$proyectoId"
                params={{ proyectoId: p.id }}
                className="font-medium hover:text-primary"
              >
                {p.titulo}
              </Link>
              <span className="mt-0.5 block text-xs text-muted-foreground">{p.codigo}</span>
            </td>
            <td className="px-4 py-3 text-muted-foreground">{getLinea(p.lineaId)?.nombre}</td>
            <td className="px-4 py-3 text-muted-foreground">{getInvestigador(p.directorId)?.nombre}</td>
            <td className="px-4 py-3 text-xs text-muted-foreground">
              {formatDate(p.inicio)} → {formatDate(p.fin)}
            </td>
            <td className="px-4 py-3">
              <div className="flex w-32 items-center gap-2">
                <ProgressBar value={p.avance} />
                <span className="text-xs text-muted-foreground">{p.avance}%</span>
              </div>
            </td>
            <td className="px-4 py-3">
              <Chip tone={estadoTone(p.estado)}>{p.estado}</Chip>
            </td>
          </tr>
        ))}
      </DataTable>
    </AppShell>
  );
}
