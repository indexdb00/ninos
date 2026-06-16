export const PLANS_DATA = [
  {
    key: "starter" as const,
    tokensK: 100,
    model: "Claude Haiku 4.5",
    apiCost: 0.21,
    usd: 9, brl: 49, eur: 8,
    margin: 97.7,
    popular: false,
  },
  {
    key: "pro" as const,
    tokensK: 350,
    model: "Claude Sonnet 4.6",
    apiCost: 2.73,
    usd: 29, brl: 149, eur: 27,
    margin: 90.6,
    popular: true,
  },
  {
    key: "business" as const,
    tokensK: 500,
    model: "Claude Opus 4.6",
    apiCost: 19.5,
    usd: 79, brl: 399, eur: 73,
    margin: 75.3,
    popular: false,
  },
] as const;

export type PlanKey = (typeof PLANS_DATA)[number]["key"];

export const STORE_APPS = [
  { id: "meta",       name: "Meta Ads",         icon: "📘", desc: "Facebook & Instagram Ads",          color: "#1877F2", cat: "Social",       isNew: false, isAI: false },
  { id: "google",     name: "Google Ads",        icon: "🔍", desc: "Search, Display & YouTube",         color: "#4285F4", cat: "Search",       isNew: false, isAI: false },
  { id: "tiktok",     name: "TikTok Ads",        icon: "🎵", desc: "Short-form video ads",              color: "#010101", cat: "Social",       isNew: false, isAI: false },
  { id: "linkedin",   name: "LinkedIn Ads",      icon: "💼", desc: "B2B professional network",          color: "#0A66C2", cat: "Social",       isNew: false, isAI: false },
  { id: "pinterest",  name: "Pinterest Ads",     icon: "📌", desc: "Visual discovery ads",              color: "#E60023", cat: "Social",       isNew: false, isAI: false },
  { id: "bidmachine", name: "BidMachine",        icon: "📊", desc: "Programmatic advertising",          color: "#FF6B2B", cat: "Programmatic", isNew: false, isAI: false },
  { id: "x",          name: "X Ads",             icon: "✖️", desc: "Twitter/X advertising",             color: "#1DA1F2", cat: "Social",       isNew: false, isAI: false },
  { id: "higgsfield", name: "Higgsfield AI",     icon: "🎬", desc: "Criativos de vídeo e imagem com IA", color: "#6366F1", cat: "IA Criativos", isNew: true, isAI: true },
  { id: "openai",     name: "OpenAI DALL·E",     icon: "🤖", desc: "Geração de imagens para anúncios",  color: "#10A37F", cat: "IA Criativos", isNew: false, isAI: true },
  { id: "canva",      name: "Canva Connect",     icon: "🎨", desc: "Design de criativos integrado",     color: "#00C4CC", cat: "Design",       isNew: false, isAI: false },
] as const;

export type AppId = (typeof STORE_APPS)[number]["id"];

export const ADMIN_MRR = [8200, 9100, 9800, 10400, 11100, 12450];

export const MOCK_CAMPAIGNS = {
  drafts: [
    { id: 1, title: "Campanha Natal 2026",  platform: "Meta Ads",   budget: "R$ 5.000", status: "draft"    as const },
    { id: 2, title: "Black Friday TikTok", platform: "TikTok Ads", budget: "R$ 3.200", status: "draft"    as const },
  ],
  inReview: [
    { id: 3, title: "App iOS – Google UAC", platform: "Google Ads", budget: "R$ 8.000", status: "review"   as const },
  ],
  accepted: [
    { id: 4, title: "Brand Awareness Q2",  platform: "Instagram",  budget: "R$ 12.000", status: "accepted" as const },
    { id: 5, title: "Remarketing ROAS 4x", platform: "Meta Ads",   budget: "R$ 6.500",  status: "accepted" as const },
  ],
  rejected: [
    { id: 6, title: "Desconto 80% – X",    platform: "Meta Ads",   budget: "R$ 1.000",  status: "rejected" as const, reason: "Violação de política" },
  ],
};

export const MOCK_CHAT_HISTORY = [
  { group: "today",     items: ["Campanha Black Friday Meta Ads", "Análise algoritmo Instagram 2026"] },
  { group: "yesterday", items: ["Copy TikTok - Produto Digital",  "Orçamento Google Ads Q3"] },
  { group: "last7",     items: ["Campanha LinkedIn B2B",          "Remarketing E-commerce", "ROAS Meta Ads 4x"] },
];

export const NEWS_ITEMS = [
  { icon: "🎬", title: { pt: "Higgsfield IA na Store – gere criativos de vídeo!", en: "Higgsfield AI in Store – generate video creatives!", es: "¡Higgsfield IA en la Tienda!", fr: "Higgsfield IA dans le Store!", ja: "HiggsfieldsAIがストアに登場！" } },
  { icon: "🚀", title: { pt: "Claude Opus 4.6 disponível no plano Business",     en: "Claude Opus 4.6 available on Business plan",          es: "Claude Opus 4.6 en Business", fr: "Claude Opus 4.6 sur Business", ja: "Claude Opus 4.6 が Business で利用可能" } },
  { icon: "🐛", title: { pt: "Corrigido: histórico de chat em mobile",            en: "Fixed: chat history on mobile",                        es: "Corregido: historial en móvil", fr: "Corrigé: historique sur mobile", ja: "修正：モバイルでのチャット履歴" } },
  { icon: "📅", title: { pt: "Webinar: Campanhas com IA — 20 Jul 2026",          en: "Webinar: AI Campaigns — Jul 20 2026",                  es: "Webinar: Campañas IA — 20 Jul", fr: "Webinaire: Campagnes IA — 20 Jul", ja: "ウェビナー：AIキャンペーン — 7月20日" } },
];
