export enum JobLevel {
  Entry = 'Entry',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
}

export enum JobStatus {
  Active = 'active',
  InProgress = 'in-progress',
  Revision = 'revision',
  Completed = 'completed',
}

export interface Job {
  title: string;
  description: string;
  budget: string;
  category: string;
  level: string;
  location: string;
  type: string;
  timestamp: string;
  status: JobStatus;
  statusLabel: string;
  postDate: string;
  deadline?: string;
  requirements?: string[];
}
