import { useLocation, history } from 'umi';
import { Button, Tag } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined, DollarOutlined, ClockCircleOutlined, CheckCircleFilled, StarFilled } from '@ant-design/icons';
import ToolBar from '../../components/topbar';
import SideBar from '../../components/Sidebar';
import { MOCK_CLIENT_INFO, MOCK_APPLICANT_COUNT } from '@/services/freelancer/job-detail';
import { JobStatus } from '@/services/freelancer/jobs/typing.d';
import './index.less';

const JobDetail = () => {
    const location = useLocation();
    const { project } = (location.state as any) || {};



    const handleBack = () => {
        history.push('/freelancer/find-jobs');
    };

    if (!project) {
        return (
            <div className='freelancer-shell'>
                <SideBar active='find-jobs' />
                <main className='freelancer-main'>
                    <ToolBar active='find-jobs' />
                    <div style={{ padding: 40, textAlign: 'center' }}>
                        <h2 style={{ color: '#0f172a' }}>Project not found</h2>
                        <Button type="primary" onClick={handleBack} style={{ marginTop: 16, backgroundColor: '#f3ba2f', borderColor: '#f3ba2f', color: '#fff' }}>
                            Back to Find Jobs
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        [JobStatus.Active]: '#f5222d',
        [JobStatus.InProgress]: '#1890ff',
        [JobStatus.Revision]: '#faad14',
        [JobStatus.Completed]: '#52c41a'
    };

    return (
        <div className='freelancer-shell'>
            <SideBar active='find-jobs' />
            <main className='freelancer-main'>
                <ToolBar active='find-jobs' />

                <div className='project-content'>
                    <div className='project-nav'>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined rev="" />}
                            onClick={handleBack}
                            className="back-btn"
                        >
                            Back to results
                        </Button>
                    </div>

                    <div className='project-header'>
                        <p className='eyebrow'>Job Details</p>
                        <h1>{project.title}</h1>
                    </div>

                    <div className='project-body'>
                        <div className='project-left'>
                            <div className='detail-card'>
                                <div className='detail-header-row'>
                                    <Tag color={statusColors[project.status] || '#f3ba2f'} className='status-tag'>
                                        {project.statusLabel || project.status.toUpperCase()}
                                    </Tag>
                                </div>

                                <div className='post-date'>
                                    Posted {project.postDate}
                                </div>

                                <div className='info-grid'>
                                    <div className='info-item'>
                                        <div className='label'><DollarOutlined rev="" /> Budget</div>
                                        <div className='value'>{project.budget}</div>
                                    </div>
                                    <div className='info-item'>
                                        <div className='label'><ClockCircleOutlined rev="" /> Level</div>
                                        <div className='value'>{project.level || 'Expert'}</div>
                                    </div>
                                    <div className='info-item'>
                                        <div className='label'><EnvironmentOutlined rev="" /> Location</div>
                                        <div className='value'>{project.location || 'Remote'}</div>
                                    </div>
                                </div>

                                <div className='section-divider' />

                                <div className='section'>
                                    <h3 className='section-title'>Job Description</h3>
                                    <p className='description-text'>{project.description}</p>
                                </div>

                                {project.requirements && project.requirements.length > 0 && (
                                    <div className='section' style={{ marginTop: 32 }}>
                                        <h3 className='section-title'>Technical Requirements</h3>
                                        <div className='requirements-list'>
                                            {project.requirements.map((req: string, index: number) => (
                                                <span key={index} className='requirement-tag'>{req}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='project-right'>
                            <div className='side-card applicants-card'>
                                <span className='count'>{MOCK_APPLICANT_COUNT}</span>
                                <span className='label'>Freelancers Applied</span>
                            </div>

                            <div className='side-card'>
                                <h3 className='side-card-title'>About the Client</h3>
                                <div className='client-info-box'>
                                    <div className='client-name'>
                                        {MOCK_CLIENT_INFO.name} {MOCK_CLIENT_INFO.verified && <CheckCircleFilled style={{ color: '#52c41a', fontSize: 14 }} rev="" />}
                                    </div>

                                    <div className='client-stats'>
                                        <div className='stat-item'>
                                            <span className='stat-label'>Rating</span>
                                            <span className='stat-value'>
                                                <StarFilled style={{ color: '#f3ba2f' }} rev="" /> {MOCK_CLIENT_INFO.rating}
                                            </span>
                                        </div>
                                        <div className='stat-item'>
                                            <span className='stat-label'>Job Success Rate</span>
                                            <span className='stat-value'>{MOCK_CLIENT_INFO.successRate}</span>
                                        </div>
                                        <div className='stat-item'>
                                            <span className='stat-label'>Location</span>
                                            <span className='stat-value'>{MOCK_CLIENT_INFO.location}</span>
                                        </div>
                                        <div className='stat-item'>
                                            <span className='stat-label'>Total Spent</span>
                                            <span className='stat-value'>{MOCK_CLIENT_INFO.totalSpent}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='apply-section'>
                                    <Button className='apply-now-btn' type="primary">
                                        Apply for this job
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobDetail;
