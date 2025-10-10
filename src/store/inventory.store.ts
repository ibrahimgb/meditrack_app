import { create } from 'zustand';
import type { Medication } from '../models/medication.model';

type InventoryState = {
  items: Medication[];
  setItems: (items: Medication[]) => void;
};

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));


