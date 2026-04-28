import { JobStatus } from '../jobs/typing.d';

export interface ActiveJob {
  id: string;
  title: string;
  description: string;
  budget: string;
  client: string;
  status: JobStatus;
  statusLabel: string;
  progress: number;
  startDate: string;
  deadline: string;
  category: string;
}

export interface ClientFile {
  id: string;
  name: string;
  size: string;
}

export type TaskStatus = 'completed' | 'pending_review' | 'not_completed';

export interface AITask {
  id: string;
  title: string;
  description: string;
  duration: string;
  payment: string;
  deadline: string;
  status: TaskStatus;
  aiNote?: string;
}

export interface ActiveJobDetail extends ActiveJob {
  technologies: string[];
  files: ClientFile[];
  tasks: AITask[];
}
