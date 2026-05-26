import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { dashboards } from "../../../lib/dashboards";

export default async function DashboardPage({ params }) {
  const { id } = params;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const dashboard = dashboards.find((d) => d.id === id);
  if (!dashboard) redirect("/");

  const user = await currentUser();
  const username = user?.username || user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "";

  // Controlla permessi
  if (dashboard.allowedUsers && dashboard.allowedUsers.length > 0) {
    const hasAccess = dashboard.allowedUsers.includes(username) || dashboard.allowedUsers.includes(userId);
    if (!hasAccess) redirect("/");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#f5f4f0" }}>
      {/* topbar */}
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #e2e0d8",
        padding: "0 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 52,
        flexShrink: 0,
      }}>
        <a href="/" style={{
          display: "flex", alignItems: "center", gap: 6,
          textDecoration: "none", color: "#6b6a65", fontSize: 13,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Hub
        </a>

        <span style={{ color: "#e2e0d8" }}>|</span>

        <span style={{ fontSize: 18 }}>{dashboard.icon}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1917" }}>{dashboard.title}</span>
        <span style={{
          fontSize: 10, padding: "2px 8px", borderRadius: 99,
          background: dashboard.iconBg, color: dashboard.iconColor,
          fontFamily: "monospace",
        }}>
          {dashboard.category}
        </span>

        <div style={{ marginLeft: "auto" }}>
          <a
            href={dashboard.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 12, color: "#1a5fb4", textDecoration: "none",
              border: "1px solid #e2e0d8", borderRadius: 6,
              padding: "5px 12px", background: "#fff",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Apri in nuova scheda
          </a>
        </div>
      </header>

      {/* iframe */}
      <iframe
        src={dashboard.url}
        style={{ flex: 1, border: "none", display: "block" }}
        title={dashboard.title}
      />
    </div>
  );
}
