import { Patient, PatientCreate } from '../models/patient.model';
import api from './client';

export const addPatient = async (payload: PatientCreate) => {
  return api.post<Patient>('/patients/patients/', payload);
};

export const listPatients = async (skip = 0, limit = 100) => {
  return api.get<Patient[]>('/patients/patients/', {
    params: { skip, limit },
  });
};

export const getPatientById = async (id: number) => {
  return api.get<Patient>(`/patients/patients/${id}`);
};
