export interface Medication {
  id: number;
  name: string;
  barcode: string;
  stock: number;
  [key: string]: any; // allow extra for MVP flexibility
}

export interface MedicationCreate {
  name: string;
  barcode: string;
  stock?: number;
  [key: string]: any;
}
