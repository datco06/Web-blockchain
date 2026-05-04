import { FormEvent, useState } from 'react';
import { useLocation } from 'umi';
import { loginUser, getRedirectPath } from '@/models/Sgin-In';
import { history } from 'umi';
import type { LoginFormValues } from '@/services/Sigin-in/typing.d';

const LoginForm = () => {
  const { search } = useLocation();
  const next = new URLSearchParams(search).get('next')?.toLowerCase() || 'buyer';

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = loginUser(formValues.email, formValues.password);

    if (result.success && result.user) {
      history.push(getRedirectPath(next));
    } else {
      setError(result.error ?? 'Login failed.');
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
          value={formValues.email}
          onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
        />
      </label>

      <label>
        Password
        <input
          type='password'
          placeholder='••••••••'
          required
          value={formValues.password}
          onChange={(event) => setFormValues((prev) => ({ ...prev, password: event.target.value }))}
        />
      </label>

      {error && <p className='login-error'>{error}</p>}

      <button type='submit'>Continue</button>
    </form>
  );
};

export default LoginForm;
