# Ninos – Plataforma de Campanhas com IA

## Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Auth & DB**: Supabase
- **Pagamentos**: Stripe
- **IA Chat**: Claude API via Vercel Serverless Functions
- **Criativos IA**: Higgsfield AI
- **Deploy**: Vercel

## Setup

```bash
# 1. Instalar
npm install

# 2. Configurar variáveis
cp .env.example .env
# Preencha as chaves

# 3. Rodar localmente
npm run dev

# 4. Build
npm run build
```

## Deploy Vercel
Conecte o repositório no vercel.com e adicione as variáveis do .env.example no painel.

## Estrutura
```
src/
├── components/
│   ├── App.tsx          # Root com state global
│   ├── Sidebar.tsx
│   ├── modals/          # Login · Terms · News · Plans
│   └── pages/           # Chat · Campaigns · Plans · Store · Apps · Profile · Admin
├── data/plans.ts
├── i18n/                # PT · EN · ES · FR · JA
├── lib/
└── styles/global.css
api/
├── chat.ts              # Proxy Anthropic (serverless)
└── stripe/
    ├── checkout.ts
    └── webhook.ts
supabase/schema.sql
```

## Planos
| Plano    | Modelo            | Tokens | Preço BRL | Margem |
|----------|-------------------|--------|-----------|--------|
| Starter  | Claude Haiku 4.5  | 100K   | R$49      | 97,7%  |
| Pro      | Claude Sonnet 4.6 | 350K   | R$149     | 90,6%  |
| Business | Claude Opus 4.6   | 500K   | R$399     | 75,3%  |
