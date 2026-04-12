import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAi = () => {
  if (!aiInstance) {
    // Safely access GEMINI_API_KEY from process.env (Vite define) or import.meta.env
    const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please check your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export interface GeneratedPost {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageKeyword: string;
}

export const generateArticles = async (topic: string, count: number = 3): Promise<GeneratedPost[]> => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `Generate ${count} high-quality blog articles about "${topic}" for a construction and excavation company named "Orhanlar Hafriyat". 
    The articles should be professional, informative, and SEO-friendly.
    Each article should have a title, a short excerpt, a long detailed content in Markdown format, a category, and a relevant image keyword for a placeholder image.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING },
            imageKeyword: { type: Type.STRING },
          },
          required: ["title", "excerpt", "content", "category", "imageKeyword"],
        },
      },
    },
  });

  if (!response.text) {
    throw new Error("No content generated from Gemini");
  }

  return JSON.parse(response.text.trim());
};
