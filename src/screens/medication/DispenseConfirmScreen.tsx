import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useDispense } from '../../hooks/useDispense';

export default function DispenseConfirmScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { patient, medication, quantity } = route.params || {};

  const { dispenseMedication, loading, error } = useDispense();

  if (!patient || !medication || !quantity) {
    return (
      <View style={styles.container}><Text>Missing info!</Text></View>
    );
  }

  const handleConfirm = async () => {
    try {
      await dispenseMedication({ patient_id: patient.id, medication_id: medication.id, quantity });
      navigation.navigate('DispenseResult', { success: true });
    } catch {
      navigation.navigate('DispenseResult', { success: false });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispense Medication</Text>
      <Text>Patient: {patient.first_name} {patient.last_name} (ID: {patient.id})</Text>
      <Text>Medication: {medication.name} (ID: {medication.id})</Text>
      <Text>Quantity: {quantity}</Text>
      {error && <Text style={{ color: 'red', margin: 10 }}>{error}</Text>}
      {loading ? <ActivityIndicator style={{ margin: 10 }} /> : (
        <Button title="Confirm" onPress={handleConfirm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 26 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
});

