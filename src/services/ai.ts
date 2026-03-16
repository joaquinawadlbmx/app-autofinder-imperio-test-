import { GoogleGenAI, Type } from "@google/genai";
import { AutomationReport, DiagnosticInput } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateAutomationReport(input: DiagnosticInput): Promise<AutomationReport> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following business for automation opportunities. 
    Business Name: ${input.businessName}
    Industry: ${input.industry}
    Tech Stack: ${input.techStack.join(", ")}
    Pain Points: ${input.painPoints}
    Employee Count: ${input.employeeCount}
    
    Calculate potential savings and identify at least 3 high-impact automation opportunities.
    Return a structured JSON report.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          businessName: { type: Type.STRING },
          totalEstimatedSavings: { type: Type.STRING },
          opportunities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                complexity: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                estimatedPrice: { type: Type.NUMBER },
                benefitROI: { type: Type.STRING },
                toolsRecommended: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["title", "description", "complexity", "estimatedPrice", "benefitROI", "toolsRecommended"]
            }
          },
          nextSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["businessName", "totalEstimatedSavings", "opportunities", "nextSteps"]
      }
    }
  });

  const reportData = JSON.parse(response.text || "{}");
  
  return {
    ...reportData,
    id: Math.random().toString(36).substring(7),
    industry: input.industry,
    createdAt: new Date().toISOString()
  };
}
