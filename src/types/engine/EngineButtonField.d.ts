import { EngineField } from '@/types/engine/EngineField';
import { Schema } from '@/types/schema/Schema';

export interface EngineButtonField extends EngineField {
  mode: string;
  config: {
    target?: '_blank' | '_self' | '_parent' | '_top';
  } & Record<string, any>;
  schema?: Schema;
}
