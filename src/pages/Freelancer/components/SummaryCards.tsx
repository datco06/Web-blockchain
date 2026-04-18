import type { ReactNode } from 'react';
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

const iconMap: Record<SummaryCard['icon'], ReactNode> = {
	earnings: (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'>
			<circle cx='12' cy='12' r='9' />
			<path d='M12 7v10M9 10s1 2 3 2 3 2 3 2' />
		</svg>
	),
	deals: (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'>
			<path d='M4 8h6l4 8h6' />
			<circle cx='7' cy='8' r='2' />
			<circle cx='17' cy='16' r='2' />
		</svg>
	),
	escrow: (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'>
			<rect x='6' y='5' width='12' height='14' rx='2' />
			<path d='M10 9h4M10 13h4' />
		</svg>
	),
};

const getIconColor = (icon: string) => {
	switch (icon) {
		case 'earnings': return 'blue'; // styled as Yellow/Orange in our specific less mapping
		case 'deals': return 'purple';
		case 'escrow': return 'orange';
		default: return 'blue';
	}
};

const SummaryCards = ({ cards }: SummaryCardsProps) => {
	return (
		<div className='summary-grid'>
			{cards.map((card) => (
				<div key={card.label} className='summary-card'>
					<div className={`card-icon ${getIconColor(card.icon)}`}>
						{iconMap[card.icon]}
					</div>
					<div className='card-info'>
						<span>{card.label}</span>
						<h3>{card.value}</h3>
						{card.change && (
							<div className={`trend ${card.status === 'positive' ? 'up' : 'down'}`}>
								{card.status === 'positive' ? (
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
										<path d='M5 15l7-7 7 7' />
									</svg>
								) : (
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
										<path d='M19 9l-7 7-7-7' />
									</svg>
								)}
								{card.change}
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default SummaryCards;
