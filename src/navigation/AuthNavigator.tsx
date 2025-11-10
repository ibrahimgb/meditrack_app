import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BadgeScanScreen from '../screens/auth/BadgeScanScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RoleBlockedScreen from '../screens/auth/RoleBlockedScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="BadgeScan" component={BadgeScanScreen} />
      <Stack.Screen name="RoleBlocked" component={RoleBlockedScreen} />
    </Stack.Navigator>
  );
}
