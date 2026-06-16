import { useState } from "react";
import { translations } from "@/i18n";
import type { Lang } from "@/i18n";
import { Sidebar } from "@/components/Sidebar";
import { LoginModal }  from "@/components/modals/LoginModal";
import { TermsModal }  from "@/components/modals/TermsModal";
import { NewsModal }   from "@/components/modals/NewsModal";
import { PlansPopup }  from "@/components/modals/PlansPopup";
import { ChatPage }        from "@/components/pages/ChatPage";
import { CampaignsPage }   from "@/components/pages/CampaignsPage";
import { PlansPage }       from "@/components/pages/PlansPage";
import { StorePage }       from "@/components/pages/StorePage";
import { AppsPage }        from "@/components/pages/AppsPage";
import { ProfilePage }     from "@/components/pages/ProfilePage";
import { AdminPage }       from "@/components/pages/AdminPage";

type Modal = "login" | "terms" | "news" | "plans" | null;
type Page  = "chat" | "campaigns" | "plans" | "store" | "installedApps" | "profile" | "admin";
type User  = { name: string; email: string; plan: string };

export default function App() {
  const [dark,      setDark]      = useState(true);
  const [lang,      setLang]      = useState<Lang>("pt");
  const [modal,     setModal]     = useState<Modal>("login");
  const [user,      setUser]      = useState<User | null>(null);
  const [page,      setPage]      = useState<Page>("chat");
  const [installed, setInstalled] = useState<string[]>(["meta", "tiktok", "higgsfield"]);

  const t = (translations[lang] || translations.pt) as Record<string, string>;

  const pages: Record<Page, React.ReactNode> = {
    chat:          <ChatPage t={t} userPlan={user?.plan} />,
    campaigns:     <CampaignsPage t={t} />,
    plans:         <PlansPage t={t} />,
    store:         <StorePage t={t} installed={installed} setInstalled={setInstalled} />,
    installedApps: <AppsPage t={t} installed={installed} />,
    profile:       <ProfilePage t={t} user={user} lang={lang} setLang={setLang} />,
    admin:         <AdminPage t={t} />,
  };

  return (
    <div className={dark ? "dark" : ""} style={{ height: "100vh", display: "flex", background: "var(--bg)", color: "var(--text)", overflow: "hidden" }}>

      {/* Modals – sequential flow */}
      {modal === "login" && (
        <LoginModal t={t} dark={dark} onLogin={(u) => { setUser(u); setModal("terms"); }} />
      )}
      {modal === "terms" && (
        <TermsModal t={t} onAccept={() => setModal("news")} />
      )}
      {modal === "news" && (
        <NewsModal t={t} lang={lang} onClose={() => setModal("plans")} />
      )}
      {modal === "plans" && (
        <PlansPopup t={t} onClose={() => setModal(null)} onGoPlans={() => { setPage("plans"); }} />
      )}

      {/* Main App Shell */}
      {!modal && (
        <>
          <Sidebar
            t={t} page={page} setPage={(p) => setPage(p as Page)}
            dark={dark} setDark={setDark}
            lang={lang} setLang={(l) => setLang(l as Lang)}
            user={user}
          />
          <main style={{ flex: 1, height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {pages[page]}
          </main>
        </>
      )}
    </div>
  );
}
