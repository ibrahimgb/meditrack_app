export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone_number?: string | null;
  date_of_birth?: string | null; // ISO date
  gender?: string | null;
  notes?: string | null;
}

export interface PatientCreate {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone_number?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  notes?: string | null;
}
