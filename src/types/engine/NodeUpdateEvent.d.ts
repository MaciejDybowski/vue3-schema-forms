export interface NodeUpdateEvent {
  key: string;
  value: any;
  dataPath?: string;
  index?: number;
  emitBlocker?: boolean;
}
