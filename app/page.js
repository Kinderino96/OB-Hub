import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { dashboards } from "../lib/dashboards";

export default async function Home() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const username = user?.username || user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "utente";

  // Filtra le dashboard accessibili a questo utente
  const visibleDashboards = dashboards.filter((d) => {
    if (!d.allowedUsers || d.allowedUsers.length === 0) return true;
    return d.allowedUsers.includes(username) || d.allowedUsers.includes(userId);
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* topbar */}
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #e2e0d8",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 15 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          OB Hub
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#6b6a65" }}>
            Ciao, <strong>{username}</strong>
          </span>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </header>

      {/* grid dashboard */}
      <div style={{ maxWidth: 900, margin: "2.5rem auto", padding: "0 1.5rem" }}>
        <p style={{ fontSize: 13, color: "#6b6a65", marginBottom: "1.5rem" }}>
          {visibleDashboards.length} cruscott{visibleDashboards.length === 1 ? "o" : "i"} disponibil{visibleDashboards.length === 1 ? "e" : "i"} per il tuo account.
        </p>

        {visibleDashboards.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "3rem",
            background: "#fff", borderRadius: 12,
            border: "1px solid #e2e0d8", color: "#6b6a65",
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
            <p style={{ fontSize: 14 }}>Nessuna dashboard disponibile per il tuo account.</p>
            <p style={{ fontSize: 12, marginTop: 6 }}>Contatta l'amministratore per ottenere l'accesso.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 14,
          }}>
            {visibleDashboards.map((d) => (
              <Link key={d.id} href={`/dashboard/${d.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#fff",
                  border: "1px solid #e2e0d8",
                  borderRadius: 10,
                  padding: "1.1rem 1.2rem",
                  cursor: "pointer",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: d.iconBg,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 20, marginBottom: 12,
                  }}>
                    {d.icon}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1917", marginBottom: 4 }}>
                    {d.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b6a65", lineHeight: 1.5 }}>
                    {d.description}
                  </div>
                  <div style={{
                    display: "inline-block", marginTop: 10,
                    fontSize: 10, padding: "2px 8px", borderRadius: 99,
                    background: d.iconBg, color: d.iconColor,
                    fontFamily: "monospace",
                  }}>
                    {d.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
