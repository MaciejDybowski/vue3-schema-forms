//@ts-nocheck
import Alert from '@/components/controls/Alert.vue';
import Bookmark from '@/components/controls/Bookmark.vue';
import CalendarAutocomplete from '@/components/controls/CalendarAutocomplete.vue';
import FileField from '@/components/controls/FileField.vue';
import Image from '@/components/controls/Image.vue';
import KeyValueList from '@/components/controls/KeyValueList.vue';
import MultiLanguageControl from '@/components/controls/MultiLanguageControl.vue';
import TextSwitchField from '@/components/controls/TextSwitchField.vue';
import YearMonth from '@/components/controls/YearMonth.vue';
import YearPicker from '@/components/controls/YearPicker.vue';
import GroupOfFields from '@/components/controls/fields-group/FieldsGroup.vue';
import GroupInput from '@/components/controls/group-input/GroupInput.vue';
import TableViewField from '@/components/controls/table/TableViewField.vue';
import TextEditor from '@/components/controls/text-editor/TextEditor.vue';
import UserInput from '@/components/controls/user-input/UserInput.vue';

import { Components } from '@/main';

import ButtonField from './ButtonField.vue';
import CheckboxButton from './CheckboxButton.vue';
import Divider from './Divider.vue';
import ExpansionPanels from './ExpansionPanels.vue';
import Location from './Location.vue';
import NumberField from './NumberField.vue';
import PhoneInput from './PhoneInput.vue';
import RadioButton from './RadioButton.vue';
import Select from './Select.vue';
import StaticContent from './StaticContent.vue';
import Switch from './Switch.vue';
import TextArea from './TextArea.vue';
import TextField from './TextField.vue';
import Address from './address/Address.vue';
import DataViewer from './data-viewer/DataViewer.vue';
import DatePicker from './date/DatePicker.vue';
import DateTimePicker from './date/DateTimePicker.vue';
import Autocomplete from './dictionary/Autocomplete.vue';
import Combobox from './dictionary/Combobox.vue';
import DuplicatedSection from './duplicated-section/DuplicatedSection.vue';
import Markdown from './markdown/Markdown.vue';
import OrderedMultiSelect from './ordered-multi-select/OrderedMultiSelect.vue';
import SchedulerGrid from './scheduler-grid/SchedulerGrid.vue';
import TableView from './table/table-view/TableView.vue'




export const vueSchemaFromControls: Components = {
  'text-editor': TextEditor,
  'text-field': TextField,
  'duplicated-section': DuplicatedSection,
  'static-content': StaticContent,
  'radio-button': RadioButton,
  checkbox: CheckboxButton,
  'text-area': TextArea,
  select: Select,
  'data-viewer': DataViewer,
  dictionary: Autocomplete,
  combobox: Combobox,
  'date-picker': DatePicker,
  'date-time-picker': DateTimePicker,
  phone: PhoneInput,
  location: Location,
  address: Address,
  button: ButtonField,
  switch: Switch,
  'number-field': NumberField,
  divider: Divider,
  /*  "image-preview": ImagePreview,*/
  image: Image,
  'fields-group': GroupOfFields,
  'table-view': TableViewField,
  'table-view-api': TableView,
  'user-input': UserInput,
  markdown: Markdown,
  'ordered-multi-select': OrderedMultiSelect,
  'key-value-list': KeyValueList,
  alert: Alert,
  'multi-language-control': MultiLanguageControl,
  'year-picker': YearPicker,
  'text-switch-field': TextSwitchField,
  'file-field': FileField,
  bookmark: Bookmark,
  'expansion-panels': ExpansionPanels,
  'group-input': GroupInput,
  'scheduler-grid': SchedulerGrid,
  'calendar-autocomplete': CalendarAutocomplete,
  'year-month': YearMonth,
};
