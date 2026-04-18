
export interface PayoutCard {
  key: string;
  label: string;
  amount: number;
  badge: string;
  description: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  details: string;
  network: string;
}

export interface NextPayout {
  date: string;
  amount: number;
  status: string;
}

export interface SupportLink {
  label: string;
  href: string;
}
