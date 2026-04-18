import './rightpanels.less';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useModel } from 'umi';

const RightPanels = () => {
	const {
		workHistory,
		walletAddress,
		setWalletAddress,
		links,
		addLink,
	} = useModel('freelancer.profile.index');

	const [showWalletForm, setShowWalletForm] = useState(false);
	const [newWalletAddress, setNewWalletAddress] = useState('');
	const [showLinkForm, setShowLinkForm] = useState(false);
	const [linkInput, setLinkInput] = useState('');

	const handleWalletSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!newWalletAddress.trim()) return;
		setWalletAddress(newWalletAddress.trim());
		setShowWalletForm(false);
	};

	const handleLinkSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addLink(linkInput);
		setLinkInput('');
		setShowLinkForm(false);
	};

	return (
		<div className='profile-panels'>
			<section className='panel wallet-card'>
				<div className='panel-header'>
					<h4>Payout Wallet</h4>
				</div>
				<p className='wallet-label'>Default Address (ERC-20)</p>
				<div className='wallet-address'>
					{walletAddress || (
						<span className='wallet-empty'>No address on file. Add one to receive payouts.</span>
					)}
				</div>
				<button
					className='ghost'
					onClick={() => {
						setNewWalletAddress(walletAddress);
						setShowWalletForm(true);
					}}
				>
					Change Wallet
				</button>
				{showWalletForm && (
					<div className='payout-form'>
						<form onSubmit={handleWalletSubmit}>
							<label htmlFor='wallet-address-input'>
								New Address
								<input
									id='wallet-address-input'
									type='text'
									required
									value={newWalletAddress}
									onChange={(event: ChangeEvent<HTMLInputElement>) => setNewWalletAddress(event.target.value)}
								/>
							</label>
							<div className='form-actions'>
								<button
									type='button'
									className='ghost'
									onClick={() => {
										setShowWalletForm(false);
										setNewWalletAddress(walletAddress);
									}}
								>
									Cancel
								</button>
								<button type='submit' className='primary'>
									Save
								</button>
							</div>
						</form>
					</div>
				)}
			</section>

			<section className='panel links-card'>
				<div className='panel-header'>
					<h4>Portfolio Links</h4>
				</div>
				{links.length ? (
					<ul>
						{links.map((link) => (
							<li key={link} className='custom-link'>
								<span className='icon custom'>🔗</span>
								<a href={link.startsWith('http') ? link : `https://${link}`} target='_blank' rel='noreferrer'>
									{link}
								</a>
							</li>
						))}
					</ul>
				) : (
					<p className='wallet-empty'>No portfolio links yet. Add one below.</p>
				)}
				<button className='link-button' onClick={() => setShowLinkForm(true)}>
					+ Connect Account
				</button>
				{showLinkForm && (
					<div className='link-form'>
						<form onSubmit={handleLinkSubmit}>
							<label>
								New Link
								<input
									type='text'
									required
									value={linkInput}
									onChange={(event: ChangeEvent<HTMLInputElement>) => setLinkInput(event.target.value)}
									placeholder='e.g. dribbble.com/yourname'
								/>
							</label>
							<div className='form-actions'>
								<button type='button' className='ghost' onClick={() => setShowLinkForm(false)}>
									Cancel
								</button>
								<button type='submit' className='primary'>
									Add Link
								</button>
							</div>
						</form>
					</div>
				)}
			</section>

			<section className='panel history-card'>
				<div className='panel-header'>
					<h4>Work History</h4>
					<a className='link-button'>See All History</a>
				</div>
				<ul>
					{workHistory.map((item) => (
						<li key={item.title}>
							<div>
								<h5>{item.title}</h5>
								<p>{item.amount}</p>
							</div>
							<span className='badge'>{item.type}</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default RightPanels;
