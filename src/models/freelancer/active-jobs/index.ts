import { useState, useMemo } from 'react';
import { rawActiveJobs } from '@/services/freelancer/active-jobs';
import { JobStatus } from '@/services/freelancer/jobs/typing.d';
import type { ActiveJob } from '@/services/freelancer/active-jobs/typing.d';

export default function useActiveJobsModel() {
  const [activeJobs] = useState<ActiveJob[]>(rawActiveJobs);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredActiveJobs = useMemo(() => {
    let result = activeJobs;

    if (activeTab === 'in-progress') {
      result = result.filter(
        (j) =>
          j.status === JobStatus.InProgress ||
          j.status === JobStatus.Revision ||
          j.status === JobStatus.Active
      );
    } else if (activeTab === 'completed') {
      result = result.filter((j) => j.status === JobStatus.Completed);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((j) => j.title.toLowerCase().includes(query));
    }

    return result;
  }, [activeJobs, activeTab, searchQuery]);

  return {
    activeJobs: filteredActiveJobs,
    allActiveJobs: activeJobs,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  };
}
