export interface SchemaOptions {
  fieldProps?: Record<string, any>;
  btnProps?: Record<string, any>;
  digitsAfterDecimal?: string | number;
  context?: object;
  i18n?: Record<string, any>;
  /**
   * URL template for nested form schemas, resolved via $ref: '#/nestedFormsPath' in the schema.
   * Can be a plain string or a $ref object: { $ref: '../path/{0}/schema?name={1}' }
   * Placeholders {0}, {1}, ... are filled from numeric keys on the $ref node:
   *   - '{context.some.path:default}' – resolved from options.context
   *   - 'staticValue'                 – used as-is
   */
  nestedFormsPath?: string | { $ref: string };
}
