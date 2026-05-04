import { useState } from 'react';
import { history } from 'umi';
import { STORAGE_KEY } from '@/services/Sigin-in';
import type { User, SignUpFormValues, LoginFormValues, AuthResult } from '@/services/Sigin-in/typing.d';

export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const removeUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isLoggedIn = (): boolean => {
  return getUser() !== null;
};

export const registerUser = (values: SignUpFormValues): AuthResult => {
  const user: User = {
    name: `${values.firstName} ${values.lastName}`.trim(),
    email: values.email,
    password: values.password,
    role: values.role,
  };
  saveUser(user);
  return { success: true, user };
};

export const loginUser = (email: string, password: string): AuthResult => {
  const stored = getUser();

  if (!stored) {
    return { success: false, error: 'No account found. Please sign up first.' };
  }

  if (stored.email !== email) {
    return { success: false, error: 'Incorrect email or password.' };
  }

  if (stored.password && stored.password !== password) {
    return { success: false, error: 'Incorrect email or password.' };
  }

  return { success: true, user: stored };
};

export const logoutUser = (): void => {
  removeUser();
};

export const getRedirectPath = (role: string): string => {
  return role === 'freelancer' ? '/freelancer' : '/buyer';
};

export const getProfilePath = (role: string): string => {
  return role === 'freelancer' ? '/freelancer/profile' : '/buyer/profile';
};

export const getUserInitials = (user: User): string => {
  if (user.name) {
    return user.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return user.email.slice(0, 2).toUpperCase();
};

export default function useAuthModel() {
  const [user, setUser] = useState<User | null>(getUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const signUp = (values: SignUpFormValues) => {
    setError(null);
    setLoading(true);

    const result = registerUser(values);

    setLoading(false);

    if (result.success && result.user) {
      setUser(result.user);
      setStatusMessage('Registration successful! Redirecting to login…');
      setTimeout(() => history.push(`/login?next=${values.role}`), 1500);
    } else {
      setError(result.error ?? 'Registration failed.');
    }
  };

  const login = (values: LoginFormValues, next?: string) => {
    setError(null);
    setLoading(true);

    const result = loginUser(values.email, values.password);

    setLoading(false);

    if (result.success && result.user) {
      setUser(result.user);
      const redirectRole = next ?? result.user.role;
      history.push(getRedirectPath(redirectRole));
    } else {
      setError(result.error ?? 'Login failed.');
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    history.push('/');
  };

  const checkAuth = (): boolean => {
    return isLoggedIn();
  };

  const redirectToDashboard = () => {
    if (user) {
      history.push(getRedirectPath(user.role));
    }
  };

  const initials = user ? getUserInitials(user) : '';
  const dashboardPath = user ? getRedirectPath(user.role) : '/';
  const profilePath = user ? getProfilePath(user.role) : '/';
  const roleLabel = user?.role === 'freelancer' ? 'Freelancer' : 'Buyer';

  return {
    user,
    loading,
    error,
    statusMessage,
    initials,
    dashboardPath,
    profilePath,
    roleLabel,
    signUp,
    login,
    logout,
    checkAuth,
    redirectToDashboard,
  };
}
