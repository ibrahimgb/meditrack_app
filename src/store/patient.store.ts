import { create } from 'zustand';
import type { Patient } from '../models/patient.model';

type PatientState = {
  patients: Patient[];
  selectedPatient: Patient | null;
  setPatients: (list: Patient[]) => void;
  setSelectedPatient: (patient: Patient | null) => void;
};

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selectedPatient: null,
  setPatients: (list) => set({ patients: list }),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
}));


