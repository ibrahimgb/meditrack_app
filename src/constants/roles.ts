export const ROLES = {
  NURSE: 'nurse',
  DOCTOR: 'doctor',
  PHARMACIST: 'pharmacist',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
