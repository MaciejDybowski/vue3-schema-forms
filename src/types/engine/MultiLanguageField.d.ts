import { AvailableLanguage } from '@/types/engine/AvailableLanguage';
import { EngineField } from '@/types/engine/EngineField';

export interface EngineMultiLanguageField extends EngineField {
  availableLanguages?: Array<AvailableLanguage>;
}
