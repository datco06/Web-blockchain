import type { OverviewStat } from '@/services/buyer/overview/typing';

const iconMap: Record<OverviewStat['icon'], JSX.Element> = {
	jobs: (
		<svg viewBox='0 0 24 24'>
			<path d='M4 7h16v12H4z' />
			<path d='M9 7V5h6v2' />
			<path d='M4 12h16' />
		</svg>
	),
	proposals: (
		<svg viewBox='0 0 24 24'>
			<path d='M6 3h9l5 5v13H6z' />
			<path d='M15 3v6h5' />
		</svg>
	),
	escrow: (
		<svg viewBox='0 0 24 24'>
			<circle cx='12' cy='12' r='8' />
			<path d='M8 12h8' />
			<path d='M12 8v8' />
		</svg>
	),
	messages: (
		<svg viewBox='0 0 24 24'>
			<path d='M4 5h16v12H7l-3 3z' />
		</svg>
	),
};

const OverviewCards = ({ stats }: { stats: OverviewStat[] }) => (
	<div className='overview-cards'>
		{stats.map((stat) => (
			<div key={stat.key} className={`overview-card ${stat.tone ?? ''}`}>
				<div className='card-icon'>{iconMap[stat.icon]}</div>
				<div className='card-body'>
					<p className='label'>{stat.label}</p>
					<strong>{stat.value}</strong>
				</div>
				{stat.chip && <span className='chip'>{stat.chip}</span>}
			</div>
		))}
	</div>
);

export default OverviewCards;
