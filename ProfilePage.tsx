import { useState } from "react";

interface Props {
  t: Record<string, string>;
  user: { name: string; email: string; plan: string } | null;
  lang: string;
  setLang: (l: string) => void;
}

export function ProfilePage({ t, user, lang, setLang }: Props) {
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", company: "", birthdate: "", pass: "" });
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const flags: Record<string, string> = { pt: "🇧🇷 PT", en: "🇺🇸 EN", es: "🇪🇸 ES", fr: "🇫🇷 FR", ja: "🇯🇵 JA" };

  return (
    <div style={{ padding: 28, maxWidth: 560 }}>
      <h1 style={{ fontWeight: 800, fontSize: 23, color: "var(--text)", marginBottom: 28 }}>{t.profileTitle}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28, padding: 20, background: "var(--surface2)", borderRadius: 16, border: "1px solid var(--border)" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,.4)" }}>
          {(form.name || "U")[0].toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>{form.name || "Seu nome"}</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{form.email}</div>
          <div style={{ fontSize: 12, color: "var(--primary)", fontWeight: 700, marginTop: 4, background: "rgba(99,102,241,.1)", padding: "2px 10px", borderRadius: 20, display: "inline-block" }}>
            {user?.plan?.toUpperCase() || "STARTER"}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {([
          { label: t.fullName,  key: "name",      type: "text",     ph: "Seu nome completo" },
          { label: t.email,     key: "email",     type: "email",    ph: "email@exemplo.com" },
          { label: t.company,   key: "company",   type: "text",     ph: "Minha Empresa Ltda" },
          { label: t.birthdate, key: "birthdate", type: "date",     ph: "" },
          { label: "Senha",     key: "pass",      type: "password", ph: "••••••••" },
        ] as { label: string; key: keyof typeof form; type: string; ph: string }[]).map((f) => (
          <div key={f.key}>
            <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, display: "block", marginBottom: 7 }}>{f.label}</label>
            <input className="input" type={f.type} value={form[f.key]} placeholder={f.ph}
              onChange={(e) => setForm((fm) => ({ ...fm, [f.key]: e.target.value }))} />
          </div>
        ))}
        <div>
          <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, display: "block", marginBottom: 9 }}>{t.language}</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(flags).map(([k, v]) => (
              <button key={k} onClick={() => setLang(k)}
                style={{ padding: "7px 16px", borderRadius: 22, border: "1.5px solid var(--border)", fontSize: 13, cursor: "pointer", background: lang === k ? "var(--primary)" : "var(--surface2)", color: lang === k ? "#fff" : "var(--text)", fontWeight: 700, transition: "all .15s" }}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" style={{ padding: 14, marginTop: 6 }} onClick={save}>
          {saved ? "✓ Salvo com sucesso!" : t.saveProfile}
        </button>
      </div>
    </div>
  );
}
