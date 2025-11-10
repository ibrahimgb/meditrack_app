import { useState } from 'react';
import { addDispenseLog } from '../api/dispense.api';
import { DispenseLog, DispenseLogCreate } from '../models/dispense.model';

export function useDispense() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DispenseLog | null>(null);

  const dispenseMedication = async (payload: DispenseLogCreate) => {
    try {
      setLoading(true);
      setError(null);
      const response = await addDispenseLog(payload);
      setResult(response.data);
      return response.data;
    } catch (err) {
      setError('Dispense failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    dispenseMedication,
    loading,
    error,
    result,
  };
}
