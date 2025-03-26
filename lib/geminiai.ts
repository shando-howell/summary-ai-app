import { GoogleGenAI } from "@google/genai"
import { SUMMARY_SYSTEM_PROMPT } from "./prompts";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || ''});

export const generateSummaryFromGemini = async (pdfText: string) => {
    try {
        const response = await genAI.models.generateContent({ 
            model: "gemini-2.0-flash",
            contents: [
                { 
                    role: 'user', 
                    parts: [
                        { text: SUMMARY_SYSTEM_PROMPT }, 
                        { 
                            text: `Transform this document
                            into an engaging, easy-to-read summary with contextually relevant
                            emojis and proper markdown formatting:\n\n${pdfText}`
                        }
                    ]
                },
            ],
            config: {
                maxOutputTokens: 1500,
                temperature: 0.7
            },
        });

        if (!response.text) {
            throw new Error('Empty response from Gemini API');
        }

        return response.text;
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};