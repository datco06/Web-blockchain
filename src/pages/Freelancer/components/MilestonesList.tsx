import './MilestonesList.less';

interface Milestone {
	title: string;
	subtitle: string;
	amount: string;
	statusText: string;
	statusType: 'warning' | 'success';
	avatar: string;
}

interface MilestonesListProps {
	items: Milestone[];
}

const MilestonesList = ({ items }: MilestonesListProps) => (
	<section className='card milestones-card'>
		<header className='card-header'>
			<div>
				<h3>Active Milestones</h3>
				<p>Track progress for your active deals.</p>
			</div>
			<button type='button' className='link'>
				View All
			</button>
		</header>
		<div className='milestone-list'>
			{items.map((item) => (
				<article key={item.title} className='milestone-item'>
					<div className='milestone-avatar'>{item.avatar}</div>
					<div className='milestone-body'>
						<h4>{item.title}</h4>
						<p>{item.subtitle}</p>
					</div>
					<div className='milestone-amount'>
						<strong>{item.amount}</strong>
						<span className={item.statusType}>{item.statusText}</span>
					</div>
					<span className='chevron'>›</span>
				</article>
			))}
		</div>
	</section>
);

export default MilestonesList;
