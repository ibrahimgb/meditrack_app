import { useState } from 'react';
import { getMedications } from '../api/medications.api';
import { Medication } from '../models/medication.model';

export function useMedication() {
  const [medication, setMedication] = useState<Medication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicationByBarcode = async (barcode: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getMedications();
      const found = response.data.find(
        (med: Medication) => med.barcode === barcode
      );

      if (!found) {
        throw new Error('Medication not found');
      }

      setMedication(found);
    } catch (err) {
      setError('Unable to fetch medication');
    } finally {
      setLoading(false);
    }
  };

  const clearMedication = () => setMedication(null);

  return {
    medication,
    loading,
    error,
    fetchMedicationByBarcode,
    clearMedication,
  };
}
