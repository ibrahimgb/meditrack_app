import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RoleBlockedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { requiredRole } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Restricted</Text>
      <Text style={styles.subtitle}>
        Your role does not have access to this area.
      </Text>
      {requiredRole && (
        <Text style={styles.detail}>Required role: {requiredRole}</Text>
      )}
      <View style={styles.buttonRow}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 8 },
  detail: { fontSize: 14, marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 12 },
});


