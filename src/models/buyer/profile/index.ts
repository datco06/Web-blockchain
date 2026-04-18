
import { useState } from 'react';
import { rawProfileStats } from '@/services/buyer/profile';
import type { ProfileStat } from '@/services/buyer/profile/typing';

export default function useProfileModel() {
  const [profileStats, setProfileStats] = useState<ProfileStat[]>(rawProfileStats);

  const validateAvatarFile = (file: File): string | null => {
    if (file.size > 2 * 1024 * 1024) return 'Image must be smaller than 2MB!';
    return null;
  };

  return {
    profileStats,
    setProfileStats,
    validateAvatarFile
  };
}
