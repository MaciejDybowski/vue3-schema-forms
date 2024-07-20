//@ts-nocheck
import TextField from "./TextField.vue";
import DuplicatedSection from "./duplicated-section/DuplicatedSection.vue";
import StaticContent from "./StaticContent.vue";
import RadioButton from "./RadioButton.vue";
import CheckboxButton from "./CheckboxButton.vue";
import TextArea from "./TextArea.vue";
import Select from "./Select.vue";
import DataViewer from "./data-viewer/DataViewer.vue";
import Autocomplete from "./Autocomplete.vue";
import DatePicker from "./date/DatePicker.vue";
import PhoneInput from "./PhoneInput.vue";
import Location from "./Location.vue";
import Address from "./address/Address.vue";
import DateTimePicker from "./date/DateTimePicker.vue";
import ButtonField from "./ButtonField.vue";

import { Components } from "@/types/engine";

export const vueSchemaFromControls: Components = {
  "text-field": TextField,
  "duplicated-section": DuplicatedSection,
  "static-content": StaticContent,
  "radio-button": RadioButton,
  checkbox: CheckboxButton,
  "text-area": TextArea,
  select: Select,
  "data-viewer": DataViewer,
  dictionary: Autocomplete,
  "date-picker": DatePicker,
  "date-time-picker": DateTimePicker,
  phone: PhoneInput,
  location: Location,
  address: Address,
  button: ButtonField,
};
