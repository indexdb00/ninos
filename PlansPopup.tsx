import { PLANS_DATA } from "@/data/plans";

interface Props { t: Record<string, string>; onClose: () => void; onGoPlans: () => void; }

export function PlansPopup({ t, onClose, onGoPlans }: Props) {
  return (
    <div className="overlay fade-in">
      <div className="modal" style={{ padding: 34, maxWidth: 440 }}>
        <h2 style={{ fontWeight: 800, fontSize: 20, color: "var(--text)", textAlign: "center", marginBottom: 6 }}>{t.plansPopTitle}</h2>
        <p style={{ color: "var(--muted)", fontSize: 13, textAlign: "center", marginBottom: 24 }}>Desbloqueie o potencial completo do Ninos</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
          {PLANS_DATA.map((p) => (
            <div key={p.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 18px", borderRadius: 12, background: p.popular ? "var(--primary)" : "var(--surface2)", border: p.popular ? "none" : "1px solid var(--border)", boxShadow: p.popular ? "0 4px 20px rgba(99,102,241,.35)" : "none" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: p.popular ? "#fff" : "var(--text)" }}>{t[p.key]}</div>
                <div style={{ fontSize: 12, color: p.popular ? "rgba(255,255,255,.65)" : "var(--muted)", marginTop: 2 }}>{p.model}</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: 22, color: p.popular ? "#fff" : "var(--primary)" }}>
                R${p.brl}<span style={{ fontSize: 13, fontWeight: 500, opacity: 0.8 }}>/mês</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" style={{ flex: 1, padding: 13 }} onClick={onClose}>{t.later}</button>
          <button className="btn btn-primary" style={{ flex: 1, padding: 13 }} onClick={() => { onClose(); onGoPlans(); }}>{t.startFree}</button>
        </div>
      </div>
    </div>
  );
}
