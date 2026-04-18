
import { useMemo, useState } from 'react';
import {
  rawPayoutCards,
  rawPaymentMethods,
  rawNextPayout,
  rawSupportLinks,
  FEE_RATE,
  MIN_FEE,
} from '@/services/freelancer/earnings';
import type { PayoutCard, PaymentMethod, NextPayout, SupportLink } from '@/services/freelancer/earnings/typing';

export default function useEarningsModel() {
  const [payoutCards] = useState<PayoutCard[]>(rawPayoutCards);
  const [paymentMethods] = useState<PaymentMethod[]>(rawPaymentMethods);
  const [nextPayout] = useState<NextPayout>(rawNextPayout);
  const [supportLinks] = useState<SupportLink[]>(rawSupportLinks);

  const [selectedMethod, setSelectedMethod] = useState(rawPaymentMethods[0].id);
  const [amount, setAmount] = useState('');

  const availableBalance = payoutCards.find((card) => card.key === 'available')?.amount ?? 0;
  const numericAmount = Number(amount) || 0;

  const { fee, total } = useMemo(() => {
    if (!numericAmount) {
      return { fee: 0, total: 0 };
    }
    const computedFee = Math.max(numericAmount * FEE_RATE, MIN_FEE);
    return {
      fee: Math.min(computedFee, numericAmount),
      total: Math.max(numericAmount - computedFee, 0),
    };
  }, [numericAmount]);

  const exceedsBalance = numericAmount > availableBalance;
  const canSubmit = numericAmount > 0 && !exceedsBalance;

  const selectedMethodMeta = paymentMethods.find((method) => method.id === selectedMethod);

  const formatCurrency = (value: number): string => {
    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `Ξ ${formatted}`;
  };

  return {
    payoutCards,
    paymentMethods,
    nextPayout,
    supportLinks,
    selectedMethod,
    setSelectedMethod,
    amount,
    setAmount,
    availableBalance,
    numericAmount,
    fee,
    total,
    exceedsBalance,
    canSubmit,
    selectedMethodMeta,
    formatCurrency,
  };
}
