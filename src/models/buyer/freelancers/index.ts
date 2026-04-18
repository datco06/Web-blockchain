
import { useState } from 'react';
import { rawTalents } from '@/services/buyer/freelancers';
import type { Talent, TalentFilters } from '@/services/buyer/freelancers/typing';

export default function useFreelancersModel() {
  const [talents, setTalents] = useState<Talent[]>(rawTalents);
  const [filteredTalents, setFilteredTalents] = useState<Talent[]>(rawTalents);

  const filterTalents = (filters: TalentFilters): Talent[] => {
    return talents.filter((talent) => {
      const matchSpecialty = talent.role.toLowerCase().includes(filters.specialty.toLowerCase());

      let matchExperience = true;
      if (filters.experience === 'mid')    matchExperience = talent.experience.includes('3+') || talent.experience.includes('4+');
      else if (filters.experience === 'senior') matchExperience = talent.experience.includes('5+') || talent.experience.includes('6+');
      else if (filters.experience === 'lead')   matchExperience = talent.experience.includes('8+');

      return matchSpecialty && matchExperience;
    });
  };

  const getTalentById = (id: string): Talent | undefined =>
    talents.find((t) => t.id === id);

  return {
    talents,
    setTalents,
    filteredTalents,
    setFilteredTalents,
    filterTalents,
    getTalentById
  };
}
