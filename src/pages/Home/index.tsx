import './index.less';
import { useState, useRef, useEffect } from 'react';
import { history } from 'umi';
import { Button, Tag, Badge } from 'antd';
import {
  CheckCircleFilled,
  ArrowRightOutlined,
  MailOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

interface StoredUser {
  name: string;
  email: string;
  role: 'freelancer' | 'buyer';
}

const NavAvatar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tf-demo-user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <>
        <a className='nav-link' href='/sign-in'>Sign Up</a>
        <Button className='btn-pill btn-yellow' onClick={() => history.push('/login?next=buyer')}>
          Hire Talent
        </Button>
        <Button className='btn-pill btn-outline' onClick={() => history.push('/login?next=freelancer')}>
          Work as Freelancer
        </Button>
      </>
    );
  }

  const initials = user.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('tf-demo-user');
    setUser(null);
    setOpen(false);
  };

  const dashboardPath = user.role === 'freelancer' ? '/freelancer' : '/buyer';
  const profilePath = user.role === 'freelancer' ? '/freelancer/profile' : '/buyer/profile';

  return (
    <div className='home-avatar-container' ref={ref}>
      <div className='home-avatar' onClick={() => setOpen(!open)} title={user.name || user.email}>
        <span>{initials}</span>
      </div>
      {open && (
        <div className='home-avatar-dropdown'>
          <div className='home-avatar-info'>
            <strong>{user.name || user.email}</strong>
            <small>{user.role === 'freelancer' ? 'Freelancer' : 'Buyer'}</small>
          </div>
          <div className='home-avatar-divider' />
          <ul>
            <li><a href={dashboardPath}>My Dashboard</a></li>
            <li><a href={profilePath}>Account Settings</a></li>
            <li className='home-avatar-divider-item' />
            <li><button type='button' className='home-logout-btn' onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

const IconShield = () => (
  <svg viewBox='0 0 24 24' className='icon'>
    <path d='M12 21c5-2.1 7-4.8 7-9.5V6.2L12 3 5 6.2v5.3C5 16.2 7 18.9 12 21Z' />
    <path d='M9 12.5 11 15l4-5' />
  </svg>
);

const IconWorkflow = () => (
  <svg viewBox='0 0 24 24' className='icon'>
    <rect x='3' y='4' width='7' height='6' rx='1.5' />
    <rect x='14' y='4' width='7' height='6' rx='1.5' />
    <rect x='3' y='14' width='7' height='6' rx='1.5' />
    <path d='M10 7h4M7 10v4M17 10v6' />
  </svg>
);

const IconRobot = () => (
  <svg viewBox='0 0 24 24' className='icon'>
    <rect x='5' y='7' width='14' height='10' rx='4' />
    <circle cx='9' cy='12' r='1.5' />
    <circle cx='15' cy='12' r='1.5' />
    <path d='M12 3v3M7 19v2M17 19v2' />
  </svg>
);

const IconCoins = () => (
  <svg viewBox='0 0 24 24' className='icon'>
    <ellipse cx='12' cy='6' rx='7' ry='3' />
    <path d='M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6' />
    <path d='M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6' />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox='0 0 24 24' className='icon'>
    <circle cx='12' cy='12' r='9' />
    <path d='M3 12h18M12 3c-2 2.5-3 5.7-3 9s1 6.5 3 9c2-2.5 3-5.7 3-9s-1-6.5-3-9Z' />
  </svg>
);

const IconChat = () => (
  <svg viewBox='0 0 24 24' className='icon'>
    <path d='M20 4H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v3l4-3h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z' />
    <path d='M7.5 10h9' />
    <path d='M7.5 6h5' />
  </svg>
);

const IconAt = () => (
  <svg viewBox='0 0 24 24' className='icon'>
    <circle cx='12' cy='12' r='8' />
    <path d='M15.5 8.5v3.5c0 .97-.78 1.75-1.75 1.75S12 12.97 12 12V9.5c0-.83-.67-1.5-1.5-1.5S9 8.67 9 9.5v2c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5V8.5' />
  </svg>
);

const workflowSteps = [
  {
    step: 'STEP 01',
    title: 'Create a Deal',
    description: 'Set project scope, milestones, and invite talent into the escrow workspace.',
    icon: <IconWorkflow />,
  },
  {
    step: 'STEP 02',
    title: 'Fund Escrow',
    description: 'Lock funds inside a smart contract for guaranteed, neutral protection.',
    icon: <IconCoins />,
  },
  {
    step: 'STEP 03',
    title: 'Work with AI',
    description: 'Collaborate with assistants that review deliverables and surface risks early.',
    icon: <IconRobot />,
  },
  {
    step: 'STEP 04',
    title: 'Release Payment',
    description: 'Approve milestones and trigger on-chain settlement instantly.',
    icon: <IconShield />,
  },
];

const featureHighlights = [
  { title: 'AI Deal Assistant', description: 'Context-aware reviews and dispute mediation.', icon: <IconRobot /> },
  { title: 'Smart Contract Escrow', description: 'Funds protected by immutable blockchain logic.', icon: <IconShield /> },
  { title: 'Milestone Workflow', description: 'Break down complex projects into payable chunks.', icon: <IconWorkflow /> },
  { title: 'Dispute Protection', description: 'Hybrid human + AI oversight for fairness.', icon: <IconChat /> },
  { title: 'Global Payments', description: 'Instant payouts in stablecoins or local currency.', icon: <IconGlobe /> },
  { title: 'Unified Workspaces', description: 'Purpose-built spaces for buyers and freelancers.', icon: <IconCoins /> },
];

const stats = [
  { label: 'Total Escrow Volume', value: '$124M+', positive: true },
  { label: 'Smart Contracts', value: '18,400+', positive: true },
  { label: 'Active Freelancers', value: '32,000+', positive: true },
  { label: 'Disputes Resolved', value: '99.2%', positive: true },
];

const IndexPage = () => (
  <div className='tf-landing'>

    <div className='ticker-bar'>
      <div className='ticker-inner'>
        {stats.map((s) => (
          <div className='ticker-item' key={s.label}>
            <span className='ticker-label'>{s.label}</span>
            <span className='ticker-value positive'>{s.value}</span>
            <CheckCircleFilled className='ticker-icon' />
          </div>
        ))}
        {stats.map((s) => (
          <div className='ticker-item' key={s.label + '_2'}>
            <span className='ticker-label'>{s.label}</span>
            <span className='ticker-value positive'>{s.value}</span>
            <CheckCircleFilled className='ticker-icon' />
          </div>
        ))}
      </div>
    </div>

    <header className='tf-nav'>
      <div className='tf-nav__inner'>
        <div className='nav-brand'>
          <div className='brand-mark'>TF</div>
          <span className='brand-name'>TrustFlow</span>
        </div>

        <div className='nav-cta'>
          <NavAvatar />
        </div>
      </div>
    </header>

    <section className='tf-hero'>
      <div className='tf-container'>
        <div className='hero-layout'>

          <div className='hero-text'>
            <Tag className='hero-tag'>Secure On-Chain Escrow</Tag>
            <h1 className='hero-headline'>
              Hire Global Talent with{' '}
              <span className='accent-yellow'>AI-Guided</span> Escrow
            </h1>
            <p className='hero-sub'>
              TrustFlow helps buyers and freelancers manage deals, milestones,
              AI-assisted collaboration, and secure on-chain payments in one modern workspace.
            </p>
            <div className='hero-actions'>
              <Button
                size='large'
                className='btn-pill btn-yellow'
                onClick={() => history.push('/login?next=buyer')}
              >
                Hire Talent Now <ArrowRightOutlined />
              </Button>
              <Button
                size='large'
                className='btn-pill btn-white-outline'
                onClick={() => history.push('/login?next=freelancer')}
              >
                Work as Freelancer
              </Button>
            </div>
          </div>

          <div className='hero-visual'>
            <div className='workspace-card'>
              <div className='window-dots'>
                <span /><span /><span />
              </div>

              <div className='milestone-panel'>
                <div>
                  <p className='label'>MILESTONE 2</p>
                  <h4>High Fidelity Design</h4>
                  <span>Due Oct 23 · $2,600 locked</span>
                </div>
                <div className='status-pill'>In Progress</div>
              </div>

              <div className='escrow-panel'>
                <div>
                  <p>Escrow Status</p>
                  <strong>$12.5k</strong>
                  <span>3 milestones funded</span>
                </div>
                <div className='mini-dashboard'>
                  <div className='mini-card'>
                    <div className='mini-row'>
                      <span /><span /><span />
                    </div>
                    <div className='mini-progress'><div /></div>
                    <div className='mini-pill'>92%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='floating-chip'>
              <Badge status='success' />
              Contract signed · Smart contract verified
            </div>
          </div>

        </div>
      </div>
    </section>

    <section className='tf-workflow tf-section-light'>
      <div className='tf-container'>
        <p className='section-eyebrow'>HOW IT WORKS</p>
        <h2 className='section-title'>Streamlined Collaboration</h2>
        <p className='section-sub'>
          Clear regulations help reduce disputes and ensure quality with AI-assisted milestones.
        </p>
        <div className='workflow-grid'>
          {workflowSteps.map((s, i) => (
            <article key={s.title} className='workflow-card'>
              <div className='wf-icon-wrap'>{s.icon}</div>
              <small className='wf-step'>{s.step}</small>
              <h3 className='wf-title'>{s.title}</h3>
              <p className='wf-desc'>{s.description}</p>
              {i < workflowSteps.length - 1 && (
                <ArrowRightOutlined className='wf-arrow' />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className='tf-features tf-section-dark'>
      <div className='tf-container'>
        <div className='features-header'>
          <div>
            <p className='section-eyebrow light'>PLATFORM CAPABILITIES</p>
            <h2 className='section-title light'>
              Built for the future of work.{' '}
              <span className='accent-yellow'>Secured by code.</span>
            </h2>
          </div>
        </div>
        <div className='features-grid'>
          {featureHighlights.map((item) => (
            <article key={item.title} className='feature-card'>
              <div className='feat-icon-wrap'>{item.icon}</div>
              <div>
                <h4 className='feat-title'>{item.title}</h4>
                <p className='feat-desc'>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className='tf-platform tf-section-light'>
      <div className='tf-container'>
        <p className='section-eyebrow'>INSIDE THE PLATFORM</p>
        <h2 className='section-title'>One workspace, full transparency.</h2>

        <div className='platform-grid'>
          <article className='plat-card plat-card--hero'>
            <div className='plat-info'>
              <h3>Buyer Dashboard</h3>
              <p>Oversee every project, escrow, and freelancer performance in real time.</p>
            </div>
            <div className='plat-visual plat-visual--dashboard'>
              <div className='dash-mock'>
                <div className='dash-top-row'>
                  <div className='dash-kpi'>
                    <span className='kpi-label'>Active Projects</span>
                    <span className='kpi-value'>12</span>
                  </div>
                  <div className='dash-kpi'>
                    <span className='kpi-label'>Escrow Locked</span>
                    <span className='kpi-value accent'>$48k</span>
                  </div>
                  <div className='dash-kpi'>
                    <span className='kpi-label'>Success Rate</span>
                    <span className='kpi-value green'>97%</span>
                  </div>
                </div>
                <div className='dash-bar-chart'>
                  {[60, 80, 45, 90, 70, 95, 55].map((h, i) => (
                    <div key={i} className='dash-bar' style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className='plat-card plat-card--side'>
            <div className='plat-info'>
              <h3>Deal Workspace</h3>
              <p>Chat, share files, and manage milestones with AI helpers.</p>
            </div>
            <div className='plat-visual plat-visual--workspace'>
              <div className='workspace-mock'>
                <div className='msg msg--left'>Review done ✓</div>
                <div className='msg msg--right'>Approve milestone?</div>
                <div className='msg msg--left'>Approved 🚀</div>
              </div>
            </div>
          </article>

          <article className='plat-card plat-card--side'>
            <div className='plat-info'>
              <h3>Escrow Tracking</h3>
              <p>Transparent tracking of all funds currently secured in smart contracts.</p>
            </div>
            <div className='plat-visual plat-visual--escrow'>
              <div className='escrow-mock'>
                <div className='escrow-ring'>
                  <span>$12.5k</span>
                  <small>Secured</small>
                </div>
                <div className='escrow-legend'>
                  <div className='legend-item'><span className='dot yellow' />Locked</div>
                  <div className='legend-item'><span className='dot green' />Released</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className='tf-trust tf-section-dark'>
      <div className='tf-container'>
        <h2 className='section-title light'>Trusted by thousands worldwide</h2>
        <p className='section-sub light'>
          From indie startups to global agencies — TrustFlow secures every deal.
        </p>
        <div className='trust-stats'>
          {stats.map((s) => (
            <div key={s.label} className='trust-stat'>
              <div className='stat-value'>{s.value}</div>
              <div className='stat-label'>{s.label}</div>
            </div>
          ))}
        </div>
        <div className='trust-cta'>
          <Button
            size='large'
            className='btn-pill btn-yellow'
            onClick={() => history.push('/login?next=buyer')}
          >
            Get Started <ArrowRightOutlined />
          </Button>
        </div>
      </div>
    </section>

    <footer className='tf-footer'>
      <div className='tf-container'>
        <div className='footer-inner'>
          <div className='footer-brand'>
            <div className='brand-mark solid'>TF</div>
            <div>
              <strong>TrustFlow</strong>
              <p>© {new Date().getFullYear()} TrustFlow Inc. All rights reserved.</p>
            </div>
          </div>

          <div className='footer-socials'>
            <button type='button' aria-label='Contact support'>
              <MailOutlined className='icon' />
            </button>
            <button type='button' aria-label='Global site'>
              <GlobalOutlined className='icon' />
            </button>
          </div>
        </div>
      </div>
    </footer>

  </div>
);

export default IndexPage;
