import './index.less';
import SignInForm from './components/SignInForm';

// ── SVG Icons ──────────────────────────────────────────────────────────────
const IconShield = () => (
  <svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
  </svg>
);

const IconLightning = () => (
  <svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
  </svg>
);

const SignInPage = () => (
	<div className='signin-shell'>
		<aside className='signin-hero'>
			<div className='hero-brand'>
				<div className='hero-logo'>TF</div>
				<div>
					<strong>TrustFlow</strong>
					<span>Secure workspace</span>
				</div>
			</div>

			<div className='hero-copy'>
				<h1>Data integrity you can depend on.</h1>
				<p>
					Join over 10,000+ companies securing their digital assets with our industry-leading verification flow and smart-contract escrow.
				</p>
			</div>

			<div className='hero-stats'>
				<div className='stat-card'>
					<div className='stat-icon'><IconShield /></div>
					<div>
						<h4>99.9% Security</h4>
						<p>Enterprise-grade protection</p>
					</div>
				</div>
				<div className='stat-card'>
					<div className='stat-icon'><IconLightning /></div>
					<div>
						<h4>Fast Integration</h4>
						<p>API ready in minutes</p>
					</div>
				</div>
			</div>

			<footer className='hero-footer'>© 2024 TrustFlow Technologies Inc. All rights reserved.</footer>
		</aside>

		<section className='signin-panel'>
			<SignInForm />
		</section>
	</div>
);

export default SignInPage;
