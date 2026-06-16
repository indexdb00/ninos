import { useState, useRef } from "react";

interface Props {
  t: Record<string, string>;
  dark: boolean;
  onLogin: (user: { name: string; email: string; plan: string }) => void;
}

export function LoginModal({ t, dark, onLogin }: Props) {
  const [mode, setMode] = useState<"signin" | "signup" | "verify">("signin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const handleOAuth = (p: string) => onLogin({ name: "User", email: `user@${p}.com`, plan: "starter" });

  const handleEmail = async () => {
    if (!email || !pass) return;
    setLoading(true);
    await sleep(900);
    if (mode === "signup") { setMode("verify"); setLoading(false); return; }
    setLoading(false);
    onLogin({ name: "Rapha", email, plan: "pro" });
  };

  const handleVerify = async () => {
    if (code.join("").length < 6) return;
    setLoading(true);
    await sleep(700);
    setLoading(false);
    onLogin({ name: "Rapha", email, plan: "pro" });
  };

  const onCodeChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const nc = [...code]; nc[i] = v; setCode(nc);
    if (v && i < 5) codeRefs.current[i + 1]?.focus();
  };

  const Dots = () => (
    <span style={{ display: "flex", gap: 5, justifyContent: "center" }}>
      <span className="dot" /><span className="dot" /><span className="dot" />
    </span>
  );

  return (
    <div className="overlay fade-in">
      <div className="modal" style={{ padding: 36 }}>
        {mode === "verify" ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--surface2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 14px" }}>📧</div>
              <h2 style={{ fontWeight: 800, fontSize: 20, color: "var(--text)", marginBottom: 6 }}>{t.verifyTitle}</h2>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>{t.verifyDesc} <strong style={{ color: "var(--text)" }}>{email}</strong></p>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
              {code.map((v, i) => (
                <input key={i} ref={(el) => { codeRefs.current[i] = el; }} value={v} maxLength={1}
                  onChange={(e) => onCodeChange(i, e.target.value)}
                  onKeyDown={(e) => e.key === "Backspace" && !v && i > 0 && codeRefs.current[i - 1]?.focus()}
                  style={{ width: 46, height: 56, textAlign: "center", fontSize: 22, fontWeight: 800, background: "var(--surface2)", border: "2px solid var(--border)", borderRadius: 12, color: "var(--text)", outline: "none" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                />
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: "100%", padding: 14 }} onClick={handleVerify} disabled={loading}>
              {loading ? <Dots /> : t.verify}
            </button>
            <p style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--muted)" }}>
              <span style={{ color: "var(--primary)", cursor: "pointer", fontWeight: 600 }}>{t.resend}</span>
            </p>
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div className="logo-g" style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1.5, marginBottom: 8 }}>Ninos</div>
              <h2 style={{ fontWeight: 800, fontSize: 20, color: "var(--text)", marginBottom: 4 }}>{t.loginTitle}</h2>
              <p style={{ color: "var(--muted)", fontSize: 13 }}>{t.loginSub}</p>
            </div>
            {([
              [t.withGoogle, "🔵", "google"],
              [t.withGithub, "⬛", "github"],
              [t.withApple, "🍎", "apple"],
            ] as [string, string, string][]).map(([label, icon, p]) => (
              <button key={p} onClick={() => handleOAuth(p)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", padding: 12, borderRadius: 10, marginBottom: 10, background: dark ? "var(--surface2)" : "#F5F5FF", border: "1.5px solid var(--border)", color: "var(--text)", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all .15s" }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                <span style={{ fontSize: 18 }}>{icon}</span>{label}
              </button>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{t.orEmail}</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
            <input className="input" type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 10 }} />
            <input className="input" type="password" placeholder={t.password} value={pass} onChange={(e) => setPass(e.target.value)} style={{ marginBottom: 16 }} />
            <button className="btn btn-primary" style={{ width: "100%", padding: 14 }} onClick={handleEmail} disabled={loading}>
              {loading ? <Dots /> : mode === "signin" ? t.signIn : t.signUp}
            </button>
            <p style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--muted)" }}>
              {mode === "signin" ? t.noAcc : t.hasAcc}{" "}
              <span onClick={() => setMode(mode === "signin" ? "signup" : "signin")} style={{ color: "var(--primary)", cursor: "pointer", fontWeight: 700 }}>
                {mode === "signin" ? t.signUp : t.signIn}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
