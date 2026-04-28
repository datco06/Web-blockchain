
export enum MilestoneStatusType {
  Warning = 'warning',
  Success = 'success',
  Info = 'info',
}

export interface Milestone {
  title: string;
  subtitle: string;
  amount: string;
  statusText: string;
  statusType: MilestoneStatusType;
  avatar: string;
}
