import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listMedications } from '../../api/medications.api';
import { Medication } from '../../models/medication.model';

const LOW_STOCK_THRESHOLD = 10;

export default function InventoryScreen() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await listMedications();
        setMedications(res.data);
      } catch (e) {
        setError('Failed to load medications');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Text style={{ marginTop: 80 }}>Loading...</Text>;
  if (error) return <Text style={{ color: 'red', marginTop: 80 }}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <FlatList
        data={medications}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={{ color: item.stock <= LOW_STOCK_THRESHOLD ? 'red' : 'black', fontWeight: item.stock <= LOW_STOCK_THRESHOLD ? 'bold' : 'normal' }}>
              Stock: {item.stock} {item.stock <= LOW_STOCK_THRESHOLD ? '(Low)' : ''}
            </Text>
          </View>
        )}
        style={{ width: '100%' }}
        ListEmptyComponent={<Text>No meds in inventory.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 14, paddingHorizontal: 16 },
  name: { fontSize: 16 },
});

