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
		<section className='profile-card'>
			<p>Profile Strength</p>
			<h3>Expert</h3>
			<div className='progress'>
				<div className='bar' />
			</div>
			<p>Your profile visibility is up by 40% this week. Add a new portfolio item to hit 100%.</p>
			<button>Update Portfolio</button>
		</section>

		<section className='jobs-card'>
			<header>
				<h3>Jobs You Might Like</h3>
			</header>
			<div className='jobs-list'>
				{jobs.map((job) => (
					<article key={job.title}>
						<div className='job-meta'>
							<span className='pill'>{job.type}</span>
							<span className='time'>{job.timestamp}</span>
						</div>
						<h4>{job.title}</h4>
						<p>{job.description}</p>
						<strong>{job.budget}</strong>
					</article>
				))}
			</div>
			<button className='outline'>Browse All Jobs</button>
		</section>
	</div>
);

export default RightRail;
