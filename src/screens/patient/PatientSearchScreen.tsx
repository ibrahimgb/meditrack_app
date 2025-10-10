import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { listPatients } from '../../api/patients.api';
import { Patient } from '../../models/patient.model';
import { useNavigation } from '@react-navigation/native';

export default function PatientSearchScreen() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await listPatients();
        setPatients(res.data);
      } catch (e) {
        setError('Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = patients.filter(p => {
    const full = `${p.first_name} ${p.last_name}`.toLowerCase();
    return full.includes(query.toLowerCase()) || (p.id + '').includes(query);
  });

  const selectPatient = (patient: Patient) => {
    navigation.navigate('PatientDetails', { patient });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Patient</Text>
      <TextInput
        style={styles.input}
        placeholder="Type name or ID"
        value={query}
        onChangeText={setQuery}
      />
      {loading && <ActivityIndicator style={{ margin: 16 }} />}
      {error && <Text style={{ color: 'red', margin: 16 }}>{error}</Text>}
      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => selectPatient(item)}>
            <Text>{item.first_name} {item.last_name} (ID: {item.id})</Text>
          </TouchableOpacity>
        )}
        style={{ width: '100%' }}
        ListEmptyComponent={!loading ? <Text style={{ margin: 10 }}>No matches found.</Text> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'flex-start' },
  input: { borderWidth: 1, borderColor: '#bbb', borderRadius: 6, padding: 8, width: '100%', marginBottom: 14 },
  item: { backgroundColor: '#f3f3f3', borderRadius: 6, padding: 12, marginBottom: 10 },
});

