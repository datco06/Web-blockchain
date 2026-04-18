
export interface Talent {
  id: string;
  name: string;
  role: string;
  bid: string;
  bidType: string;
  experience: string;
  portfolio: string;
  match: number;
  avatar: string;
}

export interface TalentFilters {
  specialty: string;
  experience: string;
}
