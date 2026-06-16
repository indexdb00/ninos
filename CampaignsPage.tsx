import { useState } from "react";
import { Icon } from "@/components/Icon";
import { MOCK_CAMPAIGNS } from "@/data/plans";

interface Props { t: Record<string, string>; }

export function CampaignsPage({ t }: Props) {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);

  const cols = [
    { key: "drafts" as const,   label: t.drafts,   color: "#D97706" },
    { key: "inReview" as const, label: t.inReview, color: "#2563EB" },
    { key: "accepted" as const, label: t.accepted, color: "#059669" },
    { key: "rejected" as const, label: t.rejected, color: "#DC2626" },
  ];

  return (
    <div style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 23, color: "var(--text)" }}>{t.campaigns}</h1>
          <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 3 }}>Gerencie todas as etapas das suas campanhas</p>
        </div>
        <button className="btn btn-primary"><Icon n="plus" s={15} />{t.newCampaign}</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, flex: 1, overflowX: "auto" }}>
        {cols.map((col) => (
          <div key={col.key} style={{ background: "var(--surface2)", borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", minHeight: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: col.color, flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)" }}>{col.label}</span>
              <span style={{ marginLeft: "auto", background: col.color + "22", color: col.color, padding: "2px 9px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>{campaigns[col.key].length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {campaigns[col.key].map((c) => (
                <div key={c.id} className="card fade-up" style={{ padding: 15, cursor: "pointer", transition: "all .18s" }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text)", marginBottom: 10, lineHeight: 1.4 }}>{c.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 500 }}>{c.platform}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "var(--primary)" }}>{c.budget}</span>
                  </div>
                  {"reason" in c && c.reason && (
                    <div style={{ marginTop: 9, fontSize: 11, color: "var(--danger)", background: "rgba(239,68,68,.08)", padding: "5px 9px", borderRadius: 7, fontWeight: 600 }}>{c.reason}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
