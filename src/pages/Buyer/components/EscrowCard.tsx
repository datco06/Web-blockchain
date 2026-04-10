import { FormEvent, useState } from 'react';

interface CurrencyOption {
	label: string;
	value: 'ETH' | 'USDT' | 'USDC';
}

const currencyOptions: CurrencyOption[] = [
	{ label: 'ETH', value: 'ETH' },
	{ label: 'USDT', value: 'USDT' },
	{ label: 'USDC', value: 'USDC' },
];

const EscrowCard = () => {
	const [amount, setAmount] = useState('1.0');
	const [currency, setCurrency] = useState<CurrencyOption['value']>('ETH');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<section className='escrow-card'>
				<header>
					<div>
						<p className='eyebrow'>Secure Escrow</p>
						<h3>Deposit Funds</h3>
						<p className='description'>Escrow protects both sides and releases funds only after you approve milestones.</p>
					</div>
				</header>
			<form className='escrow-form' onSubmit={handleSubmit}>
				<label htmlFor='escrow-amount'>Deposit Amount</label>
				<div className='amount-input'>
					<input
						id='escrow-amount'
						type='number'
						min='0'
						step='0.01'
						value={amount}
						onChange={(event) => setAmount(event.target.value)}
						aria-label='Deposit amount'
					/>
					<div className='currency-select'>
						<button type='button' aria-label='Flip currency direction'>
							<svg viewBox='0 0 24 24' aria-hidden='true'>
								<path d='M8 5h12m0 0-3-3m3 3-3 3M16 19H4m0 0 3-3m-3 3 3 3' />
							</svg>
						</button>
						<select value={currency} onChange={(event) => setCurrency(event.target.value as CurrencyOption['value'])}>
							{currencyOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='escrow-hint'>
					<span>Available: 3.5 ETH</span>
					<span>Estimated Gas Fee: ~0.002 ETH</span>
				</div>
				<div className='escrow-actions'>
					<button type='submit' className='primary-blue full'>Deposit to Escrow</button>
				</div>
			</form>
		</section>
	);
};

export default EscrowCard;
