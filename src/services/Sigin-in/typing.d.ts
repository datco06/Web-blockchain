export type UserRole = 'freelancer' | 'buyer';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}
