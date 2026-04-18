
import { useState } from 'react';
import { rawMilestones } from '@/services/freelancer/milestones';
import type { Milestone, MilestoneStatusType } from '@/services/freelancer/milestones/typing';

export default function useMilestonesModel() {
  const [milestones, setMilestones] = useState<Milestone[]>(rawMilestones);

  const getMilestonesByStatus = (status: MilestoneStatusType): Milestone[] => {
    return milestones.filter((m) => m.statusType === status);
  };

  const getUrgentMilestoneCount = (): number => {
    return milestones.filter((m) => m.statusType === 'warning').length;
  };

  return {
    milestones,
    setMilestones,
    getMilestonesByStatus,
    getUrgentMilestoneCount,
  };
}
