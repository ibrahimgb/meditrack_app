import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function PatientDetailsScreen() {
  // Use parameter passed from PatientScanScreen
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { patient } = route.params || {};

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>No patient selected.</Text>
      </View>
    );
  }

  const fullName = `${patient.first_name} ${patient.last_name}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fullName}</Text>
      <Text style={styles.label}>ID: {patient.id}</Text>
      <Text style={styles.label}>DOB: {patient.date_of_birth}</Text>
      <Text style={styles.label}>Gender: {patient.gender}</Text>
      {/* Add more patient info as needed */}
      <View style={styles.buttonWrapper}>
        <Button
          title="Scan Medication"
          onPress={() => navigation.navigate('MedicationScan', { patient })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  label: { fontSize: 16, marginBottom: 6 },
  buttonWrapper: { marginTop: 24, alignSelf: 'stretch' },
});

