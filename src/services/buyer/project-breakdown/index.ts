
export const AI_MODEL = 'gemini-2.5-flash';

export const buildBreakdownPrompt = (jobData: object): string => `
  You are an expert Project Manager. I have a project with the following details:
  ${JSON.stringify(jobData)}

  Please break down this project into logical milestones.
  RETURN ONLY VALID JSON. The structure must exactly match this format:
  [
    {
      "milestoneName": "Milestone 1: Discovery & Research",
      "description": "Analyze user needs and market...",
      "duration": "1 week",
      "payment": "0.3 ETH (12%)",
      "aiNote": "Focus on competitor analysis in the Vietnam market."
    }
  ]
`;
