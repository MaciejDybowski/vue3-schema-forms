export interface FormItem {
    id: string | number;
    validate: () => Promise<string[]>;
    reset: () => void;
    resetValidation: () => void;
    isValid: boolean | null;
    errorMessages: string[];
}

export type ValidationBehaviour = 'scroll' | 'messages'

export interface ValidationError {
    id: string,
    label: string,
    messages: string[]
}
