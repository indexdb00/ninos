import { useState } from "react";
import { Icon } from "@/components/Icon";
import { MOCK_CHAT_HISTORY } from "@/data/plans";

interface Props {
  t: Record<string, string>;
  page: string;
  setPage: (p: string) => void;
  dark: boolean;
  setDark: (d: boolean) => void;
  lang: string;
  setLang: (l: string) => void;
  user: { name: string; email: string; plan: string } | null;
}

const FLAGS: Record<string, string> = { pt: "🇧🇷", en: "🇺🇸", es: "🇪🇸", fr: "🇫🇷", ja: "🇯🇵" };
const LANGS = ["pt", "en", "es", "fr", "ja"];

export function Sidebar({ t, page, setPage, dark, setDark, lang, setLang, user }: Props) {
  const [showLang, setShowLang] = useState(false);

  const nav = [
    { key: "chat",         icon: "chat"     },
    { key: "campaigns",    icon: "campaign" },
    { key: "plans",        icon: "plans"    },
    { key: "store",        icon: "store"    },
    { key: "installedApps",icon: "apps"     },
    { key: "profile",      icon: "profile"  },
  ];

  return (
    <div style={{ width: 248, flexShrink: 0, height: "100%", background: "var(--sidebar)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", overflowY: "auto" }}>

      {/* Logo + New Chat */}
      <div style={{ padding: "22px 16px 14px", borderBottom: "1px solid var(--border)" }}>
        <div className="logo-g" style={{ fontSize: 24, fontWeight: 900, letterSpacing: -1.5, marginBottom: 14 }}>Ninos</div>
        <button onClick={() => setPage("chat")} className="btn btn-primary" style={{ width: "100%", padding: "10px 14px", fontSize: 13 }}>
          <Icon n="plus" s={14} />{t.newChat}
        </button>
      </div>

      {/* Chat History */}
      <div style={{ padding: "14px 8px", flex: 1, overflowY: "auto" }}>
        {MOCK_CHAT_HISTORY.map((g) => (
          <div key={g.group} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: "var(--muted)", padding: "0 10px", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.8 }}>
              {t[g.group]}
            </div>
            {g.items.map((item, i) => (
              <div key={i} className="chat-item" onClick={() => setPage("chat")} style={{ color: "var(--muted)", padding: "7px 10px", borderRadius: 8, fontSize: 13, cursor: "pointer", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", transition: "all .12s" }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Nav */}
      <div style={{ padding: "8px 8px 4px", borderTop: "1px solid var(--border)" }}>
        {nav.map(({ key, icon }) => (
          <button key={key} onClick={() => setPage(key)} className={`nav-link${page === key ? " active" : ""}`}>
            <Icon n={icon} s={16} />{t[key]}
            {key === "store" && (
              <span style={{ marginLeft: "auto", background: "var(--accent)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "1px 7px", borderRadius: 20 }}>+3</span>
            )}
          </button>
        ))}
        <button onClick={() => setPage("admin")} className={`nav-link${page === "admin" ? " active" : ""}`} style={{ marginTop: 2 }}>
          <Icon n="admin" s={16} />{t.admin}
        </button>
      </div>

      {/* Bottom Controls */}
      <div style={{ padding: "8px 8px 14px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 2 }}>
        <button onClick={() => setDark(!dark)} className="nav-link">
          <Icon n={dark ? "sun" : "moon"} s={15} />{dark ? t.lightMode : t.darkMode}
        </button>

        <div style={{ position: "relative" }}>
          <button onClick={() => setShowLang((l) => !l)} className="nav-link">
            <Icon n="globe" s={15} />{FLAGS[lang]} {lang.toUpperCase()}
          </button>
          {showLang && (
            <div style={{ position: "absolute", bottom: "110%", left: 0, right: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow-lg)", zIndex: 50 }}>
              {LANGS.map((l) => (
                <button key={l} onClick={() => { setLang(l); setShowLang(false); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", width: "100%", border: "none", background: l === lang ? "var(--primary)" : "none", color: l === lang ? "#fff" : "var(--text)", fontSize: 13, cursor: "pointer", fontWeight: 600, transition: "background .1s" }}>
                  {FLAGS[l]} {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        {user && (
          <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--surface2)", margin: "4px 0", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff", flexShrink: 0 }}>
              {user.name[0]?.toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
              <div style={{ fontSize: 10, color: "var(--primary)", fontWeight: 700 }}>{user.plan?.toUpperCase()}</div>
            </div>
          </div>
        )}

        <button className="nav-link" style={{ color: "var(--danger)" }}>
          <Icon n="logout" s={15} />{t.logout}
        </button>
      </div>
    </div>
  );
}
