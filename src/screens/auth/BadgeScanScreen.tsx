import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BadgeScanScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Staff Badge</Text>
      <Text style={styles.subtitle}>
        Badge scanning is not required for the MVP. Use credentials on the login
        screen, or tap below to continue.
      </Text>
      <View style={styles.buttonWrapper}>
        <Button title="Back to Login" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 24 },
  buttonWrapper: { alignSelf: 'stretch' },
});


