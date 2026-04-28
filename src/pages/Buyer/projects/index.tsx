import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../components/topbar';
import ActiveProjects from '../components/ActiveProjects';
import type { Project } from '@/services/buyer/projects/typing';
import { ProjectStatus } from '@/services/buyer/projects/typing';

import { useModel } from 'umi';

const { TabPane } = Tabs;
const ProjectManagement = () => {
    const { projects, setProjects } = useModel('buyer.projects.index');

    useEffect(() => {
        const pushed = JSON.parse(localStorage.getItem('pushed_projects') || '[]');
        if (pushed.length > 0) {
            setProjects([...pushed, ...projects]);
        }
    }, []);

	const inProgressProjects = projects?.filter((p: Project) => p.status === ProjectStatus.InProgress || p.status === ProjectStatus.Revision || p.status === ProjectStatus.Active) || [];
	const completedProjects = projects?.filter((p: Project) => p.status === ProjectStatus.Completed) || [];

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
