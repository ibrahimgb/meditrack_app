import { create } from 'zustand';
import type { DispenseLog } from '../models/dispense.model';

type DispenseState = {
  lastResult: DispenseLog | null;
  setLastResult: (log: DispenseLog | null) => void;
};

export const useDispenseStore = create<DispenseState>((set) => ({
  lastResult: null,
  setLastResult: (log) => set({ lastResult: log }),
}));


