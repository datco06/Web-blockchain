import './index.less';
import LoginForm from './components/LoginForm';

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
			<ul className='hero-list'>
				<li>Live visibility into every contract.</li>
				<li>Instant dispute assistance powered by AI.</li>
				<li>Secure, audited smart-contract releases.</li>
			</ul>
			<footer>Need an account? <a href='/sign-in'>Create one</a>.</footer>
		</aside>
		<section className='login-panel'>
			<LoginForm />
		</section>
	</div>
);

export default LoginPage;
