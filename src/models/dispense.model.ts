export interface DispenseLog {
  id: number;
  patient_id: number;
  medication_id: number;
  quantity: number;
  created_at?: string;
  [key: string]: any;
}

export interface DispenseLogCreate {
  patient_id: number;
  medication_id: number;
  quantity: number;
}
