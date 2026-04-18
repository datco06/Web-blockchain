
import { useState } from 'react';
import { rawProjects } from '@/services/buyer/projects';
import type { Project, ProjectStatus } from '@/services/buyer/projects/typing';

export default function useProjectsModel() {
  const [projects, setProjects] = useState<Project[]>(rawProjects);
  
  const getProjectsByStatus = (status: ProjectStatus): Project[] => {
    return projects.filter((p) => p.status === status);
  };
  
  const getTotalBudget = (): string => {
    const total = projects.reduce((sum, p) => {
      const num = parseFloat(p.budget.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
    return `$${total.toLocaleString()}`;
  };

  return {
    projects,
    setProjects,
    getProjectsByStatus,
    getTotalBudget
  };
}
