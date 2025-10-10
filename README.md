## MediTrack Mobile MVP

MediTrack is a React Native / Expo app that helps hospital staff safely dispense medications to patients, with role-based access and simple inventory views. This repository contains an MVP that focuses on a **fully clickable demo** of the core flows, without offline sync, cabinet hardware integration, or full audit/EHR connectivity.

---

## Tech Stack

- **Runtime**: Expo (React Native)
- **Language**: TypeScript
- **State**: Zustand stores + local screen state
- **Navigation**: `@react-navigation/native` (stack + bottom tabs)
- **HTTP**: Axios client configured in `src/api/client.ts`

---

## Core Flows in the MVP

### 1. Authentication & Roles

- **Login screen** (`LoginScreen`):
  - Simple username/password inputs.
  - Role selector: `nurse`, `doctor`, `pharmacist`.
  - For the MVP, login is simulated and does **not** call a real auth endpoint.
- **Role-based tabs**:
  - All roles see the **Dashboard** and **Patient/Dispense** tab.
  - **Pharmacist** additionally sees the **Inventory/Admin** tab.
- **Optional auth screens**:
  - `BadgeScanScreen`: explains that badge/NFC login is not required in the MVP and links back to Login.
  - `RoleBlockedScreen`: generic "Access Restricted" screen you can navigate to when a role is not allowed to access a route.

### 2. Patient Flow

- **PatientScanScreen**:
  - On load, fetches patients via `listPatients` (`src/api/patients.api.ts`).
  - Shows a list of patients; tapping one navigates to `PatientDetailsScreen`.
- **PatientSearchScreen**:
  - Fetches all patients, then filters locally as the user types.
  - Search by full name or ID.
  - Selecting a patient navigates to `PatientDetailsScreen`.
- **PatientDetailsScreen**:
  - Receives a `patient` object via navigation params.
  - Displays:
    - Full name (first + last)
    - ID
    - Date of birth
    - Gender
  - Button to start the medication flow: navigates to `MedicationScanScreen` with the selected patient.

### 3. Medication & Dispense Flow

- **MedicationScanScreen**:
  - Receives `patient` via navigation params.
  - User enters or "scans" a medication barcode.
  - Uses `useMedication` hook, which in turn calls the medications API and finds a medication by barcode.
  - Once a medication is found, the screen:
    - Displays medication name, ID and current stock.
    - Lets the user enter a **quantity**.
    - Navigates to `DispenseConfirmScreen` with `patient`, `medication`, and `quantity`.
- **DispenseConfirmScreen**:
  - Shows a summary of:
    - Patient (name + ID)
    - Medication (name + ID)
    - Quantity
  - Uses `useDispense` to call `addDispenseLog` (`src/api/dispense.api.ts`) with:
    - `patient_id`
    - `medication_id`
    - `quantity`
  - On success/failure, navigates to `DispenseResultScreen`.
- **DispenseResultScreen**:
  - Reads a `success` flag from the navigation params.
  - Shows either "Success!" or "Dispense Failed".
  - Button to return to the patient flow to start again.

### 4. Admin / Inventory (Pharmacist)

- **InventoryScreen**:
  - Fetches medications from `listMedications` (`src/api/medications.api.ts`).
  - Displays each medication name and stock count.
  - Highlights **low stock** (default threshold: stock ≤ 10) in red with a "(Low)" label.
- **MedicationDetailsAdminScreen**:
  - Receives a `medication` object via navigation params.
  - Shows medication ID, barcode, and stock for more detailed admin view.
- **DispenseLogsScreen**:
  - Fetches logs via `listDispenseLogs` (`src/api/dispense.api.ts`).
  - Shows each dispense record as:
    - `Patient #<patient_id> → Med #<medication_id>`
    - Quantity and timestamp (if provided by backend).

### 5. Cabinet / Hardware Placeholders

These are **UX placeholders** to show where smart cabinet integration will go in future versions:

- **CabinetStatusScreen**:
  - Explains cabinet status and that hardware integration is not yet part of the MVP.
- **CabinetErrorScreen**:
  - Displays a cabinet-related error message from navigation params or a default text.

---

## API & Environment Configuration

### Axios Client

- Configured in `src/api/client.ts`.
- Uses a centralized base URL and headers.

### Environment Variables

Environment-specific configuration lives in `src/config/env.ts`:

```ts
const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://meditrack.com/api';

export const ENV = {
  API_URL,
};
```

- To point the app at a different backend, set in your root `.env` file:

```bash
EXPO_PUBLIC_API_URL=https://your-backend-url.com/api
```

- Then restart the Expo dev server so `process.env` picks up the change.

---

## Data Models (MVP)

