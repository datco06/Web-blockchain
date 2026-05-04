import type {
  FreelancerContact,
  FreelancerServiceSkill,
  PortfolioProject,
  WorkHistoryItem,
} from './typing';
import { PricingType } from './typing';

export const rawContact: FreelancerContact = {
  displayName: '',
  email: '',
  title: '',
  bio: '',
  avatarUrl: '',
};

export const rawServiceSkill: FreelancerServiceSkill = {
  experience: '',
  category: '',
  skills: [],
  languages: [],
  pricing: PricingType.Hourly,
  rate: '',
};

export const rawPortfolioProjects: PortfolioProject[] = [];

export const rawWorkHistory: WorkHistoryItem[] = [];
