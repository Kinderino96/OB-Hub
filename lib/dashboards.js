// ─────────────────────────────────────────────────────────────────
// CONFIGURAZIONE DASHBOARD
// Per ogni dashboard definisci quali utenti possono accedervi.
// Gli utenti sono identificati dal loro username Clerk.
// Lascia allowedUsers vuoto [] per renderla accessibile a tutti gli utenti loggati.
// ─────────────────────────────────────────────────────────────────

export const dashboards = [
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Report mensile club",
    url: "/report_loyalty_aprile.html",
    category: "Loyalty",
    icon: "⭐",
    iconBg: "#fff8e1",
    iconColor: "#f57f17",
    allowedUsers: ["marcof"],
  },
  {
    id: "booking",
    title: "Booking KPI",
    description: "Report KPI booking",
    url: "/booking-report_3.html",
    category: "Booking",
    icon: "🏨",
    iconBg: "#e8f5e9",
    iconColor: "#2e7d32",
    allowedUsers: ["marcof"],
  },
  {
    id: "opzione-3",
    title: "Opzione 3",
    description: "Da aggiornare",
    url: "/opzione-3.html",
    category: "Dashboard",
    icon: "📈",
    iconBg: "#e3f2fd",
    iconColor: "#0d47a1",
    allowedUsers: ["marcof"],
  },
  {
    id: "opzione-4",
    title: "Opzione 4",
    description: "Da aggiornare",
    url: "/opzione-4.html",
    category: "Dashboard",
    icon: "📋",
    iconBg: "#f3e5f5",
    iconColor: "#6a1b9a",
    allowedUsers: ["marcof"],
  },
];
