import dotenv from "dotenv"
dotenv.config()
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter";
const groq=new ChatGroq({
    model:"openai/gpt-oss-120b"
})

const gemini=new ChatGoogleGenerativeAI({
    model:"gemini-2.5-flash"
})

// free OpenRouter model (works with a $0-limit key); swap back to groq/deepseek when those keys are added
const openrouter=new ChatOpenRouter({
    model:"recursive/flint-v1.0:free",
    temperature:0,
    maxTokens:2500
})

// free vision-capable OpenRouter model for image analysis (Google key can't do generateContent)
const openrouterVision=new ChatOpenRouter({
    model:"nvidia/nemotron-3.5-super-vl:free",
    temperature:0,
    maxTokens:2500
})


export const getModel=async (agent)=>{
    switch (agent) {
        case "chat":
            return openrouter;
        case "search" :
           return openrouter;
        case "coding":
           return openrouter;
        case "imageAnalyzer":
           return openrouterVision;

        default:
            return openrouter;
    }
}

