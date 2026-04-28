
import type { Milestone } from './typing';
import { MilestoneStatusType } from './typing';

export const rawMilestones: Milestone[] = [
  {
    title: 'FinTech App UI Design',
    subtitle: 'Milestone 2 · High-fidelity Wireframes',
    amount: '$1,500',
    statusText: 'Due in 2 days',
    statusType: MilestoneStatusType.Warning,
    avatar: 'G',
  },
  {
    title: 'SaaS Platform Development',
    subtitle: 'Milestone 4 · API Integration',
    amount: '$2,800',
    statusText: 'Submitted',
    statusType: MilestoneStatusType.Success,
    avatar: 'S',
  },
];
