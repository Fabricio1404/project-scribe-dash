import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, Panel, estadoTone } from "@/components/ui-bits";
import { getInvestigador, getProyecto, transferencias } from "@/data/mock";

export const Route = createFileRoute("/transferencias")({
  head: () => ({
    meta: [
      { title: "Transferencia tecnológica — CIT Nexus" },
      {
        name: "description",
        content: "Desarrollos del CIT Formosa en camino a la transferencia: estado, beneficiario y responsable técnico.",
      },
      { property: "og:title", content: "Transferencia tecnológica — CIT Nexus" },
      { property: "og:description", content: "Tecnologías y servicios del CIT Formosa listos para transferir al territorio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TransferenciasPage,
});

const etapas = ["En investigación", "En evaluación", "Lista para transferir", "Transferida", "Licenciada"] as const;

function TransferenciasPage() {
  return (
    <AppShell>
      <PageHeader
        title="Transferencia tecnológica"
        description="Seguimiento del recorrido de cada desarrollo desde la investigación hasta su adopción."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {transferencias.map((t) => {
          const etapaIdx = etapas.indexOf(t.estado as (typeof etapas)[number]);
          return (
            <Panel key={t.id}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-base font-semibold">{t.nombre}</h2>
                <Chip tone={estadoTone(t.estado)}>{t.estado}</Chip>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.descripcion}</p>

              <div className="mt-4 flex gap-1">
                {etapas.map((e, i) => (
                  <span
                    key={e}
                    title={e}
                    className={
                      i <= etapaIdx
                        ? "h-1.5 flex-1 rounded-full bg-accent"
                        : "h-1.5 flex-1 rounded-full bg-muted"
                    }
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Etapa {etapaIdx + 1} de {etapas.length}
              </p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Beneficiario</dt>
                  <dd>{t.beneficiario}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Responsable</dt>
                  <dd>{getInvestigador(t.responsableId)?.nombre}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Proyecto</dt>
                  <dd>
                    <Link
                      to="/proyectos/$proyectoId"
                      params={{ proyectoId: t.proyectoId }}
                      className="text-primary hover:underline"
                    >
                      {getProyecto(t.proyectoId)?.codigo}
                    </Link>
                  </dd>
                </div>
              </dl>
            </Panel>
          );
        })}
      </div>
    </AppShell>
  );
}
