import { listMedications } from '../api/medications.api';
import { Medication } from '../models/medication.model';

/**
 * Inventory service
 *
 * Lightweight wrapper over medication APIs for the inventory/admin views.
 */

export const fetchInventory = async (): Promise<Medication[]> => {
  const res = await listMedications();
  return res.data;
};


