
import { useState } from 'react';
import { buildBreakdownPrompt, AI_MODEL } from '@/services/buyer/project-breakdown';
import type { AiMilestone, PushedProject } from '@/services/buyer/project-breakdown/typing';

export default function useProjectBreakdownModel() {
  const buildPushedProject = (jobData: any, aiTasks: AiMilestone[]): PushedProject => ({
    title:        jobData.title,
    description:  jobData.description,
    budget:       jobData.budgetRange,
    duration:     jobData.duration,
    requirements: jobData.requirements,
    category:     jobData.category,
    milestones:   aiTasks,
    documents:    jobData.documents,
    status:       'active',
    statusLabel:  'Active',
    postDate:     new Date().toLocaleDateString('en-US'),
    bids:         0,
  });

  const saveProjectToStorage = (project: PushedProject): void => {
    const existing = JSON.parse(localStorage.getItem('pushed_projects') || '[]');
    localStorage.setItem('pushed_projects', JSON.stringify([project, ...existing]));
  };

  const parseAiResponse = (responseText: string): AiMilestone[] => {
    const jsonMatch = responseText.match(/\\[[\\s\\S]*\\]/);
    const cleanJson = jsonMatch ? jsonMatch[0] : responseText;
    return JSON.parse(cleanJson);
  };

  return {
    buildPushedProject,
    saveProjectToStorage,
    parseAiResponse,
    buildBreakdownPrompt,
    AI_MODEL
  };
}
