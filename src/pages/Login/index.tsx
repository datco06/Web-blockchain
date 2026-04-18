import './index.less';
import LoginForm from './components/LoginForm';

// ── SVG Icons ──────────────────────────────────────────────────────────────
const IconEye = () => (
  <svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
    <circle cx='12' cy='12' r='3' />
  </svg>
);

const IconRobot = () => (
  <svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='3' y='11' width='18' height='10' rx='2' />
    <circle cx='12' cy='5' r='2' />
    <path d='M12 7v4' />
    <line x1='8' y1='16' x2='8' y2='16' />
    <line x1='16' y1='16' x2='16' y2='16' />
  </svg>
);

const LoginPage = () => (
	<div className='login-shell'>
		<aside className='login-hero'>
			<div className='hero-brand'>
				<div className='hero-logo'>TF</div>
				<div>
					<strong>TrustFlow</strong>
					<span>Secure workspace</span>
				</div>
			</div>
			<div className='hero-copy'>
				<h1>Welcome back to TrustFlow.</h1>
				<p>Continue managing your projects, milestones, and escrow payouts from one secure dashboard.</p>
			</div>
			
			<div className='hero-stats'>
				<div className='stat-card'>
					<div className='stat-icon'><IconEye /></div>
					<div>
						<h4>Live Visibility</h4>
						<p>Track every contract instantly.</p>
					</div>
				</div>
				<div className='stat-card'>
					<div className='stat-icon'><IconRobot /></div>
					<div>
						<h4>AI Assistance</h4>
						<p>Automated dispute resolution.</p>
					</div>
				</div>
			</div>

			<footer className='hero-footer'>Need an account? <a href='/sign-in'>Create one</a>.</footer>
		</aside>
		<section className='login-panel'>
			<LoginForm />
		</section>
	</div>
);

export default LoginPage;
