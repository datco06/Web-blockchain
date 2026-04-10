import './index.less';
import Sidebar from './components/Sidebar';
import TopBar from './components/topbar';
import SummaryCards from './components/SummaryCards';
import MilestonesList from './components/MilestonesList';
import EarningsOverview from './components/EarningsOverview';
import RightRail from './components/RightRail';

const summaryCards = [
	{ label: 'Total Earnings', value: '$12,450.00', change: '+12.5%', status: 'positive', icon: 'earnings' },
	{ label: 'Active Deals', value: '8 Projects', status: 'steady', icon: 'deals' },
	{ label: 'In Escrow', value: '$3,200.00', status: 'pending', icon: 'escrow' },
];

const milestones = [
	{
		title: 'FinTech App UI Design',
		subtitle: 'Milestone 2 · High-fidelity Wireframes',
		amount: '$1,500',
		statusText: 'Due in 2 days',
		statusType: 'warning',
		avatar: 'G',
	},
	{
		title: 'SaaS Platform Development',
		subtitle: 'Milestone 4 · API Integration',
		amount: '$2,800',
		statusText: 'Submitted',
		statusType: 'success',
		avatar: 'S',
	},
];

const jobs = [
	{
		type: 'Fixed price',
		timestamp: '1h ago',
		title: 'Senior Product Designer (Mobile)',
		description: 'Looking for a seasoned UI/UX specialist...',
		budget: '$4,500 – $6,000',
	},
	{
		type: 'Hourly',
		timestamp: '3h ago',
		title: 'React Native Developer',
		description: 'Need a developer to assist with push notification integration...',
		budget: '$65 – $90/hr',
	},
];

const userName = 'Alex';

const Freelancer = () => (
	<div className='dashboard-shell'>
		<aside className='dashboard-sidebar'>
			<Sidebar active='dashboard' />
		</aside>
		<main className='freelancer-main'>
			<TopBar active='dashboard' />
			<div className='dashboard-content'>
				<div className='content-left'>
					<section className='welcome'>
						<div>
							<h1>Welcome back, {userName}! 👋</h1>
							<p className='muted'>
								You’ve reached <strong>85%</strong> of your monthly goal. Keep it up!
							</p>
						</div>
						<div className='welcome-actions'>
							<button className='ghost'>
								<svg viewBox='0 0 24 24' aria-hidden='true'>
									<path d='M12 5v10' />
									<path d='M8 11l4 4 4-4' />
									<path d='M6 19h12' />
								</svg>
								Statement
							</button>
							<button className='primary'>
								<svg viewBox='0 0 24 24' aria-hidden='true'>
									<circle cx='11' cy='11' r='7' />
									<path d='m16 16 4 4' />
								</svg>
								Find Jobs
							</button>
						</div>
					</section>
					<SummaryCards cards={summaryCards} />
					<MilestonesList items={milestones} />
					<EarningsOverview />
				</div>
				<div className='content-right'>
					<RightRail jobs={jobs} />
				</div>
			</div>
		</main>
	</div>
);

export default Freelancer;
