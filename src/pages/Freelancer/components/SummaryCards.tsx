import { Card, Col, ConfigProvider, Row, Statistic } from 'antd';
import type { ThemeConfig } from 'antd';
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

const SummaryCards = ({ cards }: SummaryCardsProps) => {
	const themeConfig: ThemeConfig = {
		token: {
			borderRadiusLG: 16,
			colorBorder: 'transparent',
		},
		components: {
			Card: {
				paddingLG: 20,
			},
			Statistic: {
				titleFontSize: 14,
				titleColor: '#6a768f',
				contentFontSize: 28,
				contentFontWeight: 700,
			},
		},
	};

	return (
		<ConfigProvider theme={themeConfig}>
			<div className='summary-cards'>
				<Row gutter={[20, 20]}>
					{cards.map((card) => (
						<Col key={card.label} xs={24} sm={12} xl={8}>
							<Card
								className={`summary-card ${card.status}`}
								bodyStyle={{ padding: 20 }}
								style={{
									borderRadius: 16,
									boxShadow: '0 24px 45px rgba(15, 23, 42, 0.08)',
								}}
							>
								<Statistic
									title={card.label}
									value={card.value}
									prefix={<span className={`stat-icon ${card.icon}`}>{iconMap[card.icon]}</span>}
								/>
								{card.change && (
									<span className={`card-badge ${card.status}`}>
										{card.change}
									</span>
								)}
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</ConfigProvider>
	);
};

export default SummaryCards;