- **User** (`src/models/user.model.ts`):
  - `id`, `username`, optional `email`, and `role` (`nurse | doctor | pharmacist`).
- **Patient** (`src/models/patient.model.ts`):
  - `id`, `first_name`, `last_name`, contact fields, `date_of_birth`, `gender`, etc.
- **Medication** (`src/models/medication.model.ts`):
  - `id`, `name`, `barcode`, `stock`, plus open-ended extra fields.
- **DispenseLog** (`src/models/dispense.model.ts`):
  - `id`, `patient_id`, `medication_id`, `quantity`, optional `created_at`, plus extra metadata.

---

## State & Services

### Stores (Zustand)

Located in `src/store/`:

- **`auth.store.ts`**:
  - `isAuthenticated`, `user`, `login`, `logout`.
- **`patient.store.ts`**:
  - `patients`, `selectedPatient`, `setPatients`, `setSelectedPatient`.
- **`medication.store.ts`**:
  - `medications`, `selectedMedication`, `setMedications`, `setSelectedMedication`.
- **`inventory.store.ts`**:
  - `items` (medications in inventory), `setItems`.
- **`dispense.store.ts`**:
  - `lastResult` (last `DispenseLog`), `setLastResult`.

> Note: For the MVP, most screens use local state and hooks directly. The stores are ready for future refactors to more centralized state management.

### Services

Located in `src/services/`:

- **`auth.service.ts`**:
  - `registerUser` wraps `createUser` from `auth.api.ts`.
  - `loginWithCredentials` simulates login and returns a `User` for demo purposes.
- **`inventory.service.ts`**:
  - `fetchInventory` wraps `listMedications` and returns a `Medication[]`.
- **`audit.service.ts`**:
  - `recordAuditEvent` is a no-op with a proper signature; ready for future backend audit logging.

---

## Navigation Structure

- **`App.tsx`**:
  - Wraps `RootNavigator` in `NavigationContainer`.
- **`RootNavigator`**:
  - Chooses between:
    - `AuthNavigator` (if not authenticated).
    - `MainNavigator` (if authenticated).
- **`AuthNavigator`**:
  - `LoginScreen`
  - `BadgeScanScreen`
  - `RoleBlockedScreen`
- **`MainNavigator`** (bottom tabs):
  - `Dashboard` (simple system overview)
  - `PatientFlow` (patient -> medication -> dispense screens)
  - `Admin` (Inventory/Admin screens, only for pharmacists)
- **`PatientNavigator`**:
  - `PatientScanScreen`
  - `PatientDetailsScreen`
  - `MedicationScanScreen`
  - `MedicationDetailsScreen`
  - `DispenseConfirmScreen`
  - `DispenseResultScreen`
- **`AdminNavigator`**:
  - `InventoryScreen`
  - `MedicationDetailsAdminScreen`
  - `DispenseLogsScreen`

---

## Running the App

### 1. Install dependencies

From the project root:

```bash
npm install
```

or

```bash
yarn
```

### 2. Configure API URL (optional)

- Create a `.env` file in the project root:

```bash
EXPO_PUBLIC_API_URL=https://your-backend-url.com/api
```

If you skip this, the app will default to `https://meditrack.com/api`.

### 3. Start the Expo dev server

```bash
npm start
```

Then use the Expo CLI UI to:

- Run on an Android emulator or device.
- Run on iOS simulator or device.
- Run on web (if desired).

---

## What Is In Scope for the MVP vs. Future Work

### In Scope (Implemented)

- Credential-based login + role selection (nurse/doctor/pharmacist).
- Role-based tab visibility.
- Patient selection (scan-style list + search screen).
- Medication selection by barcode + quantity input.
- Dispense confirmation, API-backed logging, and result screen.
- Admin inventory listing with low stock highlight.
- Admin view of basic dispense logs.
- Simple placeholders for badge scanning and cabinet status/errors.

### Out of Scope (Planned for Future)

- Real NFC / badge scanning.
- Offline queue and background sync.
- Smart cabinet hardware API integration.
- Full audit logging pipeline to a backend.
- Push notifications, advanced analytics, and reporting dashboards.

---

## How to Use This MVP in a Demo

- **Step 1**: Log in as a nurse/doctor to show the standard flow, or as a pharmacist to show the Inventory tab.
- **Step 2**: Select or search for a patient, open their details.
- **Step 3**: Start the medication flow, enter a barcode that exists in your backend data, choose a quantity.
- **Step 4**: Confirm the dispense and show the success/failure result.
- **Step 5** (Pharmacist): Open the Inventory tab to show medications and low stock; open Dispense Logs to show recorded dispenses.

This gives stakeholders a clear, end-to-end picture of how MediTrack will manage medication dispensing in a real deployment, while remaining small and simple enough for rapid iteration. 


