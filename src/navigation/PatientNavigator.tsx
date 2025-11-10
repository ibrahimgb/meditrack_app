import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DispenseConfirmScreen from '../screens/medication/DispenseConfirmScreen';
import DispenseResultScreen from '../screens/medication/DispenseResultScreen';
import MedicationDetailsScreen from '../screens/medication/MedicationDetailsScreen';
import MedicationScanScreen from '../screens/medication/MedicationScanScreen';
import PatientDetailsScreen from '../screens/patient/PatientDetailsScreen';
import PatientScanScreen from '../screens/patient/PatientScanScreen';

const Stack = createNativeStackNavigator();

export default function PatientNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PatientScan" component={PatientScanScreen} />
      <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
      <Stack.Screen name="MedicationScan" component={MedicationScanScreen} />
      <Stack.Screen name="MedicationDetails" component={MedicationDetailsScreen} />
      <Stack.Screen name="DispenseConfirm" component={DispenseConfirmScreen} />
      <Stack.Screen name="DispenseResult" component={DispenseResultScreen} />
    </Stack.Navigator>
  );
}
