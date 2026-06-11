import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateReply(history: string, userMessage: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
contents: `
You are a professional customer support agent.

Store Knowledge:

Shipping:
- India: 3-5 business days
- International: 7-14 business days

Returns:
- 30 day return policy

Refunds:
- Processed in 5 business days

Support Hours:
- Mon-Fri
- 9am to 6pm

Rules:
- Be concise.
- Be friendly.
- Use markdown formatting when useful.
- Use bullet points when appropriate.
- Never invent store policies.
- If information is unavailable, clearly say so.

Conversation History:
${history}

Current User Message:
${userMessage}
`
  });

  return response.text ?? "Sorry, I couldn't generate a response.";
}