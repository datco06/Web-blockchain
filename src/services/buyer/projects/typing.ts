export enum ProjectStatus {
  InProgress = 'in-progress',
  Revision = 'revision',
  Completed = 'completed',
  Active = 'active',
}

export enum ProjectIcon {
  Globe = 'globe',
  Api = 'api',
}

export interface Project {
  title: string;
  freelancer?: string;
  status: ProjectStatus;
  statusLabel: string;
  milestone?: string;
  progress?: number;
  budget: string;
  icon?: ProjectIcon;
  description?: string;
  duration?: string;
  requirements?: string;
  category?: string;
  postDate?: string;
  bids?: number;
  milestones?: any[];
}
