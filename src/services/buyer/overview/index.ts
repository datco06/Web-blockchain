
import type { OverviewStat } from './typing';

export const rawOverviewStats: OverviewStat[] = [
  { key: 'jobs',      label: 'Active Jobs',    value: '12',        chip: '+2 this week', icon: 'jobs',      tone: 'positive' },
  { key: 'proposals', label: 'Proposals',      value: '24',        chip: '8 pending',    icon: 'proposals', tone: 'warning'  },
  { key: 'escrow',    label: 'Escrow Balance', value: '$4,250.00', chip: 'Secure',       icon: 'escrow',    tone: 'secure'   },
  { key: 'messages',  label: 'Messages',       value: '156',       chip: '3 unread',     icon: 'messages',  tone: 'info'     },
];
