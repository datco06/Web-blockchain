import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../../Freelancer/components/topbar';

const aiTopFreelancers = [
	{
		name: 'Alex Rivera',
		role: 'Senior UI Designer',
		bid: '$1,200',
		bidType: 'Total Fixed',
		experience: '8+ years',
		portfolio: '#',
		match: 98,
		avatar: 'AR',
	},
	{
		name: 'Taylor Chen',
		role: 'Product Architect',
		bid: '$1,500',
		bidType: 'Estimated Project',
		experience: '6+ years',
		portfolio: '#',
		match: 92,
		avatar: 'TC',
	},
	{
		name: 'Jordan Smith',
		role: 'UX Researcher',
		bid: '$950',
		bidType: 'Weekly Rate',
		experience: '4+ years',
		portfolio: '#',
		match: 85,
		avatar: 'JS',
	},
	{
		name: 'Morgan Lee',
		role: 'UI Specialist',
		bid: '$1,100',
		bidType: 'Fixed Budget',
		experience: '5+ years',
		portfolio: '#',
		match: 82,
		avatar: 'ML',
	},
];

const FreelancerFinder = () => (
	<div className='buyer-shell'>
		<Sidebar active='freelancers' />
		<main className='buyer-main'>
			<TopBar active='dashboard' />
			<div className='buyer-content freelancer-content'>
				<section className='overview-header'>
					<div>
						<p className='eyebrow'>Find freelancers</p>
						<h1>Browse curated pitches powered by TrustFlow AI.</h1>
					</div>
				</section>

				<section className='talent-table'>
					<form className='talent-filters'>
						<label>
							<span>Specialty</span>
							<select defaultValue='design'>
								<option value='design'>Product Design</option>
								<option value='frontend'>Front-end Development</option>
								<option value='backend'>Backend / API</option>
								<option value='ai'>AI &amp; Data</option>
							</select>
						</label>
						<label>
							<span>Experience</span>
							<select defaultValue='senior'>
								<option value='mid'>3+ years</option>
								<option value='senior'>5+ years</option>
								<option value='lead'>8+ years</option>
							</select>
						</label>
						<button type='button' className='search-btn'>
							Find talent
						</button>
					</form>
					<div className='talent-tabs'>
						<button type='button' className='active'>
							All (24)
						</button>
						<button type='button'>In Progress (8)</button>
						<button type='button'>Completed (5)</button>
					</div>
					<div className='table-wrapper'>
						<div className='table-head'>
							<span>Freelancer</span>
							<span>Bid Amount</span>
							<span>Experience</span>
							<span>Portfolio</span>
							<span>AI Match Score</span>
							<span />
						</div>
						<ul>
							{aiTopFreelancers.map((talent) => (
								<li key={talent.name}>
									<div className='freelancer'>
										<div className='avatar'>{talent.avatar}</div>
										<div>
											<strong>{talent.name}</strong>
											<p>{talent.role}</p>
										</div>
									</div>
									<div className='bid'>
										<strong>{talent.bid}</strong>
										<span>{talent.bidType}</span>
									</div>
									<div className='experience'>{talent.experience}</div>
									<div className='portfolio'>
										<a href={talent.portfolio}>View Portfolio</a>
									</div>
									<div className='match'>
										<div className='bar'>
											<span style={{ width: `${talent.match}%` }} />
										</div>
										<strong>{talent.match}%</strong>
									</div>
									<div className='action'>
										<button type='button'>Hire</button>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>
			</div>
		</main>
	</div>
);

export default FreelancerFinder;
