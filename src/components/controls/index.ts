//@ts-nocheck
import Image from "@/components/controls/Image.vue";
import GroupOfFields from "@/components/controls/fields-group/FieldsGroup.vue";
import TableViewField from "@/components/controls/table/TableViewField.vue";
import UserInput from "@/components/controls/user-input/UserInput.vue";

import { Components } from "@/main";

import Autocomplete from "./Autocomplete.vue";
import ButtonField from "./ButtonField.vue";
import CheckboxButton from "./CheckboxButton.vue";
import Combobox from "./Combobox.vue";
import Divider from "./Divider.vue";
import Location from "./Location.vue";
import NumberField from "./NumberField.vue";
import PhoneInput from "./PhoneInput.vue";
import RadioButton from "./RadioButton.vue";
import Select from "./Select.vue";
import StaticContent from "./StaticContent.vue";
import Switch from "./Switch.vue";
import TextArea from "./TextArea.vue";
import TextField from "./TextField.vue";
import Address from "./address/Address.vue";
import DataViewer from "./data-viewer/DataViewer.vue";
import DatePicker from "./date/DatePicker.vue";
import DateTimePicker from "./date/DateTimePicker.vue";
import DuplicatedSection from "./duplicated-section/DuplicatedSection.vue";
import Markdown from "./markdown/Markdown.vue";
import OrderedMultiSelect from "./ordered-multi-select/OrderedMultiSelect.vue";
import NumberFieldv2 from "@/components/controls/NumberFieldv2.vue";
import KeyValueLIst from "@/components/controls/KeyValueLIst.vue";

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
  combobox: Combobox,
  "date-picker": DatePicker,
  "date-time-picker": DateTimePicker,
  phone: PhoneInput,
  location: Location,
  address: Address,
  button: ButtonField,
  switch: Switch,
  "number-field": NumberFieldv2,
  "number-field-old": NumberField,
  divider: Divider,
  /*  "image-preview": ImagePreview,*/
  image: Image,
  "fields-group": GroupOfFields,
  "table-view": TableViewField,
  "user-input": UserInput,
  "markdown": Markdown,
  "ordered-multi-select": OrderedMultiSelect,
  "key-value-list": KeyValueLIst
};
