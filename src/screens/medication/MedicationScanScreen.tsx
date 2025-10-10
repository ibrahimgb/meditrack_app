import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMedication } from '../../hooks/useMedication';

export default function MedicationScanScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { patient } = route.params || {};

  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('1');
  const { fetchMedicationByBarcode, medication, loading, error } = useMedication();
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleScan = async () => {
    try {
      setFetchError(null);
      await fetchMedicationByBarcode(barcode);
    } catch {
      setFetchError('Medication not found');
    }
  };

  const goToConfirm = () => {
    if (medication && patient) {
      navigation.navigate('DispenseConfirm', {
        medication,
        patient,
        quantity: Number(quantity),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Medication</Text>
      <TextInput
        style={styles.input}
        placeholder="Scan or enter barcode"
        value={barcode}
        onChangeText={setBarcode}
      />
      <Button title="Find Medication" onPress={handleScan} disabled={!barcode} />
      {loading && <ActivityIndicator style={{ margin: 10 }} />}
      {error && <Text style={{ color: 'red', margin: 10 }}>{error}</Text>}
      {fetchError && <Text style={{ color: 'red', margin: 10 }}>{fetchError}</Text>}

      {medication && (
        <View style={styles.medBox}>
          <Text style={{ fontWeight: 'bold' }}>{medication.name}</Text>
          <Text>ID: {medication.id}</Text>
          <Text>Stock: {medication.stock}</Text>
          {/* Quantity selection */}
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            keyboardType="number-pad"
            onChangeText={setQuantity}
          />
          <Button title="Confirm" onPress={goToConfirm} disabled={!quantity} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 14 },
  input: { borderColor: '#ddd', borderWidth: 1, borderRadius: 6, width: 220, padding: 8, marginVertical: 8 },
  medBox: { marginTop: 24, padding: 16, borderWidth: 1, borderColor: '#bbb', borderRadius: 8, alignItems: 'center', width: 240, backgroundColor: '#fcfcfc', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4 },
});

