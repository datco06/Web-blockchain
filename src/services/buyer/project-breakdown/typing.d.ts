
export interface AiMilestone {
  milestoneName: string;
  description: string;
  duration: string;
  payment: string;
  aiNote: string;
}

export interface PushedProject {
  title: string;
  description: string;
  budget: string;
  duration: string;
  requirements: string;
  category: string;
  milestones: AiMilestone[];
  documents?: any[];
  status: 'active';
  statusLabel: 'Active';
  postDate: string;
  bids: number;
}
