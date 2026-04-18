import { FormEvent } from 'react';
import { useModel } from 'umi';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/topbar';
import './index.less';

const Earnings = () => {
	const {
		payoutCards,
		paymentMethods,
		nextPayout,
		supportLinks,
		selectedMethod,
		setSelectedMethod,
		amount,
		setAmount,
		availableBalance,
		fee,
		total,
		exceedsBalance,
		canSubmit,
		selectedMethodMeta,
		formatCurrency,
	} = useModel('freelancer.earnings');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<div className='profile-shell earnings-shell'>
			<aside className='profile-sidebar'>
				<Sidebar active='earnings' />
			</aside>
			<main className='profile-main earnings-main'>
				<TopBar active='earnings' />
				<div className='profile-content earnings-layout'>
					<div className='profile-left'>
						<section className='earnings-hero'>
							<div>
								<p className='eyebrow'>Balance overview</p>
								<h1>Get paid on your terms.</h1>
								<p className='muted'>
									Choose a payout method, preview fees instantly, and send funds to your wallet or bank.
								</p>
							</div>
							<button type='button' className='ghost ghost-outline'>
								<svg viewBox='0 0 24 24' aria-hidden='true'>
									<path d='M6 12h12' />
									<path d='m12 6 6 6-6 6' />
								</svg>
								Payout history
							</button>
						</section>

						<div className='earnings-cards'>
							{payoutCards.map((card) => (
								<div key={card.key} className='earnings-card'>
									<div className='card-head'>
										<p className='label'>{card.label}</p>
										<span className='chip'>{card.badge}</span>
									</div>
									<strong className='value'>{formatCurrency(card.amount)}</strong>
									<p className='description'>{card.description}</p>
								</div>
							))}
						</div>

						<section className='withdrawal-section'>
							<div className='section-header'>
								<div>
									<p className='eyebrow'>Withdraw funds</p>
									<h2>Send money to your account</h2>
									<p className='muted'>Pick a payment method and enter an amount to see the exact payout.</p>
								</div>
								<button type='button' className='ghost'>
									<svg viewBox='0 0 24 24' aria-hidden='true'>
										<path d='M6 19v-6m0 0L3 16m3-3 3 3' />
										<path d='M18 5v6m0 0 3-3m-3 3-3-3' />
									</svg>
									Switch method
								</button>
							</div>
							<form className='withdraw-form' onSubmit={handleSubmit}>
								<div className='form-column'>
									<label className='field-label'>Payment method</label>
									<div className='method-list'>
										{paymentMethods.map((method) => (
											<label
												key={method.id}
												className={`method-card ${selectedMethod === method.id ? 'active' : ''}`}
											>
												<input
													type='radio'
													name='payment-method'
													value={method.id}
													checked={selectedMethod === method.id}
													onChange={(event) => setSelectedMethod(event.target.value)}
												/>
												<div>
													<strong>{method.label}</strong>
													<p>{method.details}</p>
												</div>
												<span className='badge'>{method.network}</span>
											</label>
										))}
									</div>
									{selectedMethodMeta && (
										<p className='method-helper'>
											Transfers to <strong>{selectedMethodMeta.label}</strong> typically arrive within 1–3 minutes.
										</p>
									)}
								</div>
								<div className='form-column'>
									<label className='field-label' htmlFor='withdraw-amount'>
										Amount to withdraw
									</label>
									<div className='amount-input'>
										<span>Ξ</span>
											<input
												id='withdraw-amount'
												type='number'
												min='0'
												step='50'
												value={amount}
												onChange={(event) => setAmount(event.target.value)}
												placeholder='0.00'
											/>
									</div>
									<p className='helper'>
										Available to withdraw: <strong>{formatCurrency(availableBalance)}</strong>
									</p>
									{exceedsBalance && <p className='helper error'>Amount exceeds available balance.</p>}
									<div className='fee-breakdown'>
										<div>
											<span>Processing fee (2.5%)</span>
											<strong>{formatCurrency(fee)}</strong>
										</div>
										<div>
											<span>Total after fee</span>
											<strong>{formatCurrency(total)}</strong>
										</div>
									</div>
									<button type='submit' className='primary withdraw-btn' disabled={!canSubmit}>
										Withdraw now
									</button>
								</div>
							</form>
						</section>
					</div>
						<div className='profile-right earnings-side'>
							<div className='side-card next-payout'>
								<p className='eyebrow'>Next automatic payout</p>
								<strong>{formatCurrency(nextPayout.amount)}</strong>
								<p className='muted'>{nextPayout.date}</p>
								<span className='chip'>{nextPayout.status}</span>
							</div>
							<div className='side-card support-card'>
								<h4>Need help?</h4>
								<ul>
									{supportLinks.map((link) => (
										<li key={link.label}>
											<a href={link.href}>{link.label}</a>
										</li>
									))}
								</ul>
							</div>
						</div>
				</div>
			</main>
		</div>
	);
};

export default Earnings;
