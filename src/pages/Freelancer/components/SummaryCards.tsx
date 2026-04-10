import './SummaryCards.less';

interface SummaryCard {
	label: string;
	value: string;
	change?: string;
	status: 'positive' | 'steady' | 'pending';
	icon: 'earnings' | 'deals' | 'escrow';
}

interface SummaryCardsProps {
	cards: SummaryCard[];
}

const iconMap: Record<SummaryCard['icon'], JSX.Element> = {
	earnings: (
		<svg viewBox='0 0 24 24'>
			<circle cx='12' cy='12' r='9' />
			<path d='M12 7v10M9 10s1 2 3 2 3 2 3 2' />
		</svg>
	),
	deals: (
		<svg viewBox='0 0 24 24'>
			<path d='M4 8h6l4 8h6' />
			<circle cx='7' cy='8' r='2' />
			<circle cx='17' cy='16' r='2' />
		</svg>
	),
	escrow: (
		<svg viewBox='0 0 24 24'>
			<rect x='6' y='5' width='12' height='14' rx='2' />
			<path d='M10 9h4M10 13h4' />
		</svg>
	),
};

const SummaryCards = ({ cards }: SummaryCardsProps) => (
	<div className='summary-cards'>
		{cards.map((card) => (
			<article key={card.label} className={`summary-card ${card.status}`}>
				<div className={`card-icon ${card.icon}`}>{iconMap[card.icon]}</div>
				<div className='card-body'>
					<span className='card-label'>{card.label}</span>
					<strong className='card-value'>{card.value}</strong>
				</div>
				{card.change && (
					<span className={`card-badge ${card.status}`}>
						{card.change}
					</span>
				)}
			</article>
		))}
	</div>
);

export default SummaryCards;
