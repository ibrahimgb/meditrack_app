import { create } from 'zustand';
import type { Medication } from '../models/medication.model';

type MedicationState = {
  medications: Medication[];
  selectedMedication: Medication | null;
  setMedications: (list: Medication[]) => void;
  setSelectedMedication: (med: Medication | null) => void;
};

export const useMedicationStore = create<MedicationState>((set) => ({
  medications: [],
  selectedMedication: null,
  setMedications: (list) => set({ medications: list }),
  setSelectedMedication: (med) => set({ selectedMedication: med }),
}));


