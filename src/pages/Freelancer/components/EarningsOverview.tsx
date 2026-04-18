import './EarningsOverview.less';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
const values = [40, 65, 95, 55, 70, 60];

const EarningsOverview = () => (
	<section className='earnings-overview'>
		<header className='chart-header'>
			<h3>Earnings Overview</h3>
			<div className='chart-filters'>
				<button className='filter-btn active'>Last 6 Months</button>
				<button className='filter-btn'>Last 12 Months</button>
			</div>
		</header>
		<div className='chart-body'>
			{values.map((height, index) => (
				<div key={months[index]} className='bar-wrapper'>
					<div className='bar' style={{ height: `${height}%`, width: '100%', minHeight: '4px' }} />
					<span className='month'>{months[index]}</span>
				</div>
			))}
		</div>
	</section>
);

export default EarningsOverview;
