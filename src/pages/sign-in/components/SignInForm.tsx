import { useState, type FormEvent } from 'react';
import { history, Link } from 'umi';

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
	});
	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const demoUser = {
			name: `${formValues.firstName} ${formValues.lastName}`.trim(),
			email: formValues.email,
			password: formValues.password,
		};

		localStorage.setItem('tf-demo-user', JSON.stringify(demoUser));
		setStatusMessage('Bạn đã đăng ký thành công! Đang chuyển sang trang đăng nhập…');
		setTimeout(() => history.push('/login?next=buyer'), 1500);
	};

	return (
		<form className='signin-form' onSubmit={handleSubmit}>
			<div className='form-header'>
				<h2>{title}</h2>
				<p>
					Already have an account? <Link to = '/Login'>Log in</Link>
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
				<button type='button'>Google</button>
				<button type='button'>GitHub</button>
			</div>

			<div className='form-badges'>
				<span>🔒 SSL Secure</span>
				<span>🛡 GDPR Ready</span>
			</div>
		</form>
	);
};

export default SignInForm;
