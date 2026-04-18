import './index.less';
import Sidebar from './components/sidebar';
import TopBar from './components/topbar';
import OverviewCards from './components/OverviewCards';
import ActiveProjects from './components/ActiveProjects';
import RecentMessages from './components/RecentMessages';

import { rawOverviewStats } from '@/services/buyer/overview';
import { rawProjects } from '@/services/buyer/projects';
import { rawMessages } from '@/services/buyer/messages';

const overviewStats = rawOverviewStats;
const projects      = rawProjects;
const messages      = rawMessages;

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
