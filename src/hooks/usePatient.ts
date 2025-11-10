import { User } from '../models/user.model';
import { useAuthStore } from '../store/auth.store';

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const handleLogin = async (userData: User) => {
    // Later: call /auth/users/ or login endpoint
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  };
}
