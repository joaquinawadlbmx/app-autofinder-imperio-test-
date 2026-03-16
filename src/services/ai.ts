import { GoogleGenAI, Type } from "@google/genai";
import { AutomationReport, DiagnosticInput } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateAutomationReport(input: DiagnosticInput): Promise<AutomationReport> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analiza el siguiente negocio para encontrar oportunidades de automatización.
    Nombre del Negocio: ${input.businessName}
    Industria: ${input.industry}
    Stack Tecnológico: ${input.techStack.join(", ")}
    Puntos de Dolor: ${input.painPoints}
    Número de Empleados: ${input.employeeCount}
    
    Calcula el ahorro potencial anual y identifica al menos 3 oportunidades de automatización de alto impacto.
    Responde en ESPAÑOL.
    Devuelve un reporte JSON estructurado.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          businessName: { type: Type.STRING },
          totalEstimatedSavings: { type: Type.STRING, description: "Ahorro total estimado, ej: '$15,000/año'" },
          opportunities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Título de la oportunidad en español" },
                description: { type: Type.STRING, description: "Descripción detallada en español" },
                complexity: { type: Type.STRING, enum: ["Baja", "Media", "Alta"] },
                estimatedPrice: { type: Type.NUMBER, description: "Precio estimado de implementación en USD" },
                benefitROI: { type: Type.STRING, description: "Explicación del ROI en español" },
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
            items: { type: Type.STRING, description: "Pasos a seguir en español" }
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
