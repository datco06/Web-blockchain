
import type { PayoutCard, PaymentMethod, NextPayout, SupportLink } from './typing';

export const FEE_RATE = 0.025;
export const MIN_FEE = 5;

export const rawPayoutCards: PayoutCard[] = [
  {
    key: 'available',
    label: 'Available to withdraw',
    amount: 7320,
    badge: 'Ready',
    description: 'Cleared funds ready for payout.',
  },
  {
    key: 'locked',
    label: 'Temporarily locked',
    amount: 2150,
    badge: 'In review',
    description: 'Funds clearing with clients.',
  },
  {
    key: 'lifetime',
    label: 'Withdrawn this month',
    amount: 4800,
    badge: '+18% vs last month',
    description: 'Total processed in March.',
  },
];

export const rawPaymentMethods: PaymentMethod[] = [
  { id: 'usdc', label: 'ETH Wallet', details: '0x71C7...99de', network: 'Base' },
];

export const rawNextPayout: NextPayout = {
  date: 'April 4, 2026',
  amount: 1850,
  status: 'Scheduled',
};

export const rawSupportLinks: SupportLink[] = [
  { label: 'How payout fees work', href: '#' },
  { label: 'Update compliance data', href: '#' },
  { label: 'Contact finance support', href: '#' },
];
