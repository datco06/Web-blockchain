
import { useState } from 'react';
import { rawSummaryCards } from '@/services/freelancer/summary';
import type { SummaryCard } from '@/services/freelancer/summary/typing';

export default function useSummaryModel() {
  const [summaryCards, setSummaryCards] = useState<SummaryCard[]>(rawSummaryCards);

  const getTotalEarnings = (): string => {
    const earningsCard = summaryCards.find((c) => c.icon === 'earnings');
    return earningsCard?.value ?? '$0';
  };

  return {
    summaryCards,
    setSummaryCards,
    getTotalEarnings,
  };
}
