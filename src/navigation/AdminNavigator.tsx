import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DispenseLogsScreen from '../screens/inventory/DispenseLogsScreen';
import InventoryScreen from '../screens/inventory/InventoryScreen';
import MedicationDetailsAdminScreen from '../screens/inventory/MedicationDetailsAdminScreen';

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen
        name="MedicationAdminDetails"
        component={MedicationDetailsAdminScreen}
      />
      <Stack.Screen name="DispenseLogs" component={DispenseLogsScreen} />
    </Stack.Navigator>
  );
}
