
export enum StatIcon {
  Jobs = 'jobs',
  Proposals = 'proposals',
  Escrow = 'escrow',
  Messages = 'messages',
}

export enum StatTone {
  Positive = 'positive',
  Warning = 'warning',
  Secure = 'secure',
  Info = 'info',
}

export interface OverviewStat {
  key: string;
  label: string;
  value: string;
  chip?: string;
  icon: StatIcon;
  tone?: StatTone;
}
