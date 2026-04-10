import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../../Freelancer/components/topbar';
import EscrowCard from '../components/EscrowCard';

type ReleaseStatus = 'released' | 'pending' | 'scheduled';

interface ReleaseItem {
	id: string;
	title: string;
	due: string;
	amount: string;
	status: ReleaseStatus;
	statusLabel: string;
}

const releasePlan: ReleaseItem[] = [
	{
		id: 'm1',
		title: 'Milestone 1 - Research Sprint',
		due: 'Released on March 29, 2026',
		amount: '0.40 ETH',
		status: 'released',
		statusLabel: 'Released',
	},
	{
		id: 'm2',
		title: 'Milestone 2 - UX Wireframes',
		due: 'Due April 05, 2026',
		amount: '0.65 ETH',
		status: 'pending',
		statusLabel: 'Awaiting Approval',
	},
	{
		id: 'm3',
		title: 'Milestone 3 - UI Kit Delivery',
		due: 'Scheduled for April 14, 2026',
		amount: '0.55 ETH',
		status: 'scheduled',
		statusLabel: 'Scheduled',
	},
];

const EscrowWorkspace = () => (
	<div className='buyer-shell'>
		<Sidebar active='escrow' />
		<main className='buyer-main'>
			<TopBar />
			<div className='buyer-content escrow-page'>
				<section className='overview-header'>
					<div>
						<p className='eyebrow'>Escrow workspace</p>
						<h1>Fund deposits, approve milestones, and release payouts.</h1>
					</div>
				</section>

				<div className='escrow-layout'>
					<div className='escrow-column'>
						<EscrowCard />

						<section className='card-panel release-panel'>
							<header>
								<div>
									<span className='eyebrow'>Release schedule</span>
									<h3>Milestones & payouts</h3>
								</div>
								<button type='button'>Add milestone</button>
							</header>
							<ul className='release-list'>
								{releasePlan.map((item) => (
									<li key={item.id} className='release-item'>
										<div>
											<strong>{item.title}</strong>
											<p>{item.due}</p>
										</div>
										<div className='release-meta'>
											<span className='amount'>{item.amount}</span>
											<span className={`release-status ${item.status}`}>{item.statusLabel}</span>
										</div>
									</li>
								))}
							</ul>
							<p className='secure-note'>
								TrustFlow keeps funds locked until you and the freelancer sign off. You can edit the schedule any time
								before approval without extra fees.
							</p>
						</section>
					</div>
				</div>
			</div>
		</main>
	</div>
);

export default EscrowWorkspace;
