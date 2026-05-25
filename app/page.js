import { cookies } from "next/headers";
import Link from "next/link";
import { dashboards } from "../lib/dashboards";
import { verifyToken, getCookieName } from "../lib/auth";

export default async function Home() {
  const cookieStore = cookies();

  const statuses = await Promise.all(
    dashboards.map(async (d) => {
      const cookieName = getCookieName(d.id);
      const token = cookieStore.get(cookieName)?.value;
      if (!token) return { id: d.id, unlocked: false };
      const payload = await verifyToken(token);
      return { id: d.id, unlocked: !!payload && payload.dashboardId === d.id };
    })
  );

  const statusMap = Object.fromEntries(statuses.map((s) => [s.id, s.unlocked]));

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* topbar */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #e2e0d8",
        padding: "0 2rem", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 56,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 15 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          Dashboard Hub
        </div>
        <span style={{ fontSize: 12, color: "#9e9c96", fontFamily: "monospace" }}>
          {dashboards.length} cruscotti disponibili
        </span>
      </header>

      {/* grid */}
      <div style={{ maxWidth: 900, margin: "2.5rem auto", padding: "0 1.5rem" }}>
        <p style={{ fontSize: 13, color: "#6b6a65", marginBottom: "1.5rem" }}>
          Seleziona un cruscotto. Quelli con il lucchetto richiedono la password.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 14,
        }}>
          {dashboards.map((d) => {
            const unlocked = statusMap[d.id];
            return (
              <Link
                key={d.id}
                href={unlocked ? `/dashboard/${d.id}` : `/login/${d.id}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  background: "#fff",
                  border: "1px solid #e2e0d8",
                  borderRadius: 10,
                  padding: "1.1rem 1.2rem",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                  position: "relative",
                }}>
                  {/* status badge */}
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    fontSize: 14, opacity: 0.6,
                  }}>
                    {unlocked ? "🔓" : "🔒"}
                  </div>

                  {/* icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: d.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, marginBottom: 12,
                  }}>
                    {d.icon}
                  </div>

                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1917", marginBottom: 4 }}>
                    {d.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b6a65", lineHeight: 1.5 }}>
                    {d.description}
                  </div>

                  {/* category tag */}
                  <div style={{
                    display: "inline-block", marginTop: 10,
                    fontSize: 10, padding: "2px 8px", borderRadius: 99,
                    background: d.iconBg, color: d.iconColor,
                    fontFamily: "monospace", letterSpacing: "0.05em",
                  }}>
                    {d.category}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
