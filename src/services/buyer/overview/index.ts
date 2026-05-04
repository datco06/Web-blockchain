
import type { OverviewStat } from './typing';
import { StatIcon, StatTone } from './typing';

export const rawOverviewStats: OverviewStat[] = [
  { key: 'jobs',      label: 'Active Jobs',    value: '0',        chip: '0 this week', icon: StatIcon.Jobs,      tone: StatTone.Info },
  { key: 'proposals', label: 'Proposals',      value: '0',        chip: '0 pending',    icon: StatIcon.Proposals, tone: StatTone.Info  },
  { key: 'escrow',    label: 'Escrow Balance', value: '$0.00', chip: 'Secure',       icon: StatIcon.Escrow,    tone: StatTone.Secure   },
  { key: 'messages',  label: 'Messages',       value: '0',       chip: '0 unread',     icon: StatIcon.Messages,  tone: StatTone.Info     },
];
