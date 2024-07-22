export interface ValidationFromItem {
  id: string | number;
  validate: () => Promise<string[]>;
  reset: () => void;
  resetValidation: () => void;
  isValid: boolean | null;
  errorMessages: string[];
}
