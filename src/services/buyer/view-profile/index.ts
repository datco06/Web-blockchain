
import type { FreelancerProfile } from './typing';

export const defaultFreelancerProfile: FreelancerProfile = {
  id: 1,
  name: 'Alex Rivera',
  username: '@arivera_design',
  role: 'Senior Product Designer & Brand Strategist',
  rating: 4.9,
  reviewsCount: 124,
  joinDate: 'Joined March 2021',
  bio: "I'm a digital product designer with over 8 years of experience building scalable design systems and intuitive user interfaces for tech startups and established brands globally.",
  skills: ['UI/UX Design', 'Figma', 'System Architecture', 'Brand Identity', 'React', 'Motion Design', 'Prototyping'],
  languages: ['English (Native)', 'Vietnamese (Fluent)', 'French (Intermediate)'],
  pricing: '$45 - $65 / hour',
  primaryService: 'Mobile & Web Product Design',
  experience: [
    { company: 'DesignFlow Studio', role: 'Lead Designer',    period: '2021 - Present' },
    { company: 'TechNova Inc.',     role: 'Senior UI Artist', period: '2018 - 2021'    },
    { company: 'CreativePulse',     role: 'Junior Designer',  period: '2016 - 2018'    },
  ],
  portfolio: [
    { title: 'Fintech Mobile App',     type: 'UI/UX',      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { title: 'E-commerce Platform',    type: 'Web Design', img: 'https://images.unsplash.com/photo-1523474253046-2cd2c78a0dbb?auto=format&fit=crop&w=600&q=80' },
    { title: 'Luxury Brand Identity',  type: 'Branding',   img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=600&q=80' },
  ],
  reviews: [
    { author: 'Michael Chen',  rating: 5, date: '2 weeks ago', text: 'Alex is one of the most talented designers I have worked with.' },
    { author: 'Sarah Jenkins', rating: 5, date: '1 month ago', text: 'Delivered the project ahead of schedule and precisely to specifications.' },
  ],
};
