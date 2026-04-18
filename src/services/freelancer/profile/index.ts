
import type {
  FreelancerContact,
  FreelancerServiceSkill,
  PortfolioProject,
  WorkHistoryItem,
} from './typing';

export const rawContact: FreelancerContact = {
  displayName: 'Alex Rivera',
  title: 'Senior Product Designer & Brand Strategist',
  bio: `I'm a digital product designer with over 8 years of experience building scalable design systems and intuitive user interfaces for tech startups and established brands globally.`,
  avatarUrl: '/images/avatar-placeholder.png',
};

export const rawServiceSkill: FreelancerServiceSkill = {
  experience: '8+ Years',
  category: 'UI/UX & Product Design',
  skills: ['Figma', 'Design Systems', 'React', 'User Research'],
  languages: [
    { id: 'lang-1', name: 'English (Native)' },
    { id: 'lang-2', name: 'Spanish (Fluent)' },
  ],
  pricing: 'Hourly',
  rate: '85',
};

export const rawPortfolioProjects: PortfolioProject[] = [
  { id: 'lumina', title: 'Lumina CRM Dashboard', type: 'Product UI & Systems' },
  { id: 'cloudsync', title: 'CloudSync Brand Site', type: 'Marketing Experience' },
];

export const rawWorkHistory: WorkHistoryItem[] = [
  { title: 'Fintech App Redesign', amount: '$4,500 · 2 weeks ago', type: 'Fixed' },
  { title: 'Landing Page for SaaS', amount: '$1,200 · 1 month ago', type: 'Fixed' },
  { title: 'User Research Study', amount: '$650 · 2 months ago', type: 'Hourly' },
];
