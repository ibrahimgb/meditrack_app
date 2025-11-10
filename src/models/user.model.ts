export type UserRole = 'nurse' | 'doctor' | 'pharmacist';

export interface User {
  id: number;
  username: string;
  email?: string | null;
  role: UserRole;
}

export interface UserCreate {
  username: string;
  email?: string | null;
  password: string;
  role: UserRole;
}
