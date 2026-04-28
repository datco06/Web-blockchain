
import type { SummaryCard } from './typing';
import { CardStatus, CardIcon } from './typing';

export const rawSummaryCards: SummaryCard[] = [
  { label: 'Total Earnings', value: '$12,450.00', change: '+12.5%', status: CardStatus.Positive, icon: CardIcon.Earnings },
  { label: 'Active Deals',   value: '8 Projects',                   status: CardStatus.Steady,   icon: CardIcon.Deals    },
  { label: 'In Escrow',      value: '$3,200.00',                    status: CardStatus.Pending,  icon: CardIcon.Escrow   },
];
