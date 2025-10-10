import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { listDispenseLogs } from '../../api/dispense.api';
import { DispenseLog } from '../../models/dispense.model';

export default function DispenseLogsScreen() {
  const [logs, setLogs] = useState<DispenseLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await listDispenseLogs();
        setLogs(res.data);
      } catch (e) {
        setError('Failed to load dispense logs');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 80 }} />;
  }

  if (error) {
    return <Text style={{ color: 'red', marginTop: 80 }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispense Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.mainText}>
              Patient #{item.patient_id} → Med #{item.medication_id}
            </Text>
            <Text style={styles.subText}>Qty: {item.quantity}</Text>
            {item.created_at && (
              <Text style={styles.subText}>{item.created_at}</Text>
            )}
          </View>
        )}
        style={{ width: '100%' }}
        ListEmptyComponent={<Text>No dispense logs yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  row: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  mainText: { fontSize: 15, fontWeight: 'bold' },
  subText: { fontSize: 13, color: '#555' },
});


