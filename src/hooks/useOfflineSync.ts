import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { addDispenseLog } from '../api/dispense.api';
import { DispenseLogCreate } from '../models/dispense.model';

const OFFLINE_QUEUE_KEY = 'offline_dispense_queue';

export function useOfflineSync() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        await syncOfflineDispenses();
      }
    });

    return () => unsubscribe();
  }, []);

  const syncOfflineDispenses = async () => {
    const stored = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    if (!stored) return;

    const queue: DispenseLogCreate[] = JSON.parse(stored);

    for (const item of queue) {
      try {
        await addDispenseLog(item);
      } catch {
        return; // stop on first failure
      }
    }

    await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);
  };

  const queueOfflineDispense = async (payload: DispenseLogCreate) => {
    const stored = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    const queue = stored ? JSON.parse(stored) : [];
    queue.push(payload);
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  };

  return {
    queueOfflineDispense,
    syncOfflineDispenses,
  };
}
