import { Medication, MedicationCreate } from '../models/medication.model';
import api from './client';

export const addMedication = async (payload: MedicationCreate) => {
  return api.post<Medication>('/medications/medications/', payload);
};

export const listMedications = async (skip = 0, limit = 100) => {
  return api.get<Medication[]>('/medications/medications/', {
    params: { skip, limit },
  });
};
