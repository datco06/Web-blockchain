import './index.less';
import { useModel } from 'umi';
import Sidebar from './components/Sidebar';
import TopBar from './components/topbar';
import SummaryCards from './components/SummaryCards';
import MilestonesList from './components/MilestonesList';
import EarningsOverview from './components/EarningsOverview';
import RightRail from './components/RightRail';

const Freelancer = () => {
	const { summaryCards } = useModel('freelancer.summary.index');
	const { milestones }   = useModel('freelancer.milestones.index');
	const { jobs, freelancerName } = useModel('freelancer.jobs.index');

	return (
		<div className='dashboard-shell'>
			<Sidebar active='dashboard' />
			<main className='freelancer-main'>
				<TopBar active='dashboard' />
				<div className='dashboard-content'>
					<div className='content-left'>
						<section className='welcome'>
							<div>
								<h1>Welcome back, {freelancerName}! 👋</h1>
								<p className='muted'>
									You've reached <strong>85%</strong> of your monthly goal. Keep it up!
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
};

export default Freelancer;
