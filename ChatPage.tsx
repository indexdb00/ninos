import { useState, useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";
import { renderMarkdown } from "@/lib/markdown";

interface Props { t: Record<string, string>; userPlan?: string; }

const SYSTEM = `You are Ninos AI, an expert digital advertising strategist. Help users create and optimize campaigns for Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, Pinterest, BidMachine, X Ads, and generate ad creatives with Higgsfield AI. Provide strategic insights, compelling ad copies, budget recommendations, and algorithm analysis. Format responses with clear headers, bullet points, and actionable steps. Respond in the same language the user writes in.`;

export function ChatPage({ t, userPlan = "pro" }: Props) {
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const [si, setSi] = useState(0);
  const [sv, setSv] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const sugg: string[] = Array.isArray(t.sugg) ? t.sugg as unknown as string[] : [];

  useEffect(() => {
    const id = setInterval(() => {
      setSv(false);
      setTimeout(() => { setSi((i) => (i + 1) % (sugg.length || 1)); setSv(true); }, 450);
    }, 3600);
    return () => clearInterval(id);
  }, [sugg.length]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    if (!inp.trim() || loading) return;
    const um = { role: "user" as const, content: inp.trim() };
    setMsgs((m) => [...m, um]);
    setInp("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM,
          plan: userPlan,
          messages: [...msgs.slice(-10), um],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b: { text?: string }) => b.text || "").join("") || "Erro ao processar.";
      setMsgs((m) => [...m, { role: "assistant", content: text }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "⚠️ Erro de conexão. Tente novamente." }]);
    }
    setLoading(false);
  };

  const clickSugg = (s: string) => { setInp(s); taRef.current?.focus(); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg)" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 0" }}>
        {msgs.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 28, padding: "24px 20px" }}>
            <div style={{ textAlign: "center" }}>
              <div className="logo-g" style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2.5, lineHeight: 1, marginBottom: 10 }}>Ninos</div>
              <p style={{ color: "var(--muted)", fontSize: 16, fontWeight: 500 }}>Como posso ajudar com suas campanhas hoje?</p>
            </div>
            {sugg.length > 0 && (
              <div style={{ padding: "18px 28px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border)", maxWidth: 460, textAlign: "center", opacity: sv ? 1 : 0, transition: "opacity .38s", cursor: "pointer", boxShadow: "var(--shadow)" }}
                onClick={() => clickSugg(sugg[si])}>
                <p style={{ color: "var(--muted)", fontSize: 12, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>💡 Experimente</p>
                <p style={{ color: "var(--text)", fontWeight: 600, fontSize: 15, lineHeight: 1.5 }}>{sugg[si]}</p>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 520, width: "100%" }}>
              {sugg.slice(0, 4).map((s, i) => (
                <button key={i} onClick={() => clickSugg(s)}
                  style={{ padding: "13px 15px", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 12, color: "var(--text)", fontSize: 13, cursor: "pointer", textAlign: "left", lineHeight: 1.45, fontWeight: 500, transition: "all .18s", boxShadow: "var(--shadow)" }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>
            {msgs.map((m, i) => (
              <div key={i} className="fade-up" style={{ marginBottom: 30 }}>
                {m.role === "user" ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ maxWidth: "76%", padding: "13px 17px", background: "var(--surface2)", borderRadius: "18px 18px 5px 18px", color: "var(--text)", fontSize: 14, lineHeight: 1.7, border: "1px solid var(--border)", fontWeight: 500 }}>
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff", marginTop: 2, boxShadow: "0 2px 8px rgba(99,102,241,.4)" }}>N</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 7, fontWeight: 700, letterSpacing: 0.3 }}>NINOS IA</div>
                      <div className="prose" style={{ fontSize: 14 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="fade-in" style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 30 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff", boxShadow: "0 2px 8px rgba(99,102,241,.4)" }}>N</div>
                <div style={{ paddingTop: 10 }}><div style={{ display: "flex", gap: 5 }}><span className="dot" /><span className="dot" /><span className="dot" /></div></div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div style={{ padding: "12px 24px 22px", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "12px 12px 12px 18px", boxShadow: "var(--shadow-md)", transition: "border .15s" }}
            onFocusCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; }}
            onBlurCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            <textarea ref={taRef} value={inp} onChange={(e) => setInp(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder={t.inputPh} rows={1}
              style={{ flex: 1, background: "none", border: "none", resize: "none", outline: "none", color: "var(--text)", fontSize: 14, lineHeight: 1.65, maxHeight: 180, overflowY: "auto" }} />
            <button onClick={send} disabled={!inp.trim() || loading}
              style={{ width: 40, height: 40, borderRadius: 11, border: "none", flexShrink: 0, background: inp.trim() && !loading ? "var(--primary)" : "var(--surface2)", color: inp.trim() && !loading ? "#fff" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s", boxShadow: inp.trim() && !loading ? "0 2px 10px rgba(99,102,241,.4)" : "none" }}>
              <Icon n="send" s={16} />
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", marginTop: 8 }}>Ninos pode cometer erros. Verifique informações importantes.</p>
        </div>
      </div>
    </div>
  );
}
