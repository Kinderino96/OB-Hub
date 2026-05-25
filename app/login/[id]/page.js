"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function LoginPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dashboardId: id, password }),
    });

    const data = await res.json();
    if (data.ok) {
      router.push(`/dashboard/${id}`);
    } else {
      setError("Password errata. Riprova.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "#f5f4f0", padding: "1rem",
    }}>
      <div style={{
        background: "#fff", borderRadius: 14,
        border: "1px solid #e2e0d8",
        padding: "2.5rem 2rem", width: "100%", maxWidth: 360,
      }}>
        {/* logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: "#1a1917", margin: 0 }}>
            Accesso richiesto
          </h1>
          <p style={{ fontSize: 13, color: "#6b6a65", marginTop: 6 }}>
            Inserisci la password per questa dashboard
          </p>
          <div style={{
            marginTop: 10, display: "inline-block",
            fontSize: 11, padding: "3px 10px", borderRadius: 99,
            background: "#e8f0fd", color: "#1a4a8a",
            fontFamily: "monospace",
          }}>
            {id}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: 12, color: "#6b6a65", display: "block", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              style={{
                width: "100%", padding: "10px 12px",
                border: error ? "1px solid #e24b4a" : "1px solid #e2e0d8",
                borderRadius: 8, fontSize: 14, outline: "none",
                boxSizing: "border-box", background: "#f5f4f0",
                transition: "border-color 0.15s",
              }}
            />
          </div>

          {error && (
            <div style={{
              fontSize: 12, color: "#a32d2d", background: "#fcebeb",
              border: "1px solid #f7c1c1", borderRadius: 6,
              padding: "8px 12px", marginBottom: "1rem",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "10px",
              background: loading ? "#b0bec5" : "#1a5fb4",
              color: "#fff", border: "none", borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}
          >
            {loading ? "Accesso in corso…" : "Accedi"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <a href="/" style={{ fontSize: 12, color: "#6b6a65", textDecoration: "none" }}>
            ← Torna all'hub
          </a>
        </div>
      </div>
    </div>
  );
}
