import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODELS: Record<string, string> = {
  starter: "claude-haiku-4-5",
  pro:     "claude-sonnet-4-6",
  business:"claude-opus-4-6",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages, system, plan = "pro" } = req.body;
    const response = await client.messages.create({
      model: MODELS[plan] || MODELS.pro,
      max_tokens: 1000,
      system: system || "You are Ninos AI, an expert digital advertising strategist. Help users create and optimize campaigns for Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, Pinterest, BidMachine and X Ads. Respond in the same language the user writes in.",
      messages,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
