import { User, UserCreate } from '../models/user.model';
import api from './client';

export const createUser = async (payload: UserCreate) => {
  const response = await api.post<User>('/auth/users/', payload);
  return response;
};
