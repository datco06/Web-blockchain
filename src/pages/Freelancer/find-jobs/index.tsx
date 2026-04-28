import './index.less';
import { useModel, history } from 'umi';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/topbar';
import { Input, Tag, Button, Empty, Popover, List } from 'antd';
import { SearchOutlined, EnvironmentOutlined, FilterOutlined } from '@ant-design/icons';
import type { Job } from '@/services/freelancer/jobs/typing.d';
import { JobStatus } from '@/services/freelancer/jobs/typing.d';

const statusColors: Record<string, string> = {
    [JobStatus.Active]: '#f5222d',
    [JobStatus.InProgress]: '#1890ff',
    [JobStatus.Revision]: '#faad14',
    [JobStatus.Completed]: '#52c41a'
};

const FindJobs = () => {
    const modelData = useModel('freelancer.jobs.index' as any);
    const handleProjectClick = (project: Job) => {
        history.push({
            pathname: '/freelancer/detail',
            state: { project }
        });
    };

    const {
        jobs = [],
        niches = [],
        selectedNiche,
        setSelectedNiche,
        setSearchQuery
    } = modelData;

    const nicheContent = (
        <div className='niche-popover-content'>
            {niches.map((niche: string) => (
                <Button
                    key={niche}
                    onClick={() => setSelectedNiche(niche)}
                    className={`niche-btn ${selectedNiche === niche ? 'active' : ''}`}
                >
                    {niche}
                </Button>
            ))}
        </div>
    );

    return (
        <div className='dashboard-shell'>
            <Sidebar active='find-jobs' />
            <main className='freelancer-main'>
                <TopBar active='find-jobs' />
                <div className='dashboard-content freelancer-content'>
                    <section className='overview-header'>
                        <div>
                            <p className='eyebrow'>Job discovery</p>
                            <h1>Find the perfect match for your expertise.</h1>
                        </div>
                    </section>

                    <div className='search-filter-section'>
                        <div className='search-row'>
                            <Input
                                placeholder='Search for jobs (e.g. React, Solidity...)'
                                prefix={<SearchOutlined rev="" />}
                                size='large'
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='search-input'
                            />
                            <Popover
                                content={nicheContent}
                                title="Select Category"
                                trigger="click"
                                placement="bottomRight"
                            >
                                <Button
                                    size='large'
                                    icon={<FilterOutlined rev="" />}
                                    className={`lĩnh-vực-btn ${selectedNiche !== 'All' ? 'active' : ''}`}
                                >
                                    Categories
                                </Button>
                            </Popover>
                        </div>
                    </div>

                    <div className='job-list-container'>
                        <List
                            className='project-list'
                            dataSource={jobs}
                            itemLayout='vertical'
                            split={true}
                            renderItem={(job: Job) => (
                                <List.Item style={{ padding: '24px 0' }}>
                                    <div className='project-card-v2'>
                                        <div className='project-main-info'>
                                            <div className='title-row'>
                                                <h3 className='project-title-v2' onClick={() => handleProjectClick(job)} style={{ cursor: 'pointer' }}>{job.title}</h3>
                                                <Tag color={statusColors[job.status]} className='status-tag'>{job.statusLabel}</Tag>
                                            </div>

                                            <div className='project-meta-v2'>
                                                Posted on {job.postDate}
                                            </div>

                                            <div className='project-description-snippet'>
                                                {job.description}
                                            </div>

                                            <div className='project-tags-v2'>
                                                <span className='tag-link-v2'>{job.category}</span>
                                            </div>
                                        </div>

                                        <div className='project-side-info'>
                                            <div className='budget-box'>
                                                <strong>{job.budget}</strong>
                                                <span>Budget</span>
                                            </div>
                                            {job.deadline && (
                                                <div className='deadline-section'>
                                                    <span className='deadline-label'>EXPECTED DEADLINE:</span>
                                                    <strong className='deadline-value'>{job.deadline}</strong>
                                                </div>
                                            )}
                                            <div style={{ marginTop: 'auto' }}>
                                                <Button type='default' className='apply-btn'>Apply Job</Button>
                                            </div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                            locale={{
                                emptyText: <Empty className='empty-state' description='No jobs found matching your criteria.' />
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default FindJobs;