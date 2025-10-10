import { View, Text, StyleSheet } from 'react-native';

export default function CabinetStatusScreen() {
  // MVP placeholder – real cabinet integration comes later
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cabinet Status</Text>
      <Text style={styles.subtitle}>
        Smart cabinet integration is not part of the MVP demo.
      </Text>
      <Text style={styles.subtitle}>
        This screen is a placeholder to show where live cabinet status would
        appear (door state, lock, errors).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 6 },
});


