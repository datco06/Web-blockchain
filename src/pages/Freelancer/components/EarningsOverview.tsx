import './EarningsOverview.less';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
const values = [40, 65, 95, 55, 70, 60];

const EarningsOverview = () => (
	<section className='card chart-card'>
		<header className='card-header'>
			<h3>Earnings Overview</h3>
			<select>
				<option>Last 6 Months</option>
				<option>Last 12 Months</option>
			</select>
		</header>
		<div className='chart-bars'>
			{values.map((height, index) => (
				<div key={months[index]} className='chart-bar'>
					<div className='bar' style={{ height: `${height}%` }} />
					<span>{months[index]}</span>
				</div>
			))}
		</div>
	</section>
);

export default EarningsOverview;
