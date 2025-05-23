export interface SchemaSimpleValidation {
  name: string;
  rule?: string;
  regexp?: RegExp;
  message?: string;
  nullable?: boolean;
}
