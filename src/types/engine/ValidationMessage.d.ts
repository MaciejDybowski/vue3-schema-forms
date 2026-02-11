export interface ValidationMessage {
  code: string;
  message: string;
  severity: Severity;
  inputId?: string;
}

export type Severity = 'error' | 'warning' | 'info';