
import { useState } from 'react';
import { rawJobs, rawFreelancerName } from '@/services/freelancer/jobs';
import type { Job } from '@/services/freelancer/jobs/typing';

export default function useJobsModel() {
  const [jobs, setJobs] = useState<Job[]>(rawJobs);
  const [freelancerName] = useState<string>(rawFreelancerName);

  const getJobsByType = (type: string): Job[] => {
    return jobs.filter((j) => j.type === type);
  };

  return {
    jobs,
    setJobs,
    freelancerName,
    getJobsByType,
  };
}
