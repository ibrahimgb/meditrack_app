/**
 * Audit service
 *
 * For the MVP we only provide a no-op helper.
 * Later this can send structured events to a backend audit log.
 */

export type AuditEventType =
  | 'login'
  | 'logout'
  | 'dispense_success'
  | 'dispense_failure';

export interface AuditEvent {
  type: AuditEventType;
  message: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

export const recordAuditEvent = async (_event: AuditEvent): Promise<void> => {
  // No-op in MVP – keep signature ready for future implementation
};


