import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../components/topbar';
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
        description: 'Redesign the entire user experience for a high-traffic e-commerce platform.',
        category: 'Product Design',
        requirements: 'Figma, React, UX Research'
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
        description: 'Implement a secure payment gateway integration using Stripe and PayPal APIs.',
        category: 'Backend',
        requirements: 'Node.js, Stripe API, Security'
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
        description: 'Comprehensive audit of smart contracts for a new DeFi protocol.',
        category: 'Security',
        requirements: 'Solidity, Slither, MythX'
	}
];

const ProjectManagement = () => {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

    useEffect(() => {
        // Load from localStorage
        const pushed = JSON.parse(localStorage.getItem('pushed_projects') || '[]');
        if (pushed.length > 0) {
            setProjects([...pushed, ...MOCK_PROJECTS]);
        }
    }, []);

	const inProgressProjects = projects.filter(p => p.status === 'in-progress' || p.status === 'revision' || p.status === 'active');
	const completedProjects = projects.filter(p => p.status === 'completed');

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
								<ActiveProjects projects={projects} />
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
