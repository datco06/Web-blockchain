
export type ProjectStatus = 'in-progress' | 'revision' | 'completed' | 'active';

export interface Project {
  title: string;
  freelancer?: string;
  status: ProjectStatus;
  statusLabel: string;
  milestone?: string;
  progress?: number;
  budget: string;
  icon?: 'globe' | 'api';
  description?: string;
  duration?: string;
  requirements?: string;
  category?: string;
  postDate?: string;
  bids?: number;
  milestones?: any[];
}
