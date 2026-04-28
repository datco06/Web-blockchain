import './index.less';
import '../index.less';
import { useModel, history } from 'umi';
import { Progress, Tag, Empty, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/topbar';
import type { ActiveJob } from '@/services/freelancer/active-jobs/typing.d';
import { JobStatus } from '@/services/freelancer/jobs/typing.d';

const statusConfig: Record<
  JobStatus,
  { color: string; tagColor: string; label: string; progressColor: string }
> = {
  [JobStatus.InProgress]: {
    color: '#1677ff',
    tagColor: 'blue',
    label: 'In Progress',
    progressColor: '#1677ff',
  },
  [JobStatus.Revision]: {
    color: '#faad14',
    tagColor: 'gold',
    label: 'Revision',
    progressColor: '#faad14',
  },
  [JobStatus.Completed]: {
    color: '#0ECB81',
    tagColor: 'success',
    label: 'Completed',
    progressColor: '#0ECB81',
  },
  [JobStatus.Active]: {
    color: '#F0B90B',
    tagColor: 'warning',
    label: 'Active',
    progressColor: '#F0B90B',
  },
};

const TABS = [
  { key: 'all', label: 'All Projects' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
];

const ActiveJobCard = ({ job }: { job: ActiveJob }) => {
  const cfg = statusConfig[job.status] ?? statusConfig[JobStatus.InProgress];

  return (
    <div className="aj-card" style={{ cursor: 'pointer' }} onClick={() => history.push(`/freelancer/active-jobs/detail/${job.id}`)}>
      <div className="aj-card-header">
        <div className="aj-card-title-group">
          <span className="aj-card-category">{job.category}</span>
          <h3 className="aj-card-title">{job.title}</h3>
          <p className="aj-card-client">Client: <strong>{job.client}</strong></p>
        </div>
        <Tag color={cfg.tagColor} className="aj-status-tag">
          {cfg.label}
        </Tag>
      </div>

      <p className="aj-card-description">{job.description}</p>

      <div className="aj-progress-section">
        <div className="aj-progress-meta">
          <span className="aj-progress-label">Progress</span>
          <span className="aj-progress-pct" style={{ color: cfg.color }}>
            {job.progress}%
          </span>
        </div>
        <Progress
          percent={job.progress}
          showInfo={false}
          strokeColor={cfg.progressColor}
          trailColor="#E6E8EA"
          strokeLinecap="round"
          size={['100%', 8] as any}
        />
      </div>

      <div className="aj-card-footer">
        <div className="aj-dates">
          <span className="aj-date-item">
            <span className="aj-date-label">Started</span>
            <span className="aj-date-value">{job.startDate}</span>
          </span>
          <span className="aj-date-separator">→</span>
          <span className="aj-date-item">
            <span className="aj-date-label">Deadline</span>
            <span className="aj-date-value">{job.deadline}</span>
          </span>
        </div>
        <div className="aj-budget">
          <span className="aj-budget-label">Budget</span>
          <strong className="aj-budget-value">{job.budget}</strong>
        </div>
      </div>
    </div>
  );
};

const ActiveJobs = () => {
  const { activeJobs = [], allActiveJobs = [], activeTab, setActiveTab, searchQuery, setSearchQuery } =
    useModel('freelancer.active-jobs.index' as any);

  const allCount = allActiveJobs.length;
  const inProgressCount = allActiveJobs.filter(
    (j: ActiveJob) =>
      j.status === JobStatus.InProgress ||
      j.status === JobStatus.Revision ||
      j.status === JobStatus.Active
  ).length;
  const completedCount = allActiveJobs.filter(
    (j: ActiveJob) => j.status === JobStatus.Completed
  ).length;

  const badgeCounts: Record<string, number> = {
    all: allCount,
    'in-progress': inProgressCount,
    completed: completedCount,
  };

  return (
    <div className="dashboard-shell">
      <Sidebar active="active-jobs" />
      <main className="freelancer-main">
        <TopBar active="active-jobs" />
        <div className="aj-page-container">
          <section className="aj-page-header">
            <div>
              <p className="eyebrow">Work management</p>
              <h1>Your active projects &amp; deliverables.</h1>
            </div>
          </section>

          {/* Controls: Tabs & Search */}
          <div className="aj-controls">
            <div className="aj-tab-bar">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`aj-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                  <span className="aj-tab-badge">{badgeCounts[tab.key]}</span>
                </button>
              ))}
            </div>

            <div className="aj-search-bar">
              <Input
                placeholder="Search active jobs by name..."
                prefix={<SearchOutlined rev="" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="aj-search-input"
              />
            </div>
          </div>

          {activeJobs.length === 0 ? (
            <Empty
              className="aj-empty"
              description={
                activeTab === 'completed'
                  ? 'No completed projects yet.'
                  : 'No active projects at the moment.'
              }
            />
          ) : (
            <div className="aj-grid">
              {activeJobs.map((job: ActiveJob) => (
                <ActiveJobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ActiveJobs;