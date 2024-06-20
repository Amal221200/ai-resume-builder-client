"use server"
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_AI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
};

export async function generateAIWorkSummary(prompt: string) {
    const chatSession = model.startChat({
        generationConfig: { ...generationConfig, responseMimeType: 'text/plain' },
        history: [
        ],
    });

    const result = await chatSession.sendMessage(prompt);

    return result.response.text()
}
export async function generateAISummary(prompt: string) {
    const chatSession = model.startChat({
        generationConfig: { ...generationConfig, responseMimeType: 'text/json' },
        history: [
        ],
    });

    const result = await chatSession.sendMessage(prompt);

    return result.response.text()
}
