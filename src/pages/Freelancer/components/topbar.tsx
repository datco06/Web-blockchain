import './topbar.less';

interface TopBarProps {
	active?: 'dashboard' | 'profile' | 'earnings';
}

const TopBar = (_props: TopBarProps) => (
	<header className='topbar'>
		<div className='topbar-brand'>
			<div className='brand-icon'>TF</div>
			<div>
				<strong>TrustFlow</strong>
				<span>Talent Dashboard</span>
			</div>
		</div>
		<div className='topbar-search'>
			<svg viewBox='0 0 24 24' aria-hidden='true'>
				<path d='M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm8 16-4.35-4.35' />
			</svg>
			<input type='text' placeholder='Search jobs, clients...' />
		</div>
		<div className='topbar-actions'>
			<button className='icon-btn bell' aria-label='Notifications'>
				<svg viewBox='0 0 24 24' aria-hidden='true'>
					<path d='M18 16v-4a6 6 0 1 0-12 0v4l-1.5 2.5h15z' />
					<path d='M10 21h4' />
				</svg>
				<span className='dot' />
			</button>
			<button className='icon-btn settings' aria-label='Settings'>
				<svg viewBox='0 0 24 24' aria-hidden='true'>
					<circle cx='12' cy='12' r='1.5' />
					<path d='M19.4 15a7.81 7.81 0 0 0 .1-6l2.1-1.7-2-3.4-2.5 1a8.08 8.08 0 0 0-5.8 0l-2.5-1-2 3.4 2.1 1.7a7.81 7.81 0 0 0 0 6L4.7 16.7l2 3.4 2.5-1a8.08 8.08 0 0 0 5.8 0l2.5 1 2-3.4Z' />
				</svg>
			</button>
			<div className='avatar'>
				<span>AX</span>
			</div>
		</div>
	</header>
);

export default TopBar;
