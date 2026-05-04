
import type { SummaryCard } from './typing';
import { CardStatus, CardIcon } from './typing';

export const rawSummaryCards: SummaryCard[] = [
  { label: 'Total Earnings', value: '$0.00', change: '0%', status: CardStatus.Steady, icon: CardIcon.Earnings },
  { label: 'Active Deals',   value: '0 Projects', status: CardStatus.Steady, icon: CardIcon.Deals },
  { label: 'In Escrow',      value: '$0.00', status: CardStatus.Steady, icon: CardIcon.Escrow },
];
