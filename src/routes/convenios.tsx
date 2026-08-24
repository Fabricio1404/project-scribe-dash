import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, DataTable, StatCard, estadoTone } from "@/components/ui-bits";
import { convenios, formatDate, getProyecto } from "@/data/mock";

export const Route = createFileRoute("/convenios")({
  head: () => ({
    meta: [
      { title: "Convenios — CIT Nexus" },
      {
        name: "description",
        content: "Convenios y acuerdos del CIT Formosa con entidades públicas y privadas, con vigencias y proyectos ligados.",
      },
      { property: "og:title", content: "Convenios — CIT Nexus" },
      { property: "og:description", content: "Acuerdos institucionales del CIT Formosa, su vigencia y proyectos asociados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConveniosPage,
});

function ConveniosPage() {
  const vigentes = convenios.filter((c) => c.estado === "Vigente");

  return (
    <AppShell>
      <PageHeader
        title="Convenios"
        description="Acuerdos marco, específicos y cartas de intención con seguimiento de vencimientos."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Vigentes" value={vigentes.length} />
        <StatCard label="En negociación" value={convenios.filter((c) => c.estado === "En negociación").length} />
        <StatCard label="Vencidos" value={convenios.filter((c) => c.estado === "Vencido").length} detail="Requieren renovación" />
      </div>

      <DataTable head={["Convenio", "Entidad", "Tipo", "Vigencia", "Proyectos", "Estado"]}>
        {convenios.map((c) => (
          <tr key={c.id} className="align-top">
            <td className="px-4 py-3 font-medium">{c.titulo}</td>
            <td className="px-4 py-3 text-muted-foreground">{c.entidad}</td>
            <td className="px-4 py-3 text-muted-foreground">{c.tipo}</td>
            <td className="px-4 py-3 text-xs text-muted-foreground">
              {formatDate(c.firma)} → {formatDate(c.vencimiento)}
            </td>
            <td className="px-4 py-3 text-xs">
              <span className="flex flex-wrap gap-2">
                {c.proyectos.map((pid) => (
                  <Link
                    key={pid}
                    to="/proyectos/$proyectoId"
                    params={{ proyectoId: pid }}
                    className="text-primary hover:underline"
                  >
                    {getProyecto(pid)?.codigo}
                  </Link>
                ))}
              </span>
            </td>
            <td className="px-4 py-3">
              <Chip tone={estadoTone(c.estado)}>{c.estado}</Chip>
            </td>
          </tr>
        ))}
      </DataTable>
    </AppShell>
  );
}
