import { DispenseLog, DispenseLogCreate } from '../models/dispense.model';
import api from './client';

export const addDispenseLog = async (payload: DispenseLogCreate) => {
  return api.post<DispenseLog>('/dispense/dispenses/', payload);
};

export const listDispenseLogs = async (skip = 0, limit = 100) => {
  return api.get<DispenseLog[]>('/dispense/dispenses/', {
    params: { skip, limit },
  });
};
