import { Icon } from "@/components/Icon";
import { NEWS_ITEMS } from "@/data/plans";

interface Props { t: Record<string, string>; lang: string; onClose: () => void; }

export function NewsModal({ t, lang, onClose }: Props) {
  return (
    <div className="overlay fade-in">
      <div className="modal" style={{ padding: 32, maxWidth: 440 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ fontWeight: 800, fontSize: 19, color: "var(--text)" }}>{t.newsTitle}</h2>
          <button className="btn btn-ghost" style={{ padding: "6px 10px" }} onClick={onClose}><Icon n="x" s={16} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
          {NEWS_ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: "var(--surface2)", borderRadius: 12, border: "1px solid var(--border)" }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13.5, color: "var(--text)", fontWeight: 500, lineHeight: 1.5 }}>
                {(item.title as Record<string, string>)[lang] || item.title.en}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" style={{ flex: 1, padding: 13 }} onClick={onClose}>{t.newsClose}</button>
          <button className="btn btn-primary" style={{ flex: 1, padding: 13 }} onClick={onClose}>{t.seePlans}</button>
        </div>
      </div>
    </div>
  );
}
