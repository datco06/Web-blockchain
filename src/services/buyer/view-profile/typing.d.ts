
export interface FreelancerExperience {
  company: string;
  role: string;
  period: string;
}

export interface PortfolioItem {
  title: string;
  type: string;
  img: string;
}

export interface FreelancerReview {
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface FreelancerProfile {
  id: number;
  name: string;
  username: string;
  role: string;
  rating: number;
  reviewsCount: number;
  joinDate: string;
  bio: string;
  skills: string[];
  languages: string[];
  pricing: string;
  primaryService: string;
  experience: FreelancerExperience[];
  portfolio: PortfolioItem[];
  reviews: FreelancerReview[];
}
