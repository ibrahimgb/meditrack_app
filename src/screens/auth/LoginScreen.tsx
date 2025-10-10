import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserRole } from '../../models/user.model';
import { useAuthStore } from '../../store/auth.store';

const ROLES: UserRole[] = ['nurse', 'doctor', 'pharmacist'];

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('nurse');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MediTrack Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={{ marginBottom: 4, marginTop: 12 }}>Role:</Text>
      <View style={styles.roleRow}>
        {ROLES.map(r => (
          <Button
            key={r}
            title={r.charAt(0).toUpperCase() + r.slice(1)}
            onPress={() => setRole(r)}
            color={role === r ? '#032B49' : undefined}
          />
        ))}
      </View>
      <Button
        title="Login"
        onPress={() => login({ id: 1, username, role })}
        disabled={!username || !password}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { width: 220, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginVertical: 6 },
  roleRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
});
