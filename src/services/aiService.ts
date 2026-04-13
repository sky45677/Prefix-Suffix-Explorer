import { GoogleGenAI, Type } from "@google/genai";
import { WordPart } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askAI(question: string, context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: ${context}\n\nUser Question: ${question}`,
      config: {
        systemInstruction: "You are MorphoBot, an expert in Greek and Latin morphology. Help users understand word roots, prefixes, and suffixes. Keep answers concise, educational, and encouraging.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to my linguistic database right now. Please try again!";
  }
}

export async function generateWordParts() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 4 prefixes, 4 roots, and 4 suffixes for a morphology learning app.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prefixes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ["text", "meaning"],
              },
            },
            roots: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ["text", "meaning"],
              },
            },
            suffixes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ["text", "meaning"],
              },
            },
          },
          required: ["prefixes", "roots", "suffixes"],
        },
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Generation Error:", error);
    return null;
  }
}

export async function generateQuizQuestion(type: 'mcq' | 'fill' | 'boolean') {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a ${type} quiz question about Greek or Latin roots.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  text: { type: Type.STRING },
                  origin: { type: Type.STRING },
                },
                required: ["id", "text"],
              },
            },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING },
            example: { type: Type.STRING },
          },
          required: ["question", "correctAnswer", "explanation"],
        },
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return null;
  }
}
