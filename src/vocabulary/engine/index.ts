import { Layout } from '../schema/elements';
import { Component } from 'vue';

export interface EngineField {
  formId: string;
  key: string;
  label: string;
  default: number | string | boolean | object | Array<any>;
  type: 'text' | 'number' | 'object' | 'array' | 'date' | 'phone';
  layout: Layout;
  options: EngineOptions;
  on: {
    input: Function;
  };
  required: boolean;
  validations?: Array<Validation>;
}

export interface EngineOptions {
  fieldProps: Record<string, any>;
  textFieldProps: Record<string, any>;
  textAreaProps: Record<string, any>;
  radioButtonProps: Record<string, any>;
  buttonProps: Record<string, any>;
  checkboxProps: Record<string, any>;
  selectProps: Record<string, any>;
  digitsAfterDecimal: number;
}

export interface NodeUpdateEvent {
  key: string;
  value: any;
}

export interface Validation {
  regexp: RegExp,
  message: string,
  nullable?: boolean
}


export declare type Components = Record<string, Component>;
