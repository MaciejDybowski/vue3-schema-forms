import { Label } from "@/types/engine/Label";

export interface EngineOptions {
  fieldProps: Record<string, any>;
  textFieldProps: Record<string, any>;
  textAreaProps: Record<string, any>;
  radioButtonProps: Record<string, any>;
  buttonProps: Record<string, any>;
  checkboxProps: Record<string, any>;
  selectProps: Record<string, any>;
  digitsAfterDecimal: number;
  context?: Record<string, any>;
  userInputProps?: Record<string, any> & {
    labels?: Label[];
  }
  dictionaryProps?:  Record<string, any> & {
    labels?: Label[];
  }
}
