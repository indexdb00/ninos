-- ═══════════════════════════════════════════════════════════
--  NINOS – Supabase Schema
--  Run this in your Supabase SQL editor
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── USERS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           TEXT UNIQUE NOT NULL,
  name            TEXT,
  company         TEXT,
  birthdate       DATE,
  plan            TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'business')),
  plan_expires_at TIMESTAMPTZ,
  tokens_used     INTEGER NOT NULL DEFAULT 0,
  language        TEXT NOT NULL DEFAULT 'pt',
  avatar_url      TEXT,
  is_admin        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── CONVERSATIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.conversations (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL DEFAULT 'Nova Conversa',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── MESSAGES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  role            TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content         TEXT NOT NULL,
  tokens_used     INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── CAMPAIGNS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.campaigns (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  platform         TEXT NOT NULL,
  budget           TEXT,
  status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'accepted', 'rejected')),
  rejection_reason TEXT,
  flagged          BOOLEAN NOT NULL DEFAULT FALSE,
  content          TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── INSTALLED APPS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.installed_apps (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  app_id         TEXT NOT NULL,
  api_key        TEXT,
  account_id     TEXT,
  monthly_limit  INTEGER NOT NULL DEFAULT 1000,
  requests_used  INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, app_id)
);

-- ── SUBSCRIPTIONS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plan                   TEXT NOT NULL,
  status                 TEXT NOT NULL DEFAULT 'active',
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  current_period_end     TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── ROW LEVEL SECURITY ─────────────────────────────────────────
ALTER TABLE public.users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installed_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions  ENABLE ROW LEVEL SECURITY;

-- Users: read/update own row
CREATE POLICY "users_self" ON public.users
  FOR ALL USING (auth.uid() = id);

-- Conversations: own only
CREATE POLICY "conv_own" ON public.conversations
  FOR ALL USING (auth.uid() = user_id);

-- Messages: through conversation ownership
CREATE POLICY "msg_own" ON public.messages
  FOR ALL USING (
    conversation_id IN (SELECT id FROM public.conversations WHERE user_id = auth.uid())
  );

-- Campaigns: own only
CREATE POLICY "camp_own" ON public.campaigns
  FOR ALL USING (auth.uid() = user_id);

-- Installed apps: own only
CREATE POLICY "apps_own" ON public.installed_apps
  FOR ALL USING (auth.uid() = user_id);

-- Subscriptions: own only
CREATE POLICY "subs_own" ON public.subscriptions
  FOR ALL USING (auth.uid() = user_id);

-- ── INDEXES ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_conversations_user  ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conv       ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_user      ON public.campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status    ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_installed_user      ON public.installed_apps(user_id);
CREATE INDEX IF NOT EXISTS idx_subs_user           ON public.subscriptions(user_id);

-- ── FUNCTION: auto-update updated_at ───────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_users_updated_at          BEFORE UPDATE ON public.users          FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_conversations_updated_at  BEFORE UPDATE ON public.conversations  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_campaigns_updated_at      BEFORE UPDATE ON public.campaigns      FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ── FUNCTION: auto-create user profile on signup ───────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
