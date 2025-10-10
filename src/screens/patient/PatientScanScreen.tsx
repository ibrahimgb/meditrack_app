import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { listPatients } from '../../api/patients.api';
import { Patient } from '../../models/patient.model';

export default function PatientScanScreen() {
  const [patients, setPatients] = useState<Patient[]>([]);
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
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const selectPatient = (patient: Patient) => {
    navigation.navigate('PatientDetails', { patient });
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 80 }} />;
  if (error) return <Text style={{ margin: 20, color: 'red' }}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Patient</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Button
            title={`${item.first_name} ${item.last_name}`}
            onPress={() => selectPatient(item)}
          />
        )}
        style={{ width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 19, fontWeight: 'bold', marginBottom: 14 },
});
