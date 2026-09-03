"use strict";
import { Link } from "react-router-dom";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Chip, Panel, estadoTone } from "@/components/ui-bits";
import { getInvestigador, getProyecto, transferencias } from "@/data/mock";
const etapas = ["En investigaci\xF3n", "En evaluaci\xF3n", "Lista para transferir", "Transferida", "Licenciada"];
export default function TransferenciasPage() {
  return <AppShell>
      <PageHeader
    title="Transferencia tecnológica"
    description="Seguimiento del recorrido de cada desarrollo desde la investigación hasta su adopción."
  />

      <div className="grid gap-5 lg:grid-cols-2">
        {transferencias.map((t) => {
    const etapaIdx = etapas.indexOf(t.estado);
    return <Panel key={t.id}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-base font-semibold">{t.nombre}</h2>
                <Chip tone={estadoTone(t.estado)}>{t.estado}</Chip>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.descripcion}</p>

              <div className="mt-4 flex gap-1">
                {etapas.map((e, i) => <span
      key={e}
      title={e}
      className={i <= etapaIdx ? "h-1.5 flex-1 rounded-full bg-accent" : "h-1.5 flex-1 rounded-full bg-muted"}
    />)}
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
      to={`/proyectos/${t.proyectoId}`}
      className="text-primary hover:underline"
    >
                      {getProyecto(t.proyectoId)?.codigo}
                    </Link>
                  </dd>
                </div>
              </dl>
            </Panel>;
  })}
      </div>
    </AppShell>;
}
