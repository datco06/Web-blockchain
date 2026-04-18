import './RightRail.less';

interface Job {
	type: string;
	timestamp: string;
	title: string;
	description: string;
	budget: string;
}

interface RightRailProps {
	jobs: Job[];
}

const RightRail = ({ jobs }: RightRailProps) => (
	<div className='right-rail'>
		<section className='right-module profile-strength'>
			<p className='label'>Profile Strength</p>
			<h3>Expert</h3>
			<div className='progress-track'>
				<div className='progress-bar' style={{ width: '85%' }} />
			</div>
			<p className='metadata'>Your profile visibility is up by 40% this week. Add a new portfolio item to hit 100%.</p>
			<button className='portfolio-btn'>Update Portfolio</button>
		</section>

		<section className='right-module'>
			<div className='module-header'>
				<h3>Jobs You Might Like</h3>
			</div>
			<div className='jobs-list'>
				{jobs.map((job) => (
					<article key={job.title} className='job-item'>
						<div className='job-info'>
							<h4>{job.title}</h4>
							<p className='metadata'>{job.description}</p>
						</div>
						<div className='job-meta'>
							<strong>{job.budget}</strong>
							<span>{job.type}</span>
						</div>
					</article>
				))}
			</div>
			<button className='portfolio-btn outline' style={{marginTop: '16px', border: '1px solid #E6E8EA', background: 'transparent'}}>
				Browse All Jobs
			</button>
		</section>
	</div>
);

export default RightRail;
