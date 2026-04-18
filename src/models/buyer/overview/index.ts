
import { useState } from 'react';
import { rawOverviewStats } from '@/services/buyer/overview';
import type { OverviewStat } from '@/services/buyer/overview/typing';

export default function useOverviewModel() {
  const [stats, setStats] = useState<OverviewStat[]>(rawOverviewStats);

  const getActiveJobCount = (): number => {
    const stat = stats.find((s) => s.key === 'jobs');
    return stat ? parseInt(stat.value, 10) : 0;
  };

  return {
    stats,
    setStats,
    getActiveJobCount
  };
}
