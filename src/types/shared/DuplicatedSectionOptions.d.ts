export interface DuplicatedSectionOptions {
  addBtnText: string | { $ref: string };
  addBtnMode: 'add' | 'copy' | "feature"
  showDivider: boolean;
  ordinalNumberInModel: boolean
}
