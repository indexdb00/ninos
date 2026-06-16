import { useState } from "react";
import { STORE_APPS } from "@/data/plans";

interface Props {
  t: Record<string, string>;
  installed: string[];
  setInstalled: React.Dispatch<React.SetStateAction<string[]>>;
}

export function StorePage({ t, installed, setInstalled }: Props) {
  const [filter, setFilter] = useState("all");
  const cats = ["all", ...Array.from(new Set(STORE_APPS.map((a) => a.cat)))];
  const filtered = filter === "all" ? STORE_APPS : STORE_APPS.filter((a) => a.cat === filter);

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontWeight: 800, fontSize: 23, color: "var(--text)", marginBottom: 4 }}>{t.storeTitle}</h1>
        <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Conecte suas plataformas de anúncios e ferramentas criativas</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ padding: "6px 16px", borderRadius: 20, border: "1.5px solid var(--border)", fontSize: 13, fontWeight: 600, cursor: "pointer", background: filter === c ? "var(--primary)" : "var(--surface2)", color: filter === c ? "#fff" : "var(--text)", transition: "all .15s" }}>
            {c === "all" ? t.all || "Todos" : c}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
        {filtered.map((app) => {
          const isInst = installed.includes(app.id);
          return (
            <div key={app.id} className="app-card">
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: app.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: `1.5px solid ${app.color}30`, flexShrink: 0 }}>
                  {app.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>{app.name}</div>
                    {app.isNew && <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", background: "var(--accent)", padding: "2px 7px", borderRadius: 20 }}>NOVO</span>}
                    {app.isAI && <span className="hf-badge" style={{ fontSize: 10, padding: "2px 7px" }}>IA</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3, fontWeight: 500 }}>{app.desc}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{app.cat}</div>
                </div>
              </div>
              <button
                onClick={() => setInstalled((i) => isInst ? i.filter((x) => x !== app.id) : [...i, app.id])}
                style={{ width: "100%", padding: "9px 0", fontSize: 13, borderRadius: 10, border: isInst ? "1.5px solid rgba(16,185,129,.3)" : "none", background: isInst ? "rgba(16,185,129,.1)" : "var(--primary)", color: isInst ? "var(--success)" : "#fff", fontWeight: 600, cursor: "pointer", transition: "all .15s" }}>
                {isInst ? `✓ ${t.installed}` : t.install}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
