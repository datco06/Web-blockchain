import './index.less';
import SignInForm from './components/SignInForm';

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
				<p className='hero-kicker'>Data integrity</p>
				<h1>Data integrity you can depend on.</h1>
				<p>
					Join over 10,000+ companies securing their digital assets with our industry-leading verification flow.
				</p>
			</div>

			<div className='hero-stats'>
				<div className='stat-card'>
					<div className='stat-icon shield' />
					<div>
						<h4>99.9% Security</h4>
						<p>Enterprise-grade protection</p>
					</div>
				</div>
				<div className='stat-card'>
					<div className='stat-icon rocket' />
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
