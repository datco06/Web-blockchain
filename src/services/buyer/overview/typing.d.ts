
export interface OverviewStat {
  key: string;
  label: string;
  value: string;
  chip?: string;
  icon: 'jobs' | 'proposals' | 'escrow' | 'messages';
  tone?: 'positive' | 'warning' | 'secure' | 'info';
}
