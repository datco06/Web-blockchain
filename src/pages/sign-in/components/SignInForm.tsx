import { useState, type FormEvent } from 'react';
import { history, Link } from 'umi';
import { registerUser } from '@/models/Sgin-In';
import type { SignUpFormValues } from '@/services/Sigin-in/typing.d';

interface SignInFormProps {
  title?: string;
}

const SignInForm = ({ title = 'Sign in to TrustFlow' }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'freelancer',
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = registerUser(formValues);

    if (result.success) {
      setStatusMessage('Registration successful! Redirecting to login…');
      setTimeout(() => history.push(`/login?next=${formValues.role}`), 1500);
    } else {
      setError(result.error ?? 'Registration failed.');
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
            onChange={(e) => setFormValues((prev) => ({ ...prev, role: e.target.value as 'freelancer' | 'buyer' }))}
          />
          <span>I'm a freelancer</span>
        </label>
        <label>
          <input
            type='radio'
            name='role'
            value='buyer'
            checked={formValues.role === 'buyer'}
            onChange={(e) => setFormValues((prev) => ({ ...prev, role: e.target.value as 'freelancer' | 'buyer' }))}
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
      {error && <p className='signup-error'>{error}</p>}
    </form>
  );
};

export default SignInForm;
