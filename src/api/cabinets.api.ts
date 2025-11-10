import { DispenseLog, DispenseLogCreate } from '../models/dispense.model';
import api from './client';

export const logCabinetDispense = async (payload: DispenseLogCreate) => {
  return api.post<DispenseLog>('/cabinets/dispenses/', payload);
};

export const listCabinetDispenses = async (skip = 0, limit = 100) => {
  return api.get<DispenseLog[]>('/cabinets/dispenses/', {
    params: { skip, limit },
  });
};
