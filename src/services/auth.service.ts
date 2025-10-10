import { User, UserRole } from '../models/user.model';
import { createUser } from '../api/auth.api';

/**
 * Auth service
 *
 * For the MVP demo we:
 * - Use `loginWithCredentials` as a fake login that just returns a User object
 * - Expose `registerUser` to hit the backend create-user endpoint
 */

export const registerUser = createUser;

export const loginWithCredentials = async (
  username: string,
  password: string,
  role: UserRole,
): Promise<User> => {
  // TODO: replace with real backend login when available
  return {
    id: Date.now(),
    username,
    role,
    email: null,
  };
};


