import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICES: Record<string, Record<string, string>> = {
  starter: { usd: "price_starter_usd", brl: "price_starter_brl", eur: "price_starter_eur" },
  pro:     { usd: "price_pro_usd",     brl: "price_pro_brl",     eur: "price_pro_eur"     },
  business:{ usd: "price_biz_usd",     brl: "price_biz_brl",     eur: "price_biz_eur"     },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { plan, currency = "brl", email } = req.body;
    const priceId = PRICES[plan]?.[currency];
    if (!priceId) return res.status(400).json({ error: "Invalid plan or currency" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.VITE_APP_URL}/?checkout=success`,
      cancel_url:  `${process.env.VITE_APP_URL}/?checkout=cancelled`,
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: "Checkout failed" });
  }
}
