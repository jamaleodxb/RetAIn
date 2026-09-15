import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              R
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground">
              RetainAI
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "font-medium text-foreground" }}
            >
              Portfolio
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
