import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function CabinetErrorScreen() {
  const route = useRoute();
  // @ts-ignore
  const { message } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cabinet Error</Text>
      <Text style={styles.subtitle}>
        {message || 'An error occurred with the cabinet hardware.'}
      </Text>
      <Text style={styles.subtitle}>
        In this MVP, cabinet hardware is simulated only. No live actions are
        performed.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 6 },
});


