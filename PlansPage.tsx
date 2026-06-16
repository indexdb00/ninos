import { useState } from "react";
import { Icon } from "@/components/Icon";
import { PLANS_DATA } from "@/data/plans";

interface Props { t: Record<string, string>; }

type Currency = "usd" | "brl" | "eur";

export function PlansPage({ t }: Props) {
  const [curr, setCurr] = useState<Currency>("brl");
  const cL: Record<Currency, string> = { usd: "$", brl: "R$", eur: "€" };
  const feats: Record<string, string[]> = { starter: t.starterF as unknown as string[], pro: t.proF as unknown as string[], business: t.bizF as unknown as string[] };

  const handleCheckout = async (planKey: string) => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, currency: curr }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { alert("Erro ao processar checkout."); }
  };

  return (
    <div style={{ padding: 32, maxWidth: 940, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="hf-badge" style={{ margin: "0 auto 14px" }}>✨ Powered by Claude AI</div>
        <h1 style={{ fontWeight: 900, fontSize: 30, color: "var(--text)", marginBottom: 10, letterSpacing: -0.5 }}>{t.plansPopTitle}</h1>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>Escolha o plano ideal para o seu volume de campanhas</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 20 }}>
          <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{t.chooseCurr}</span>
          {(["usd", "brl", "eur"] as Currency[]).map((c) => (
            <button key={c} onClick={() => setCurr(c)}
              style={{ padding: "6px 16px", borderRadius: 20, border: "1.5px solid var(--border)", background: curr === c ? "var(--primary)" : "var(--surface2)", color: curr === c ? "#fff" : "var(--text)", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .15s" }}>
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
        {PLANS_DATA.map((p) => (
          <div key={p.key} style={{ background: "var(--surface)", borderRadius: 18, padding: 30, border: p.popular ? "2px solid var(--primary)" : "1px solid var(--border)", position: "relative", boxShadow: p.popular ? "0 10px 50px rgba(99,102,241,.22)" : "var(--shadow)", display: "flex", flexDirection: "column", transition: "transform .18s" }}
            onMouseOver={(e) => { if (!p.popular) (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
            onMouseOut={(e) => { if (!p.popular) (e.currentTarget as HTMLElement).style.transform = "none"; }}>
            {p.popular && (
              <div style={{ position: "absolute", top: -15, left: "50%", transform: "translateX(-50%)", background: "var(--primary)", color: "#fff", padding: "5px 18px", borderRadius: 20, fontSize: 12, fontWeight: 800, boxShadow: "0 4px 14px rgba(99,102,241,.4)" }}>
                {t.popular}
              </div>
            )}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontWeight: 800, fontSize: 19, color: "var(--text)", marginBottom: 3 }}>{t[p.key]}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16, fontWeight: 500 }}>{p.model}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{cL[curr]}</span>
                <span style={{ fontWeight: 900, fontSize: 40, color: "var(--text)", letterSpacing: -1 }}>{p[curr]}</span>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>{t.mo}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>{(p.tokensK * 1000).toLocaleString()} {t.tokMo}</div>
              <div style={{ fontSize: 11.5, color: "var(--success)", marginTop: 5, fontWeight: 700 }}>✓ Margem: {p.margin}%</div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9, marginBottom: 26 }}>
              {(feats[p.key] || []).map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text)" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(16,185,129,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon n="check" s={11} c="var(--success)" />
                  </div>
                  {f.toLowerCase().includes("criativo") || f.toLowerCase().includes("higgsfield") || f.toLowerCase().includes("creative") ? (
                    <span style={{ color: "var(--primary)", fontWeight: 600 }}>{f} <span className="hf-badge" style={{ fontSize: 10, padding: "1px 6px" }}>IA</span></span>
                  ) : f}
                </div>
              ))}
            </div>
            <button className={`btn ${p.popular ? "btn-primary" : "btn-ghost"}`} style={{ width: "100%", padding: 13 }} onClick={() => handleCheckout(p.key)}>
              {t.startFree}
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 34, padding: 22, background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)" }}>
        <h3 style={{ fontWeight: 800, fontSize: 14, color: "var(--text)", marginBottom: 14 }}>📊 Transparência de custos da API</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {PLANS_DATA.map((p) => (
            <div key={p.key}>
              <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 13, marginBottom: 6 }}>{t[p.key]}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", flexDirection: "column", gap: 3 }}>
                <div>Custo API: <strong style={{ color: "var(--text)" }}>~${p.apiCost.toFixed(2)}/mês</strong></div>
                <div>Preço: <strong style={{ color: "var(--text)" }}>${p.usd}/mês</strong></div>
                <div style={{ color: "var(--success)", fontWeight: 700 }}>Margem: {p.margin}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
