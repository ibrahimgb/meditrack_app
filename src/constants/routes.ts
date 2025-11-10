export const ROUTES = {
  // Root
  AUTH: 'Auth',
  MAIN: 'Main',

  // Auth
  LOGIN: 'Login',
  BADGE_SCAN: 'BadgeScan',
  ROLE_BLOCKED: 'RoleBlocked',

  // Dashboard
  DASHBOARD: 'Dashboard',

  // Patient Flow
  PATIENT_FLOW: 'PatientFlow',
  PATIENT_SCAN: 'PatientScan',
  PATIENT_DETAILS: 'PatientDetails',

  // Medication Flow
  MEDICATION_SCAN: 'MedicationScan',
  MEDICATION_DETAILS: 'MedicationDetails',
  DISPENSE_CONFIRM: 'DispenseConfirm',
  DISPENSE_RESULT: 'DispenseResult',

  // Admin
  ADMIN: 'Admin',
  INVENTORY: 'Inventory',
  MEDICATION_ADMIN_DETAILS: 'MedicationAdminDetails',
  DISPENSE_LOGS: 'DispenseLogs',

  // System
  SETTINGS: 'Settings',
  OFFLINE_SYNC: 'OfflineSync',
} as const;

export type RouteName = typeof ROUTES[keyof typeof ROUTES];
