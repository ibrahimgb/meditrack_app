import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

export default function MedicationDetailsAdminScreen() {
  const route = useRoute();
  // @ts-ignore
  const { medication } = route.params || {};

  if (!medication) {
    return (
      <View style={styles.container}>
        <Text>No medication selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{medication.name}</Text>
      <Text style={styles.label}>ID: {medication.id}</Text>
      <Text style={styles.label}>Barcode: {medication.barcode}</Text>
      <Text style={styles.label}>Stock: {medication.stock}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  label: { fontSize: 16, marginBottom: 6 },
});


