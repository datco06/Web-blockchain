import './rightpanels.less';
import { FormEvent, useState } from 'react';
import { useModel } from 'umi';

const RightPanels = () => {
	const {

		walletAddress,
		setWalletAddress,
		links,
		addLink,
		isEditing,
	} = useModel('freelancer.profile.index');

	const [linkInput, setLinkInput] = useState('');

	const handleLinkSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!linkInput.trim()) return;
		addLink(linkInput);
		setLinkInput('');
	};

	return (
		<div className='profile-panels'>
			<section className='panel wallet-card'>
				<div className='panel-header'>
					<h4>Payout Wallet</h4>
				</div>
				<p className='wallet-label'>Default Address (ERC-20)</p>
				<div className='wallet-address-container'>
					{isEditing ? (
						<input
							type='text'
							className='in-place-input'
							value={walletAddress}
							placeholder='Enter your ERC-20 address'
							onChange={(e) => setWalletAddress(e.target.value)}
						/>
					) : (
						<div className='wallet-address'>
							{walletAddress || (
								<span className='wallet-empty'>No address on file.</span>
							)}
						</div>
					)}
				</div>
			</section>

			<section className='panel links-card'>
				<div className='panel-header'>
					<h4>Portfolio Links</h4>
				</div>
				<div className='links-content'>
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
						!isEditing && <p className='wallet-empty'>No portfolio links yet.</p>
					)}

					{isEditing && (
						<div className='add-link-inplace'>
							<form onSubmit={handleLinkSubmit}>
								<input
									type='text'
									className='in-place-input'
									value={linkInput}
									onChange={(e) => setLinkInput(e.target.value)}
									placeholder='e.g. dribbble.com/yourname'
								/>
								<button type='submit' className='primary-mini'>Add</button>
							</form>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default RightPanels;
