import { List, Tag } from 'antd';
import { history } from 'umi';
import './ActiveProjects.less';

type ProjectStatus = 'in-progress' | 'revision' | 'completed' | 'active';

interface Project {
    title: string;
    freelancer?: string;
    status: ProjectStatus;
    statusLabel: string;
    milestone?: string;
    progress?: number;
    budget: string;
    icon?: 'globe' | 'api';
    description?: string;
    duration?: string;
    requirements?: string;
    category?: string;
    postDate?: string;
    bids?: number;
    milestones?: any[];
}

const statusTagColor: Record<ProjectStatus, string> = {
    'in-progress': 'blue',
    revision: 'gold',
    completed: 'green',
    'active': 'processing'
};

const ActiveProjects = ({ projects }: { projects: Project[] }) => {
    const handleProjectClick = (project: Project) => {
        history.push({
            pathname: '/buyer/project-detail',
            state: { project }
        });
    };

    return (
        <section className='active-projects'>
            <header>
                <h2>Project management</h2>
            </header>
            <List
                className='project-list'
                dataSource={projects}
                itemLayout='vertical'
                split={true}
                rowKey={(project) => project.title + (project.postDate || '')}
                renderItem={(project: Project) => (
                    <List.Item style={{ padding: '24px 0' }}>
                        <div className='project-card-v2'>
                            <div className='project-main-info'>
                                <div className='title-row'>
                                    <h3
                                        className='project-title-v2'
                                        onClick={() => handleProjectClick(project)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {project.title}
                                    </h3>
                                    <Tag color={statusTagColor[project.status]}>{project.statusLabel}</Tag>
                                </div>

                                <div className='project-meta-v2'>
                                    {project.postDate && `Posted on ${project.postDate}`}
                                </div>

                                <div className='project-description-snippet'>
                                    {project.description || 'No detailed description for this project.'}
                                </div>

                                <div className='project-tags-v2'>
                                    {project.category && <span className='tag-link'>{project.category}</span>}
                                    {project.requirements?.split(',').map((req, i) => (
                                        <span key={i} className='tag-link'>{req.trim()}</span>
                                    ))}
                                </div>
                            </div>

                            <div className='project-side-info'>
                                <div className='budget-box'>
                                    <strong>{project.budget}</strong>
                                    <span>Budget</span>
                                </div>

                                {project.duration && (
                                    <div className='duration-info'>
                                        <span className='deadline-label'>Expected Deadline:</span>
                                        <strong className='deadline-value'>{project.duration}</strong>
                                    </div>
                                )}
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </section>
    );
};

export type { Project };
export default ActiveProjects;
