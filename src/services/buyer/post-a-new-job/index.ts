
import type { BudgetOption } from './typing';

export const budgetOptions: BudgetOption[] = [
  { label: '$3,000 – $5,000',  value: '3k-5k'   },
  { label: '$5,000 – $7,500',  value: '5k-75k'  },
  { label: '$7,500 – $10,000', value: '75k-10k' },
  { label: '$10,000+',         value: '10k+'    },
];

export const categoryOptions = [
  { label: 'Product Design',         value: 'product'  },
  { label: 'Front-end Engineering',  value: 'frontend' },
  { label: 'Backend / API',          value: 'backend'  },
  { label: 'AI & Data',              value: 'ai'       },
];
