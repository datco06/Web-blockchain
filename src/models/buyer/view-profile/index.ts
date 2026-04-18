
import { defaultFreelancerProfile } from '@/services/buyer/view-profile';
import type { FreelancerProfile } from '@/services/buyer/view-profile/typing';
import { useState } from 'react';

export default function useViewProfileModel() {
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);

  const resolveFreelancerProfile = (passedFreelancer?: any): FreelancerProfile => {
    if (!passedFreelancer) return defaultFreelancerProfile;
    return {
      ...defaultFreelancerProfile,
      name:   passedFreelancer.name   ?? defaultFreelancerProfile.name,
      role:   passedFreelancer.role   ?? passedFreelancer.jobTitle ?? defaultFreelancerProfile.role,
      rating: passedFreelancer.rating ?? defaultFreelancerProfile.rating,
    };
  };

  const copyProfileLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return {
    profile,
    setProfile,
    resolveFreelancerProfile,
    copyProfileLink
  };
}
