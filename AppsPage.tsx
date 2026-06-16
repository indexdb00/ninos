import { useState } from "react";
import { STORE_APPS } from "@/data/plans";

interface Props { t: Record<string, string>; installed: string[]; }

export function AppsPage({ t, installed }: Props) {
  const [creds, setCreds] = useState<Record<string, { key?: string; accountId?: string }>>({});
  const [limits, setLimits] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const apps = STORE_APPS.filter((a) => installed.includes(a.id));

  const saveApp = (id: string) => {
    setSaved((s) => ({ ...s, [id]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [id]: false })), 2200);
  };

  if (!apps.length) return (
    <div style={{ padding: 28, textAlign: "center", paddingTop: 100 }}>
      <div style={{ fontSize: 56, marginBottom: 18 }}>🔌</div>
      <h2 style={{ color: "var(--text)", fontWeight: 800, marginBottom: 10, fontSize: 20 }}>{t.appsTitle}</h2>
      <p style={{ color: "var(--muted)", fontSize: 14 }}>Instale apps na Store para configurar credenciais</p>
    </div>
  );

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontWeight: 800, fontSize: 23, color: "var(--text)", marginBottom: 24 }}>{t.appsTitle}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {apps.map((app) => (
          <div key={app.id} className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: app.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `1.5px solid ${app.color}30` }}>{app.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
                  {app.name}
                  {app.isAI && <span className="hf-badge">IA</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--success)", fontWeight: 700, marginTop: 2 }}>● {t.installed}</div>
              </div>
            </div>

            {app.id === "higgsfield" ? (
              <div>
                <div style={{ padding: 16, background: "linear-gradient(135deg,rgba(99,102,241,.08),rgba(139,92,246,.08))", borderRadius: 12, border: "1px solid rgba(99,102,241,.2)", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--primary)", marginBottom: 8 }}>🎬 Higgsfield AI – Geração de Criativos</div>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>
                    Gere imagens e vídeos publicitários com IA. Use no chat: <code style={{ background: "var(--surface2)", padding: "2px 6px", borderRadius: 5, color: "var(--primary)", fontSize: 12 }}>/gerar criativo [descrição]</code>
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, display: "block", marginBottom: 6 }}>API Key Higgsfield</label>
                    <input className="input" type="password" placeholder="hf-••••••••••••••••"
                      value={creds[app.id]?.key || ""} onChange={(e) => setCreds((c) => ({ ...c, [app.id]: { ...c[app.id], key: e.target.value } }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, display: "block", marginBottom: 6 }}>Workspace ID</label>
                    <input className="input" placeholder="ws_123456"
                      value={creds[app.id]?.accountId || ""} onChange={(e) => setCreds((c) => ({ ...c, [app.id]: { ...c[app.id], accountId: e.target.value } }))} />
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, display: "block", marginBottom: 6 }}>{t.apiKey}</label>
                  <input className="input" type="password" placeholder="••••••••••••••••"
                    value={creds[app.id]?.key || ""} onChange={(e) => setCreds((c) => ({ ...c, [app.id]: { ...c[app.id], key: e.target.value } }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, display: "block", marginBottom: 6 }}>{t.accountId}</label>
                  <input className="input" placeholder="act_123456789"
                    value={creds[app.id]?.accountId || ""} onChange={(e) => setCreds((c) => ({ ...c, [app.id]: { ...c[app.id], accountId: e.target.value } }))} />
                </div>
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, display: "block", marginBottom: 6 }}>
                {t.limitLabel}: <strong style={{ color: "var(--primary)" }}>{(limits[app.id] || 1000).toLocaleString()} req/mês</strong>
              </label>
              <input type="range" min={100} max={10000} step={100}
                value={limits[app.id] || 1000} onChange={(e) => setLimits((l) => ({ ...l, [app.id]: +e.target.value }))}
                style={{ width: "100%", accentColor: "var(--primary)", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                <span>100</span><span>10.000</span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 18, padding: "10px 22px" }} onClick={() => saveApp(app.id)}>
              {saved[app.id] ? "✓ Salvo!" : t.save}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
