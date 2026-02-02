
import { GoogleGenAI } from "@google/genai";

export const get90sResponse = async (prompt: string) => {
  // Use the recommended initialization pattern with process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are a cool, radical teenager from the mid-90s in Russia. 
        Use slang like "круто", "отпад", "реально", "ништяк", "базар", "тема". 
        Mention 90s stuff like Dendy, Tetris, cassettes, Turbo chewing gum, and Pepsi.
        Keep responses short, enthusiastic, and very nostalgic. 
        Always reply in Russian. If someone asks for a wish, make it crazy and retro.`,
        temperature: 0.9,
      },
    });
    // Accessing the .text property directly as per GenerateContentResponse definition
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Ой! Процессор Pentium перегрелся... Давай попробуем еще раз, реально!";
  }
};