import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  GitBranch,
  FolderKanban,
  Users,
  Wallet,
  BookOpen,
  Rocket,
  FileSignature,
  BarChart3,
  Bell,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { AssistantBubble } from "./AssistantBubble";

const nav: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "Panel general", icon: LayoutDashboard },
  { to: "/lineas", label: "Líneas de investigación", icon: GitBranch },
  { to: "/proyectos", label: "Proyectos", icon: FolderKanban },
  { to: "/investigadores", label: "Investigadores y becarios", icon: Users },
  { to: "/presupuesto", label: "Presupuesto", icon: Wallet },
  { to: "/publicaciones", label: "Publicaciones", icon: BookOpen },
  { to: "/transferencias", label: "Transferencia tecnológica", icon: Rocket },
  { to: "/convenios", label: "Convenios", icon: FileSignature },
  { to: "/reportes", label: "Reportes institucionales", icon: BarChart3 },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16.5rem_1fr]">
      <aside className="hidden bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <span className="grid size-9 place-items-center rounded-md bg-sidebar-primary font-display text-sm font-bold text-sidebar-primary-foreground">
            CN
          </span>
          <span>
            <span className="block font-display text-base font-semibold leading-tight">CIT Nexus</span>
            <span className="block text-xs text-sidebar-foreground/60">CIT Formosa</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium" }}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-sidebar-border px-5 py-4 text-xs text-sidebar-foreground/60">
          Prototipo con datos de ejemplo
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-card/90 px-5 py-3 backdrop-blur">
          <span className="font-display text-sm font-semibold lg:hidden">CIT Nexus</span>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className="relative grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Alertas"
            >
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                MS
              </span>
              <span className="hidden text-sm leading-tight sm:block">
                <span className="block font-medium">Dra. Mirta Sosa</span>
                <span className="block text-xs text-muted-foreground">Dirección de línea</span>
              </span>
            </div>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-3 py-2 lg:hidden">
          {nav.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs text-muted-foreground"
              activeProps={{ className: "bg-primary-soft text-primary font-medium" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      <AssistantBubble />
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions}
    </div>
  );
}
