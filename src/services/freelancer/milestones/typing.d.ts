
export type MilestoneStatusType = 'warning' | 'success' | 'info';

export interface Milestone {
  title: string;
  subtitle: string;
  amount: string;
  statusText: string;
  statusType: MilestoneStatusType;
  avatar: string;
}
