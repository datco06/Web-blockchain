import { Avatar, List, Progress, Tag } from 'antd';

type ProjectStatus = 'in-progress' | 'revision' | 'completed';

interface Project {
	title: string;
	freelancer: string;
	status: ProjectStatus;
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

const statusTagColor: Record<ProjectStatus, string> = {
	'in-progress': 'blue',
	revision: 'gold',
	completed: 'green',
};

const getInitials = (name: string) =>
	name
		.split(' ')
		.filter(Boolean)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.join('')
		.slice(0, 2);

const ActiveProjects = ({ projects }: { projects: Project[] }) => (
	<section className='active-projects'>
		<header>
			<h2>Active Projects</h2>
			<button type='button'>View All</button>
		</header>
		<List
			className='project-list'
			dataSource={projects}
			itemLayout='vertical'
			split={false}
			rowKey={(project) => project.title}
			renderItem={(project) => (
				<List.Item style={{ padding: 0, border: 'none', marginBottom: 18 }}>
					<div className='project-card'>
						<div className='project-header'>
							<div className='project-icon'>{iconMap[project.icon]}</div>
							<div className='project-header-content'>
								<div className='project-title-row'>
									<h3>{project.title}</h3>
									<Tag color={statusTagColor[project.status]}>{project.statusLabel}</Tag>
								</div>
								<div className='project-freelancer'>
									<Avatar size={48} className='project-avatar'>
										{getInitials(project.freelancer)}
									</Avatar>
									<div>
										<p>Freelancer</p>
										<strong>{project.freelancer}</strong>
									</div>
								</div>
							</div>
						</div>
						<div className='project-meta'>
							<span>{project.milestone}</span>
							<span>Budget {project.budget}</span>
						</div>
						<Progress
							percent={project.progress}
							showInfo={false}
							className='project-progress'
							strokeWidth={10}
						/>
					</div>
				</List.Item>
			)}
		/>
	</section>
);

export type { Project };
export default ActiveProjects;
