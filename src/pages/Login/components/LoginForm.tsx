import { FormEvent, useState } from 'react';
import { history, useLocation } from 'umi';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
	projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginForm = () => {
	const { search } = useLocation();
	const next = new URLSearchParams(search).get('next')?.toLowerCase() || 'buyer';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

		const saved = localStorage.getItem('tf-demo-user');
		if (!saved) {
			setError('Please sign up before logging in.');
			return;
		}

		try {
			const demoUser = JSON.parse(saved) as { email: string; password: string };
			if (demoUser.email !== email || demoUser.password !== password) {
				setError('Incorrect email or password.');
				return;
			}
		} catch (parseError) {
			setError('Stored user data is invalid. Please sign up again.');
			return;
		}

		if (next === 'freelancer') {
			history.push('/freelancer');
		} else {
			history.push('/buyer');
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			
			// Simulate logging them in completely
			const demoUser = {
				name: result.user.displayName,
				email: result.user.email,
				role: 'buyer' // Assumed default if no previous registration found
			};
			localStorage.setItem('tf-demo-user', JSON.stringify(demoUser));
			
			// Auto routing based on URL
			history.push(`/${next}`);
		} catch (err) {
			console.error("Lỗi đăng nhập Google", err);
			setError('Gặp sự cố khi đăng nhập qua Google.');
		}
	};

	const handleGithubLogin = async () => {
		try {
			const provider = new GithubAuthProvider();
			const result = await signInWithPopup(auth, provider);
			
			const demoUser = {
				name: result.user.displayName || result.user.email?.split('@')[0],
				email: result.user.email,
				role: 'buyer'
			};
			localStorage.setItem('tf-demo-user', JSON.stringify(demoUser));
			
			history.push(`/${next}`);
		} catch (err) {
			console.error("Lỗi đăng nhập GitHub", err);
			setError('Gặp sự cố khi đăng nhập qua GitHub.');
		}
	};

	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<h2>Log in</h2>
			<label>
				Email
				<input
					type='email'
					placeholder='you@company.com'
					required
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
			</label>
			<label>
				Password
				<input
					type='password'
					placeholder='••••••••'
					required
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</label>
			{error && <p className='login-error'>{error}</p>}
			<button type='submit'>Continue</button>

			<div className='divider'>
				<span>Or continue with</span>
			</div>

			<div className='social-buttons'>
				<button type='button' onClick={handleGoogleLogin}>Google</button>
				<button type='button' onClick={handleGithubLogin}>GitHub</button>
			</div>
		</form>
	);
};

export default LoginForm;
