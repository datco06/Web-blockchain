import './index.less';
import { history } from 'umi';

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

const platformImages = {
	dashboard: '/images/dashboard-visual.svg',
	workspace: '/images/workspace-card.svg',
	escrow: '/images/escrow-chip.svg',
};

const IndexPage = () => (
	<div className='trustflow-landing'>
		<header className='landing-nav'>
			<div className='nav-brand'>
				<div className='brand-icon'>TF</div>
				<span>TrustFlow</span>
			</div>
		
			<div className='nav-cta'>
				<a className='link' href='/sign-in'>
					Sign In
				</a>
				<a className='btn primary' href='/login?next=buyer'>
					Hire Talent
				</a>
				<a className='btn ghost' href='/login?next=freelancer'>
					Work as Freelancer
				</a>
			</div>
		</header>

		<section className='hero'>
			<div className='hero-text'>
				<div className='tag chip'>Secure On-Chain Escrow</div>
				<h1>
					Hire Global Talent with <span>AI-Guided</span> Escrow
				</h1>
				<p>
					TrustFlow helps buyers and freelancers manage deals, milestones, AI-assisted collaboration, and secure on-chain payments in one modern workspace.
				</p>
				<div className='hero-actions'>
					<button className='btn primary' onClick={() => history.push('/login?next=buyer')}>Hire Talent Now</button>
					<button className='btn light' onClick={()=> history.push('/login?next=freelancer')}>Work as Freelancer</button>
				</div>
			</div>
			<div className='hero-visual'>
				<div className='workspace-card'>
					<div className='window-dots'>
						<span />
						<span />
						<span />
					</div>
					<div className='milestone-panel'>
						<div>
							<p className='label'>Milestone 2</p>
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
									<span />
									<span />
									<span />
								</div>
								<div className='mini-progress'>
									<div />
								</div>
								<div className='mini-pill'>92%</div>
							</div>
						</div>
					</div>
				</div>
				<div className='floating-chip'>
					<span className='pulse' />
					Contract signed · Smart contract verified
				</div>
			</div>
		</section>

		<section className='workflow'>
			<h2>Streamlined Collaboration</h2>
			<p>Clear regulations help reduce disputes and ensure quality with AI-assisted milestones.</p>
			<div className='workflow-grid'>
				{workflowSteps.map((step) => (
					<article key={step.title}>
						<div className='icon-bubble'>{step.icon}</div>
						<small>{step.step}</small>
						<h3>{step.title}</h3>
						<p>{step.description}</p>
					</article>
				))}
			</div>
		</section>

		<section className='feature-band'>
			<div className='feature-band__header'>
				<div>
					<p>Built for the future of work.</p>
					<h2>
						Secured <span>by code.</span>
					</h2>
				</div>
				
			</div>
			<div className='feature-grid'>
				{featureHighlights.map((item) => (
					<article key={item.title} className='feature-card'>
						<div className='feature-icon'>{item.icon}</div>
						<div>
							<h4>{item.title}</h4>
							<p>{item.description}</p>
						</div>
					</article>
				))}
			</div>
		</section>

		<section className='platform'>
			<div className='eyebrow'>INSIDE THE PLATFORM</div>
			<h2>One workspace, full transparency.</h2>
			<div className='platform-grid'>
				<article className='platform-card platform-card--hero'>
					<div>
						<h3>Buyer Dashboard</h3>
						<p>Oversee every project, escrow, and freelancer performance in real time.</p>
					</div>
					<div className='platform-media dashboard'>
						<img src={platformImages.dashboard} alt='Dashboard preview with KPI donut' loading='lazy' />
					</div>
				</article>
				<article className='platform-card platform-card--workspace'>
					<div>
						<h3>Deal Workspace</h3>
						<p>Chat, share files, and manage milestones with AI helpers.</p>
					</div>
					<div className='platform-media workspace'>
						<img src={platformImages.workspace} alt='Workspace board mockup' loading='lazy' />
					</div>
				</article>
				<article className='platform-card platform-card--escrow'>
					<div>
						<h3>Escrow Tracking</h3>
						<p>Transparent tracking of all funds currently secured in smart contracts.</p>
					</div>
					<div className='platform-media escrow'>
						<img src={platformImages.escrow} alt='Escrow stats chip' loading='lazy' />
					</div>
				</article>
			</div>
		</section>

		<footer className='landing-footer'>
			<div className='footer-brand'>
				<div className='brand-icon solid'>TF</div>
				<div>
					<strong>TrustFlow</strong>
					<p>© {new Date().getFullYear()} TrustFlow Inc. All rights reserved.</p>
				</div>
			</div>
			<div className='footer-nav'>
				
			</div>
			<div className='footer-socials'>
				<button type='button' aria-label='Contact support'>
					<IconAt />
				</button>
				<button type='button' aria-label='Global site'>
					<IconGlobe />
				</button>
			</div>
		</footer>
	</div>
);

export default IndexPage;
