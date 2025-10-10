import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function DispenseResultScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { success } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{success ? 'Success!' : 'Dispense Failed'}</Text>
      <Button title="Back to Patients" onPress={() => navigation.navigate('PatientScan')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  result: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#2e7d32' },
});

