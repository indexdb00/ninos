import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return res.status(400).send("Webhook signature failed");
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.CheckoutSession;
    const { userId, plan } = s.metadata || {};
    if (userId && plan) {
      await sb.from("subscriptions").upsert({ user_id: userId, plan, status: "active", stripe_customer_id: s.customer });
      await sb.from("users").update({ plan }).eq("id", userId);
    }
  }

  return res.status(200).json({ received: true });
}
