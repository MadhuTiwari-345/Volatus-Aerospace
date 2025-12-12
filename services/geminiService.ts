import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Simple in-memory cache to store generated images
// Key: `${title}-${description}` (hash-like key)
// Value: Base64 image string
const productImageCache = new Map<string, string>();

// Circuit breaker state
let isQuotaExceeded = false;

export const querySiteAssistant = async (query: string): Promise<string> => {
  if (!ai) {
    return "API Key is missing. Please configure the environment to use the AI assistant.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are the AI Assistant for Volatus Aerospace. 
      Your goal is to help users navigate the website and understand our services.
      
      Our main sections are:
      - Solutions: Industrial inspections, Cargo, Defense, Environmental.
      - Products: Enterprise Drones, Sensors, Software.
      - Training: Pilot certification, Advanced Ops.
      - Company: Investors, Careers.

      Keep answers short (under 50 words) and direct the user to the relevant section.
      If they ask about stock, mention "Investors".
      If they ask about drones, mention "Products".
      If they ask about flight school, mention "Training".
    `;

    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
      }
    });

    return response.text || "I couldn't find specific information on that. Please check our 'Solutions' tab.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the network right now.";
  }
};

export const generateProductImage = async (title: string, description: string): Promise<string | null> => {
  if (!ai) {
    console.error("API Key is missing.");
    return null;
  }

  // Circuit breaker: If we've hit a quota limit previously, stop trying to prevent spamming the API
  if (isQuotaExceeded) {
    return null;
  }

  const cacheKey = `${title}-${description}`;
  if (productImageCache.has(cacheKey)) {
    return productImageCache.get(cacheKey) || null;
  }

  try {
    const prompt = `Professional cinematic product photography of a high-tech drone named "${title}". Context: ${description}. The drone should be sleek, modern, and realistic. High resolution, 8k, studio lighting or dramatic outdoor setting relevant to the description. No text overlays.`;

    // Switched to 'gemini-2.5-flash-image' for better quota availability and general purpose generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: '16:9',
            // imageSize is not supported for gemini-2.5-flash-image
        },
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const mimeType = part.inlineData.mimeType || 'image/png';
                const base64EncodeString = part.inlineData.data;
                const imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
                productImageCache.set(cacheKey, imageUrl);
                return imageUrl;
            }
        }
    }
    
    return null;
  } catch (error: any) {
    // Gracefully handle rate limits (429) and billing errors (403)
    const errorMessage = error.message || JSON.stringify(error);
    if (
        errorMessage.includes('429') || 
        errorMessage.includes('RESOURCE_EXHAUSTED') || 
        errorMessage.includes('403') || // Often indicates billing not enabled
        errorMessage.includes('quota')
    ) {
      console.warn(`Gemini API Quota/Billing Limit hit for "${title}". Disabling further image generation for this session to prevent errors.`);
      isQuotaExceeded = true;
    } else {
      console.error("Gemini API Error:", error);
    }
    return null;
  }
};