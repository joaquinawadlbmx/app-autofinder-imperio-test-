export interface AutomationOpportunity {
  title: string;
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
  estimatedPrice: number;
  benefitROI: string;
  toolsRecommended: string[];
}

export interface AutomationReport {
  id: string;
  businessName: string;
  industry: string;
  totalEstimatedSavings: string;
  opportunities: AutomationOpportunity[];
  nextSteps: string[];
  createdAt: string;
}

export interface DiagnosticInput {
  businessName: string;
  industry: string;
  techStack: string[];
  painPoints: string;
  employeeCount: string;
}
