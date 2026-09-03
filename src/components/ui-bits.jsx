"use strict";
import { cn } from "@/lib/utils";
const toneMap = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary-soft text-primary",
  success: "bg-accent-soft text-accent",
  warning: "bg-warning/20 text-warning-foreground",
  danger: "bg-destructive/12 text-destructive"
};
export function Chip({ children, tone = "neutral" }) {
  return <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
      toneMap[tone]
    )}
  >
      {children}
    </span>;
}
export function estadoTone(estado) {
  switch (estado) {
    case "Activa":
    case "En ejecuci\xF3n":
    case "Vigente":
    case "Transferida":
    case "Licenciada":
    case "Completada":
      return "success";
    case "En riesgo":
    case "Suspendido":
    case "Vencido":
    case "Demorada":
      return "danger";
    case "En formulaci\xF3n":
    case "En negociaci\xF3n":
    case "En evaluaci\xF3n":
    case "Lista para transferir":
    case "En curso":
      return "primary";
    default:
      return "neutral";
  }
}
export function Panel({ children, className }) {
  return <section className={cn("surface-panel p-5", className)}>{children}</section>;
}
export function PanelTitle({ children, hint }) {
  return <div className="mb-4">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {children}
      </h2>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>;
}
export function ProgressBar({ value, tone = "primary" }) {
  return <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
    className={cn("h-full rounded-full", tone === "accent" ? "bg-accent" : "bg-primary")}
    style={{ width: `${Math.min(100, value)}%` }}
  />
    </div>;
}
export function StatCard({
  label,
  value,
  detail
}) {
  return <div className="surface-panel p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
      {detail ? <p className="mt-1 text-xs text-muted-foreground">{detail}</p> : null}
    </div>;
}
export function DataTable({ head, children }) {
  return <div className="surface-panel overflow-x-auto">
      <table className="w-full min-w-[42rem] text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            {head.map((h) => <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {h}
              </th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>;
}
