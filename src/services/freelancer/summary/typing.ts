
export enum CardStatus {
  Positive = 'positive',
  Steady = 'steady',
  Pending = 'pending',
}

export enum CardIcon {
  Earnings = 'earnings',
  Deals = 'deals',
  Escrow = 'escrow',
}

export interface SummaryCard {
  label: string;
  value: string;
  change?: string;
  status: CardStatus;
  icon: CardIcon;
}
