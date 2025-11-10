export const DISPENSE_STATUS = {
  DISPENSED: 'dispensed',
  TAKEN: 'taken',
  REFUSED: 'refused',
} as const;

export type DispenseStatus =
  typeof DISPENSE_STATUS[keyof typeof DISPENSE_STATUS];

export const CABINET_EVENT = {
  OPEN: 'open',
  CLOSE: 'close',
  TAMPER: 'tamper',
} as const;

export type CabinetEventType =
  typeof CABINET_EVENT[keyof typeof CABINET_EVENT];
