import './index.less';
import Sidebar from './components/sidebar';
import TopBar from '../Freelancer/components/topbar';
import OverviewCards, { OverviewStat } from './components/OverviewCards';
import ActiveProjects, { Project } from './components/ActiveProjects';
import RecentMessages, { Message } from './components/RecentMessages';

const overviewStats: OverviewStat[] = [
	{ key: 'jobs', label: 'Active Jobs', value: '12', chip: '+2 this week', icon: 'jobs', tone: 'positive' },
	{ key: 'proposals', label: 'Proposals', value: '24', chip: '8 pending', icon: 'proposals', tone: 'warning' },
	{ key: 'escrow', label: 'Escrow Balance', value: '$4,250.00', chip: 'Secure', icon: 'escrow', tone: 'secure' },
	{ key: 'messages', label: 'Messages', value: '156', chip: '3 unread', icon: 'messages', tone: 'info' },
];

const projects: Project[] = [
	{
		title: 'E-commerce UI/UX Design Redesign',
		freelancer: 'Sarah Jenkins',
		status: 'in-progress',
		statusLabel: 'In Progress',
		milestone: 'Milestone 2/4',
		progress: 75,
		budget: '$2,400',
		icon: 'globe',
	},
	{
		title: 'API Integration for Payment Gateway',
		freelancer: 'Marco Rossi',
		status: 'revision',
		statusLabel: 'Revision',
		milestone: 'Milestone 1/1',
		progress: 90,
		budget: '$850',
		icon: 'api',
	},
];

const messages: Message[] = [
	{ name: 'Sarah Jenkins', time: '12:45 PM', snippet: 'I’ve uploaded the latest wireframes...', avatar: 'SJ' },
	{ name: 'Alex Thompson', time: 'Yesterday', snippet: 'The proposal looks good. Can we schedule a call?', avatar: 'AT' },
	{ name: 'Michael Chen', time: 'Oct 24', snippet: 'Payment received. Thank you for the swift approval.', avatar: 'MC' },
];

const Buyer = () => (
	<div className='buyer-shell'>
		<Sidebar />
		<main className='buyer-main'>
			<TopBar />
			<div className='buyer-content'>
				<section className='overview-header'>
					<div>
						<p className='eyebrow'>Buyer Overview</p>
						<h1>Manage your active projects and upcoming milestones.</h1>
					</div>
					<a className='primary link-button' href='/buyer/post-job'>
						+ Post a New Job
					</a>
				</section>
				<OverviewCards stats={overviewStats} />
				<div className='buyer-grid'>
					<ActiveProjects projects={projects} />
					<div className='buyer-right'>
						<RecentMessages messages={messages} />
					</div>
				</div>
			</div>
		</main>
	</div>
);

export default Buyer;
