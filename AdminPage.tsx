import { useState } from "react";
import { Icon } from "@/components/Icon";
import { PLANS_DATA, ADMIN_MRR } from "@/data/plans";

interface Props { t: Record<string, string>; }

const MOD_CAMPS = [
  { title: "Black Friday Mega Desconto 90%", user: "joao@email.com", platform: "Meta Ads",   flag: "danger" },
  { title: "Campanha Institucional Q3",      user: "maria@co.com",   platform: "Google Ads", flag: "ok"     },
  { title: "Promoção Produto Milagroso",     user: "pedro@mail.com", platform: "TikTok Ads", flag: "warn"   },
  { title: "Brand Awareness Verão 2026",     user: "ana@co.com",     platform: "Instagram",  flag: "ok"     },
  { title: "Criativos IA Higgsfield Launch", user: "sofia@start.com",platform: "Google UAC", flag: "ok"     },
];

export function AdminPage({ t }: Props) {
  const [tab, setTab] = useState("dash");
  const kpis = [
    { label: t.mrr,         value: "$12.450", change: "+18%",  up: true  },
    { label: t.activeUsers, value: "342",     change: "+24",   up: true  },
    { label: t.churn,       value: "2,3%",    change: "-0.4%", up: false },
    { label: t.totalCamp,   value: "1.847",   change: "+127",  up: true  },
  ];
  const tabs = [["dash", "📊 Dashboard"], ["mod", "📢 Moderação"], ["plans", "💳 Planos"]];

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontWeight: 800, fontSize: 23, color: "var(--text)", marginBottom: 20 }}>{t.adminTitle}</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "var(--surface2)", padding: 4, borderRadius: 12, width: "fit-content" }}>
        {tabs.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            style={{ padding: "8px 20px", borderRadius: 10, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", background: tab === k ? "var(--surface)" : "none", color: tab === k ? "var(--text)" : "var(--muted)", boxShadow: tab === k ? "var(--shadow)" : "none", transition: "all .18s" }}>
            {l}
          </button>
        ))}
      </div>

      {tab === "dash" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {kpis.map((k, i) => (
              <div key={i} className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{k.label}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "var(--text)", letterSpacing: -1 }}>{k.value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6, color: k.up ? "var(--success)" : "var(--danger)" }}>{k.change} vs mês anterior</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 800, fontSize: 15, color: "var(--text)", marginBottom: 20 }}>📈 MRR – Últimos 6 meses</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
              {ADMIN_MRR.map((v, i) => {
                const max = Math.max(...ADMIN_MRR);
                const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 700 }}>${(v / 1000).toFixed(1)}k</div>
                    <div style={{ width: "100%", background: "linear-gradient(to top,var(--primary),#8B5CF6)", borderRadius: "6px 6px 0 0", height: `${(v / max) * 90}px`, opacity: 0.6 + 0.4 * (i / 5), boxShadow: "0 -2px 10px rgba(99,102,241,.3)" }} />
                    <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 600 }}>{months[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontWeight: 800, fontSize: 14, color: "var(--text)", marginBottom: 14 }}>Apps Mais Usados</h3>
              {[["Meta Ads", "#1877F2", 78], ["Google Ads", "#4285F4", 61], ["TikTok Ads", "#010101", 44], ["Higgsfield AI", "#6366F1", 32]].map(([n, c, p]) => (
                <div key={String(n)} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 5 }}>
                    <span>{n}</span><span style={{ color: "var(--muted)" }}>{p}%</span>
                  </div>
                  <div style={{ height: 5, background: "var(--surface2)", borderRadius: 3 }}>
                    <div style={{ height: "100%", background: String(c), borderRadius: 3, width: `${p}%`, opacity: 0.8 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontWeight: 800, fontSize: 14, color: "var(--text)", marginBottom: 14 }}>Distribuição de Planos</h3>
              {PLANS_DATA.map((p, i) => {
                const users = [89, 167, 86];
                return (
                  <div key={p.key} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 5 }}>
                      <span>{t[p.key]}</span><span style={{ color: "var(--muted)" }}>{users[i]} users</span>
                    </div>
                    <div style={{ height: 5, background: "var(--surface2)", borderRadius: 3 }}>
                      <div style={{ height: "100%", background: "var(--primary)", borderRadius: 3, width: `${(users[i] / 342) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {tab === "mod" && (
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 20 }}>{t.campaignsMod}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOD_CAMPS.map((c, i) => (
              <div key={i} style={{ padding: "14px 16px", background: "var(--surface2)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, border: "1px solid var(--border)" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginBottom: 3 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.user} · {c.platform}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  {c.flag === "danger" && <span style={{ fontSize: 12, color: "var(--danger)", fontWeight: 800, background: "rgba(239,68,68,.1)", padding: "3px 10px", borderRadius: 20 }}>🚩 Suspeita</span>}
                  {c.flag === "warn"   && <span style={{ fontSize: 12, color: "var(--warn)",   fontWeight: 800, background: "rgba(245,158,11,.1)", padding: "3px 10px", borderRadius: 20 }}>⚠️ Revisar</span>}
                  {c.flag === "ok"     && <span style={{ fontSize: 12, color: "var(--success)",fontWeight: 800, background: "rgba(16,185,129,.1)", padding: "3px 10px", borderRadius: 20 }}>✓ OK</span>}
                  <button className="btn btn-ghost" style={{ padding: "5px 12px", fontSize: 12 }}>{t.clearBtn}</button>
                  <button className="btn btn-danger" style={{ padding: "5px 12px", fontSize: 12 }}>{t.flagBtn}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "plans" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PLANS_DATA.map((p, idx) => {
            const users = [89, 167, 86]; const pct = ["62%", "78%", "91%"];
            return (
              <div key={p.key} className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>{t[p.key]}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{p.model} · ${p.usd}/mês</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "var(--primary)" }}>{users[idx]}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>usuários ativos</div>
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 600 }}>
                    <span>{t.tokenUsage}</span>
                    <span style={{ color: "var(--primary)", fontWeight: 800 }}>{pct[idx]}</span>
                  </div>
                  <div style={{ height: 8, background: "var(--surface2)", borderRadius: 4 }}>
                    <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,var(--primary),#8B5CF6)", width: pct[idx], boxShadow: "0 0 8px rgba(99,102,241,.4)" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
