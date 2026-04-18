
import type { UploadFile } from 'antd';

export interface JobFormValues {
  title: string;
  category: string;
  description: string;
  functionality: string;
  requirements: string;
  duration: string;
  budgetRange: string;
  documents?: UploadFile[];
}

export interface BudgetOption {
  label: string;
  value: string;
}
