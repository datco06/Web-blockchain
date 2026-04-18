
export interface ProjectMilestone {
  milestoneName: string;
  description?: string;
  duration?: string;
  payment?: string;
  aiNote?: string;
}

export interface DetailedProject {
  title: string;
  freelancer?: string;
  status: string;
  statusLabel: string;
  milestone?: string;
  progress?: number;
  budget: string;
  icon?: string;
  description?: string;
  duration?: string;
  requirements?: string;
  category?: string;
  postDate?: string;
  bids?: number;
  milestones?: ProjectMilestone[];
  documents?: any[];
}
