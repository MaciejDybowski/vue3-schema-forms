export interface NodeUpdateEvent {
  key: string;
  value: any;
  index?: number;
  emitBlocker?: boolean;
}
