import { Tabs } from 'antd';
import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../../Freelancer/components/topbar';
import ActiveProjects, { Project } from '../components/ActiveProjects';

const { TabPane } = Tabs;

const MOCK_PROJECTS: Project[] = [
	{
		title: 'E-commerce UI/UX Design Redesign',
		freelancer: 'Sarah Jenkins',
		status: 'in-progress',
		statusLabel: 'In Progress',
		milestone: 'Milestone 2/4',
		progress: 75,
		budget: '$2,400',
		icon: 'globe',
	},
	{
		title: 'API Integration for Payment Gateway',
		freelancer: 'Marco Rossi',
		status: 'revision',
		statusLabel: 'Revision',
		milestone: 'Milestone 1/1',
		progress: 90,
		budget: '$850',
		icon: 'api',
	},
	{
		title: 'Smart Contract Audit',
		freelancer: 'David Lee',
		status: 'completed',
		statusLabel: 'Completed',
		milestone: 'Milestone 3/3',
		progress: 100,
		budget: '$5,000',
		icon: 'api',
	}
];

const ProjectManagement = () => {

	const inProgressProjects = MOCK_PROJECTS.filter(p => p.status === 'in-progress' || p.status === 'revision');
	const completedProjects = MOCK_PROJECTS.filter(p => p.status === 'completed');

	return (
		<div className='buyer-shell'>
			<Sidebar active='projects' />
			<main className='buyer-main'>
				<TopBar active='dashboard' />
				<div className='buyer-content project-content'>
					<section className='overview-header'>
						<div>
							<p className='eyebrow'>Project management</p>
							<h1>Track every project across its lifecycle.</h1>
						</div>
					</section>

					<div className='list-project project-tabs-container'>
						<Tabs defaultActiveKey='all' size="large" className="custom-project-tabs">
							<TabPane tab='All project' key='all'>
								<ActiveProjects projects={MOCK_PROJECTS} />
							</TabPane>
							<TabPane tab='In Progress' key='in-progress'>
								<ActiveProjects projects={inProgressProjects} />
							</TabPane>
							<TabPane tab='Completed' key='completed'>
								<ActiveProjects projects={completedProjects} />
							</TabPane>
						</Tabs>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ProjectManagement;
