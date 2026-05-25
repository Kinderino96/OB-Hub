// ─────────────────────────────────────────────────────────────────
// CONFIGURA QUI LE TUE DASHBOARD
// Aggiungi o rimuovi voci liberamente.
// Le password sono in chiaro qui — per maggiore sicurezza puoi
// spostarle su variabili d'ambiente Vercel (vedi README).
// ─────────────────────────────────────────────────────────────────

export const dashboards = [
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Report mensile club",
    url: "/report_loyalty_aprile.html",
    password: "+belloclub",
    category: "Loyalty",
    icon: "⭐",
    iconBg: "#fff8e1",
    iconColor: "#f57f17",
  },
  {
    id: "opzione-2",
    title: "Booking KPI",
    description: "Report KPI booking",
    url: "/booking-report_3.html",
    password: "OB_Booking_2026",
    category: "Booking",
    icon: "🏨",
    iconBg: "#e8f5e9",
    iconColor: "#2e7d32",
  },
  {
    id: "opzione-3",
    title: "Opzione 3",
    description: "Da aggiornare",
    url: "https://tuoserver.com/opzione-3.html",
    password: "opzione3-2025",
    category: "Dashboard",
    icon: "📈",
    iconBg: "#e3f2fd",
    iconColor: "#0d47a1",
  },
  {
    id: "opzione-4",
    title: "Opzione 4",
    description: "Da aggiornare",
    url: "https://tuoserver.com/opzione-4.html",
    password: "opzione4-2025",
    category: "Dashboard",
    icon: "📋",
    iconBg: "#f3e5f5",
    iconColor: "#6a1b9a",
  },
];
