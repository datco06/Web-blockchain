import { useState, useMemo } from 'react';
import { rawJobs, rawFreelancerName } from '@/services/freelancer/jobs';
import type { Job } from '@/services/freelancer/jobs/typing.d';

export default function useJobsModel() {
  const [jobs] = useState<Job[]>(rawJobs);
  const [freelancerName] = useState<string>(rawFreelancerName);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNiche, setSelectedNiche] = useState<string>('All');

  const niches = useMemo(() => {
    const categories = jobs.map((j) => j.category);
    return ['All', ...new Set(categories)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];
    if (selectedNiche !== 'All') {
      result = result.filter((j) => j.category === selectedNiche);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(query) ||
          j.description.toLowerCase().includes(query)
      );
    }
    return result;
  }, [jobs, selectedNiche, searchQuery]);

  return {
    jobs: filteredJobs,
    allJobs: jobs,
    freelancerName,
    niches,
    selectedNiche,
    setSelectedNiche,
    searchQuery,
    setSearchQuery,
  };
}
