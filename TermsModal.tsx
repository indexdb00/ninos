import { useState } from "react";
import { renderMarkdown } from "@/lib/markdown";

interface Props { t: Record<string, string>; onAccept: () => void; }

export function TermsModal({ t, onAccept }: Props) {
  const [ok, setOk] = useState(false);
  return (
    <div className="overlay fade-in">
      <div className="modal" style={{ padding: 0 }}>
        <div style={{ padding: "24px 28px 18px", borderBottom: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 24 }}>⚖️</span>
          <h2 style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>{t.termsTitle}</h2>
        </div>
        <div onScroll={(e) => { const el = e.currentTarget; if (el.scrollHeight - el.scrollTop <= el.clientHeight + 30) setOk(true); }}
          style={{ padding: "20px 28px", maxHeight: 340, overflowY: "auto", fontSize: 13.5, lineHeight: 1.75, color: "var(--muted)" }}>
          <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(t.termsBody || "") }} />
        </div>
        <div style={{ padding: "18px 28px 26px", borderTop: "1px solid var(--border)" }}>
          {!ok && <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, textAlign: "center" }}>↓ Role até o final para aceitar</p>}
          <button className="btn btn-primary" style={{ width: "100%", padding: 14, opacity: ok ? 1 : 0.45, transition: "opacity .3s" }} onClick={() => ok && onAccept()}>
            {t.termsAccept}
          </button>
        </div>
      </div>
    </div>
  );
}
