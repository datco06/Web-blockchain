
import type { OverviewStat } from './typing';
import { StatIcon, StatTone } from './typing';

export const rawOverviewStats: OverviewStat[] = [
  { key: 'jobs',      label: 'Active Jobs',    value: '12',        chip: '+2 this week', icon: StatIcon.Jobs,      tone: StatTone.Positive },
  { key: 'proposals', label: 'Proposals',      value: '24',        chip: '8 pending',    icon: StatIcon.Proposals, tone: StatTone.Warning  },
  { key: 'escrow',    label: 'Escrow Balance', value: '$4,250.00', chip: 'Secure',       icon: StatIcon.Escrow,    tone: StatTone.Secure   },
  { key: 'messages',  label: 'Messages',       value: '156',       chip: '3 unread',     icon: StatIcon.Messages,  tone: StatTone.Info     },
];
