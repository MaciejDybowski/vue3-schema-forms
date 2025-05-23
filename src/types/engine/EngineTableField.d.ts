import { EngineField } from '@/types/engine/EngineField';
import { TableSource } from '@/types/shared/Source';

export interface EngineTableField extends EngineField {
  aggregates?: object;
  source: TableSource;
  actions?: Record<string, string>;
  triggers?: string[];
}
