export interface DuplicatedSectionOptions {
  addBtnText: string | { $ref: string };
  addBtnMode: 'add' | 'copy' | 'feature' | 'action';
  showDivider: boolean;
  ordinalNumberInModel: boolean;
  action?: ActionDefinition;
  showFirstInitRow?: boolean;
  rowVisibilityCondition?: string
}

export interface ActionDefinition {
  code?: string;
}
