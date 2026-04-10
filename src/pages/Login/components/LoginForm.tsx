import { FormEvent, useState } from 'react';
import './LoginForm.less';
import { history, useLocation } from 'umi';

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
		</form>
	);
};

export default LoginForm;
