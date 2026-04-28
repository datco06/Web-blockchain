import { useState, useCallback } from 'react';
import { fetchActiveJobDetail } from '@/services/freelancer/active-jobs/active-detail';
import type { ActiveJobDetail } from '@/services/freelancer/active-jobs/typing.d';

export default function useActiveJobDetailModel() {
  const [jobDetail, setJobDetail] = useState<ActiveJobDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadJobDetail = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await fetchActiveJobDetail(id);
      setJobDetail(data);
    } catch (error) {
      console.error('Failed to load active job details:', error);
      setJobDetail(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jobDetail,
    loading,
    loadJobDetail,
  };
}
