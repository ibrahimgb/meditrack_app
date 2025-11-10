export type CabinetEventType = 'open' | 'close' | 'tamper';

export interface CabinetEvent {
  id: number;
  cabinet_id: string;
  user_id: number;
  event_type: CabinetEventType;
  timestamp: string; // ISO datetime
}

export interface Cabinet {
  id: string;
  location: string;
  is_locked: boolean;
}
