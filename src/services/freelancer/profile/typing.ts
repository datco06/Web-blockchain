
export interface FreelancerContact {
  displayName: string;
  email: string;
  title: string;
  bio: string;
  avatarUrl: string;
}

export interface Language {
  id: string;
  name: string;
}

export enum PricingType {
  Hourly = 'Hourly',
  Fixed = 'Fixed',
}

export interface FreelancerServiceSkill {
  experience: string;
  category: string;
  skills: string[];
  languages: Language[];
  pricing: PricingType;
  rate: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  type: string;
  link?: string;
}

export interface WorkHistoryItem {
  title: string;
  amount: string;
  type: string;
}
