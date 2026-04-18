import { useState, type FormEvent } from 'react';
import { history, Link } from 'umi';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';


const firebaseConfig = {
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
	projectId: "YOUR_PROJECT_ID",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface SignInFormProps {
	title?: string;
}

const SignInForm = ({ title = 'Sign in to TrustFlow' }: SignInFormProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const [formValues, setFormValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		role: 'freelancer',
	});
	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const demoUser = {
			name: `${formValues.firstName} ${formValues.lastName}`.trim(),
			email: formValues.email,
			password: formValues.password,
			role: formValues.role,
		};

		localStorage.setItem('tf-demo-user', JSON.stringify(demoUser));
		setStatusMessage('Bạn đã đăng ký thành công! Đang chuyển sang trang đăng nhập…');
		setTimeout(() => history.push('/login?next=buyer'), 1500);
	};

	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);

			const demoUser = {
				name: result.user.displayName,
				email: result.user.email,
				role: formValues.role,
			};
			localStorage.setItem('tf-demo-user', JSON.stringify(demoUser));

			setStatusMessage('Đăng nhập Google thành công! Đang chuyển trang...');
			setTimeout(() => history.push('/login?next=buyer'), 1500);
		} catch (error) {
			console.error("Lỗi đăng nhập Google", error);
			setStatusMessage('Đăng nhập Google thất bại. Vui lòng kiểm tra console.');
		}
	};

	const handleGithubLogin = async () => {
		try {
			const provider = new GithubAuthProvider();
			const result = await signInWithPopup(auth, provider);

			const demoUser = {
				name: result.user.displayName || result.user.email?.split('@')[0],
				email: result.user.email,
				role: formValues.role,
			};
			localStorage.setItem('tf-demo-user', JSON.stringify(demoUser));

			setStatusMessage('Đăng nhập GitHub thành công! Đang chuyển trang...');
			setTimeout(() => history.push('/login?next=buyer'), 1500);
		} catch (error) {
			console.error("Lỗi đăng nhập GitHub", error);
			setStatusMessage('Đăng nhập GitHub thất bại. Vui lòng kiểm tra console.');
		}
	};

	return (
		<form className='signin-form' onSubmit={handleSubmit}>
			<div className='form-header'>
				<h2>{title}</h2>
				<p>
					Already have an account? <Link to='/Login'>Log in</Link>
				</p>
			</div>

			<div className='form-grid'>
				<label>
					First Name
					<input
						type='text'
						placeholder='Jane'
						required
						value={formValues.firstName}
						onChange={(event) =>
							setFormValues((prev) => ({ ...prev, firstName: event.target.value }))
						}
					/>
				</label>
				<label>
					Last Name
					<input
						type='text'
						placeholder='Doe'
						required
						value={formValues.lastName}
						onChange={(event) =>
							setFormValues((prev) => ({ ...prev, lastName: event.target.value }))
						}
					/>
				</label>
			</div>
			<div className='role-select'>
				<label>
					<input
						type='radio'
						name='role'
						value='freelancer'
						checked={formValues.role === 'freelancer'}
						onChange={(e) => setFormValues(prev => ({ ...prev, role: e.target.value }))}
					/>
					<span>I'm a freelancer</span>
				</label>
				<label>
					<input
						type='radio'
						name='role'
						value='buyer'
						checked={formValues.role === 'buyer'}
						onChange={(e) => setFormValues(prev => ({ ...prev, role: e.target.value }))}
					/>
					<span>I'm a buyer</span>
				</label>
			</div>

			<label>
				Work Email
				<input
					type='email'
					placeholder='jane@company.com'
					required
					value={formValues.email}
					onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
				/>
			</label>

			<label className='password-field'>
				Password
				<div className='password-input'>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder='••••••••'
						required
						value={formValues.password}
						onChange={(event) =>
							setFormValues((prev) => ({ ...prev, password: event.target.value }))
						}
					/>
					<button type='button' aria-label='Toggle password visibility' onClick={() => setShowPassword((prev) => !prev)}>
						{showPassword ? '🙈' : '👁'}
					</button>
				</div>
				<small>Must be at least 8 characters with one special symbol.</small>
			</label>

			<label className='tos'>
				<input type='checkbox' required />
				<span>
					I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>.
				</span>
			</label>

			<button type='submit' className='primary'>
				Create account
			</button>
			{statusMessage && <p className='signup-status'>{statusMessage}</p>}

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

export default SignInForm;
