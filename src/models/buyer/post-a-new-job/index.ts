
import { budgetOptions, categoryOptions } from '@/services/buyer/post-a-new-job';
import type { JobFormValues } from '@/services/buyer/post-a-new-job/typing';

export default function usePostJobModel() {
  const getBudgetOptions = () => budgetOptions;
  const getCategoryOptions = () => categoryOptions;

  const validateJobForm = (values: JobFormValues): string | null => {
    if (!values.title?.trim())        return 'Job title is required.';
    if (!values.description?.trim())  return 'Description is required.';
    if (!values.requirements?.trim()) return 'Requirements are required.';
    if (!values.duration?.trim())     return 'Duration is required.';
    return null;
  };

  return {
    getBudgetOptions,
    getCategoryOptions,
    validateJobForm
  };
}
