import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/system/DashboardScreen';
import { useAuthStore } from '../store/auth.store';
import AdminNavigator from './AdminNavigator';
import PatientNavigator from './PatientNavigator';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'pharmacist';

  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="PatientFlow"
        component={PatientNavigator}
        options={{ title: 'Dispense' }}
      />

      {isAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{ title: 'Inventory' }}
        />
      )}
    </Tab.Navigator>
  );
}
