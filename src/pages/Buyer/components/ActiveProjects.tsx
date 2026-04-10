interface Project {
	title: string;
	freelancer: string;
	status: 'in-progress' | 'revision';
	statusLabel: string;
	milestone: string;
	progress: number;
	budget: string;
	icon: 'globe' | 'api';
}

const iconMap: Record<Project['icon'], JSX.Element> = {
	globe: (
		<svg viewBox='0 0 24 24'>
			<circle cx='12' cy='12' r='9' />
			<path d='M3 12h18' />
			<path d='M12 3a15 15 0 0 1 0 18' />
			<path d='M12 3a15 15 0 0 0 0 18' />
		</svg>
	),
	api: (
		<svg viewBox='0 0 24 24'>
			<path d='M4 7h16v10H4z' />
			<path d='M7 10h3v4H7z' />
			<path d='M14 10h3' />
			<path d='M14 14h3' />
		</svg>
	),
};

const ActiveProjects = ({ projects }: { projects: Project[] }) => (
	<section className='active-projects'>
		<header>
			<h2>Active Projects</h2>
			<button type='button'>View All</button>
		</header>
		<div className='project-list'>
			{projects.map((project) => (
				<div key={project.title} className='project-card'>
					<div className='project-header'>
						<div className='project-icon'>{iconMap[project.icon]}</div>
						<div>
							<h3>{project.title}</h3>
							<p>
								Freelancer: <strong>{project.freelancer}</strong>
							</p>
						</div>
						<span className={`status ${project.status}`}>{project.statusLabel}</span>
					</div>
					<div className='project-meta'>
						<span>{project.milestone}</span>
						<span>Budget {project.budget}</span>
					</div>
					<div className='progress'>
						<div className='bar' style={{ width: `${project.progress}%` }} />
					</div>
				</div>
			))}
		</div>
	</section>
);

export type { Project };
export default ActiveProjects;
