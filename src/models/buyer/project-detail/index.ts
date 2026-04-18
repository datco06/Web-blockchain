
import { useState } from 'react';
import { PROJECT_DETAIL_STORAGE_KEY } from '@/services/buyer/project-detail';
import type { DetailedProject } from '@/services/buyer/project-detail/typing';

export default function useProjectDetailModel() {
  const [projectDetail, setProjectDetail] = useState<DetailedProject | null>(null);

  const getProjectFromState = (locationState: any): DetailedProject | null =>
    locationState?.project ?? null;

  const calcCompletionPercent = (project: DetailedProject): number => {
    if (!project.milestones || project.milestones.length === 0) return 0;
    const milestoneStr = project.milestone ?? '';
    const match = milestoneStr.match(/(\d+)\/(\d+)/);
    if (!match) return project.progress ?? 0;
    return Math.round((parseInt(match[1]) / parseInt(match[2])) * 100);
  };

  return {
    projectDetail,
    setProjectDetail,
    getProjectFromState,
    calcCompletionPercent
  };
}
