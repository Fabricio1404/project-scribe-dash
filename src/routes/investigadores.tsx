import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, DataTable, StatCard } from "@/components/ui-bits";
import { investigadores } from "@/data/mock";

export const Route = createFileRoute("/investigadores")({
  head: () => ({
    meta: [
      { title: "Investigadores y becarios — CIT Nexus" },
      {
        name: "description",
        content: "Legajo científico del CIT Formosa: categorías, ORCID, líneas asociadas, becas vigentes y dedicación horaria.",
      },
      { property: "og:title", content: "Investigadores y becarios — CIT Nexus" },
      { property: "og:description", content: "Personal científico del CIT Formosa con dedicación, becas y líneas asociadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InvestigadoresPage,
});

function InvestigadoresPage() {
  const becarios = investigadores.filter((i) => i.tipo === "Becario");
  const sobrecargados = investigadores.filter((i) => i.dedicacionTotal > 100);

  return (
    <AppShell>
      <PageHeader
        title="Investigadores y becarios"
        description="Legajo unificado con categoría, líneas asociadas y control de dedicación horaria."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Personas registradas" value={investigadores.length} />
        <StatCard label="Becarios vigentes" value={becarios.length} detail="Doctorales, postdoctorales e iniciación" />
        <StatCard
          label="Dedicación excedida"
          value={sobrecargados.length}
          detail={sobrecargados.map((s) => s.nombre).join(", ") || "Sin sobrecargas"}
        />
      </div>

      <DataTable head={["Nombre", "Categoría", "Tipo", "Líneas", "ORCID", "Dedicación"]}>
        {investigadores.map((i) => (
          <tr key={i.id} className="align-top">
            <td className="px-4 py-3">
              <span className="font-medium">{i.nombre}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{i.email}</span>
            </td>
            <td className="px-4 py-3 text-muted-foreground">
              {i.categoria}
              {i.periodoBeca ? <span className="block text-xs">{i.periodoBeca}</span> : null}
            </td>
            <td className="px-4 py-3">
              <Chip tone={i.tipo === "Becario" ? "primary" : "neutral"}>{i.tipo}</Chip>
              {i.directorAsignado ? (
                <span className="mt-1 block text-xs text-muted-foreground">Dir.: {i.directorAsignado}</span>
              ) : null}
            </td>
            <td className="px-4 py-3 text-muted-foreground">{i.lineas.join(", ")}</td>
            <td className="px-4 py-3 text-xs text-muted-foreground">{i.orcid}</td>
            <td className="px-4 py-3">
              <Chip tone={i.dedicacionTotal > 100 ? "danger" : "success"}>{i.dedicacionTotal}%</Chip>
            </td>
          </tr>
        ))}
      </DataTable>
    </AppShell>
  );
}
