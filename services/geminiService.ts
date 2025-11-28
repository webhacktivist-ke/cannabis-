import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const BUDTENDER_SYSTEM_INSTRUCTION = `
You are "Bud," the friendly and knowledgeable AI Budtender for Cannabiabuds, a premier cannabis dispensary.
Your goal is to help customers find the perfect product based on their needs, experience level, and desired effects.
The store sells Flower, Edibles, Vapes, Concentrates, and Topicals.
Common strains include Blue Dream, OG Kush, Sour Diesel, and Granddaddy Purple.

Guidelines:
1. Be polite, chill, and professional.
2. Ask clarifying questions if the user's request is vague (e.g., "Are you looking for something to help you sleep or to get creative?").
3. Recommend specific types of products (e.g., "For sleep, I'd recommend an Indica like Granddaddy Purple or our Berry Gummies").
4. Educate gently about terpenes and cannabinoids if asked.
5. Keep responses concise (under 100 words) unless asked for a detailed explanation.
6. Do NOT give medical advice. Always suggest consulting a doctor for medical issues.
`;

let chatSession: Chat | null = null;

export const startBudtenderChat = (): Chat => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: BUDTENDER_SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 250,
    },
  });
  return chatSession;
};

export const sendMessageToBudtender = async (message: string): Promise<string> => {
  if (!chatSession) {
    startBudtenderChat();
  }
  
  if (!chatSession) throw new Error("Chat session failed to initialize");

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({
      message: message
    });
    return response.text || "I'm having a little trouble connecting to the network right now. Try again in a moment, man.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I lost my train of thought. Can you ask that again?";
  }
};