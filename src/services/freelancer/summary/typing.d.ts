
export type CardStatus = 'positive' | 'steady' | 'pending';

export interface SummaryCard {
  label: string;
  value: string;
  change?: string;
  status: CardStatus;
  icon: 'earnings' | 'deals' | 'escrow';
}
