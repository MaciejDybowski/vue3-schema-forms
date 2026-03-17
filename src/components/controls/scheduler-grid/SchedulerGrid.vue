<template>
  <v-card
    border
    class="scheduler-card"
    elevation="2"
  >
    <v-card-item
      v-if="schema.showLabel != undefined ? schema.showLabel : true"
      class="bg-surface py-3 border-b"
    >
      <v-card-title class="text-h6 font-weight-bold text-uppercase text-center">
        {{ label }}
      </v-card-title>
    </v-card-item>

    <v-table
      class="roster-table-wrapper bg-surface"
      density="compact"
    >
      <table class="roster-grid">
        <thead>
          <tr v-if="showGroupHeaders && groupedDayHeaders.length">
            <th
              v-if="schema.showUserColumn != undefined ? schema.showUserColumn : true"
              class="sticky-col name-header-cell group-header-placeholder bg-surface"
            ></th>
            <th
              v-for="(groupHeader, groupIndex) in groupedDayHeaders"
              :key="`group-${groupHeader.label}-${groupIndex}`"
              :colspan="groupHeader.count"
              class="group-header-cell bg-surface text-center"
            >
              <span class="text-caption font-weight-bold text-medium-emphasis text-no-wrap">
                {{ groupHeader.label }}
              </span>
            </th>
          </tr>
          <tr>
            <th
              v-if="schema.showUserColumn != undefined ? schema.showUserColumn : true"
              class="sticky-col name-header-cell bg-surface text-high-emphasis"
            >
              <span class="text-subtitle-2 font-weight-bold">{{ t('schedulerGrid.person') }}</span>
            </th>
            <th
              v-for="(headerDay, dayIndex) in headerDays"
              :key="`day-header-${headerDayKeys[dayIndex] ?? dayIndex}`"
              :class="[
                'day-header-cell',
                'bg-surface',
                'text-center',
                compactDayColumns[dayIndex] ? 'day-header-cell--compact' : '',
              ]"
            >
              <span class="text-caption font-weight-bold text-medium-emphasis">
                {{ getDayHeaderLabel(headerDay, dayIndex) }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employeeSchedule in alignedSchedules"
            :key="employeeSchedule.user.id"
            class="employee-row"
          >
            <td
              v-if="schema.showUserColumn != undefined ? schema.showUserColumn : true"
              class="sticky-col bg-surface name-cell"
            >
              <div class="text-body-2 font-weight-medium text-high-emphasis text-no-wrap px-3">
                {{ employeeSchedule.user.lastName }} {{ employeeSchedule.user.firstName }}
              </div>
            </td>

            <td
              v-for="(scheduleDay, dayIndex) in employeeSchedule.alignedSchedule"
              :key="`${employeeSchedule.user.id}-${headerDayKeys[dayIndex] ?? dayIndex}`"
              :class="[
                'status-cell',
                'text-center',
                compactDayColumns[dayIndex] ? 'status-cell--compact' : '',
                scheduleDay && isSameAsPrevDay(scheduleDay) ? 'status-cell--same-as-prev' : '',
                scheduleDay && isModifiedDay(scheduleDay) ? 'status-cell--modified' : '',
                scheduleDay && !fieldProps.readonly ? 'cursor-pointer' : '',
              ]"
              :style="
                scheduleDay
                  ? {
                      backgroundColor: getStatusColor(scheduleDay.status),
                      color: getTextColor(scheduleDay.status),
                    }
                  : {}
              "
              @click="
                scheduleDay &&
                openEditDialog(employeeSchedule.user, scheduleDay, headerDayKeys[dayIndex] ?? '')
              "
            >
              <v-tooltip
                v-if="scheduleDay"
                activator="parent"
                location="top"
                open-delay="500"
              >
                <div class="status-tooltip text-caption">
                  <div
                    v-if="!fieldProps.readonly"
                    class="status-tooltip-row status-tooltip-hint"
                  >
                    {{ t('schedulerGrid.clickToEdit') }}
                  </div>
                  <div class="status-tooltip-row">
                    <strong>{{ scheduleDay.date }}</strong
                    >: {{ getStatusLabel(scheduleDay.status) }}
                  </div>
                  <div
                    v-if="hasPreviousData(scheduleDay) && isModifiedDay(scheduleDay)"
                    class="status-tooltip-prev"
                  >
                    <div class="status-tooltip-prev-title">
                      {{ previousDataLabel }}
                    </div>
                    <div class="status-tooltip-prev-row">
                      <span class="status-tooltip-prev-label"
                        >{{ t('schedulerGrid.status') }}:</span
                      >
                      <span>{{ getStatusLabel(scheduleDay.prevData?.status) }}</span>
                    </div>
                    <div class="status-tooltip-prev-row">
                      <span class="status-tooltip-prev-label">
                        {{ t('schedulerGrid.noteIndicator') }}:
                      </span>
                      <span>{{ getNoteLabel(scheduleDay.prevData?.note) }}</span>
                    </div>
                  </div>
                  <div
                    v-if="scheduleDay.note"
                    class="status-tooltip-note"
                  >
                    <div class="status-tooltip-note-title">
                      {{ t('schedulerGrid.noteIndicator') }}
                    </div>
                    <div class="status-tooltip-note-text">
                      {{ scheduleDay.note }}
                    </div>
                  </div>
                </div>
              </v-tooltip>

              <span
                v-if="scheduleDay && isModifiedDay(scheduleDay)"
                class="mdi mdi-exclamation-thick change-indicator"
                :title="modifiedDataLabel"
              ></span>

              <div
                v-if="scheduleDay && scheduleDay.note"
                class="note-indicator"
              >
                <span class="mdi mdi-note-outline note-indicator-icon"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </v-table>

    <v-divider></v-divider>

    <div class="bg-surface pa-4">
      <div class="d-flex flex-wrap justify-center gap-4">
        <div
          v-for="item in localizedLegend"
          :key="item.statusKey"
          class="d-flex align-center mr-6 mb-2"
        >
          <v-sheet
            :color="getStatusColor(item.statusKey)"
            class="mr-2 rounded-sm border-thin"
            height="20"
            width="20"
          ></v-sheet>
          <span class="text-caption text-medium-emphasis text-uppercase">
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>

    <v-dialog
      v-model="isDialogOpen"
      max-width="400"
    >
      <v-card v-if="editDialogState.employee">
        <v-card-title class="bg-surface border-b">
          {{ t('schedulerGrid.editSchedule') }}
        </v-card-title>
        <v-card-subtitle class="pt-4 opacity-100">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis">
            {{ editDialogState.employee.firstName }} {{ editDialogState.employee.lastName }}
          </div>
          <div class="text-caption text-medium-emphasis">
            {{ editDialogState.day ? editDialogState.day.date : '' }}
          </div>
        </v-card-subtitle>

        <v-card-text class="pt-4 px-4">
          <v-select
            v-model="editDialogState.status"
            :items="localizedLegend"
            :label="t('schedulerGrid.status')"
            class="mb-4"
            item-title="label"
            item-value="statusKey"
            v-bind="fieldProps"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props">
                <template v-slot:prepend>
                  <v-sheet
                    :color="getStatusColor(item.raw.statusKey)"
                    class="rounded mr-2 border-thin"
                    height="24"
                    width="24"
                  ></v-sheet>
                </template>
              </v-list-item>
            </template>
          </v-select>

          <v-text-field
            v-model="editDialogState.note"
            :label="t('schedulerGrid.note')"
            :placeholder="t('schedulerGrid.notePlaceholder')"
            v-bind="fieldProps"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="mx-4">
          <v-spacer></v-spacer>

          <v-btn
            :text="t('close')"
            v-bind="{ ...fieldProps, color: '', variant: 'elevated' }"
            @click="isDialogOpen = false"
          ></v-btn>

          <v-btn
            v-bind="{ ...fieldProps, color: 'primary', variant: 'elevated' }"
            @click="saveChanges"
          >
            {{ t('save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { useTheme } from 'vuetify';

import { computed, onMounted, reactive, ref } from 'vue';

import {
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useResolveVariables,
} from '@/core/composables';
import { User } from '@/types/engine/User';
import { EngineSchedulerGrid } from '@/types/engine/controls';

interface ScheduleDay {
  day?: number;
  date?: string;
  status?: string;
  group?: string;
  note?: string | null;
  sameAsPrev?: boolean;
  prevData?: {
    status?: string;
    note?: string | null;
  };
}

interface EmployeeSchedule {
  user: User;
  schedule: ScheduleDay[];
}

interface AlignedEmployeeSchedule extends EmployeeSchedule {
  alignedSchedule: Array<ScheduleDay | null>;
}

interface GroupHeader {
  label: string;
  count: number;
}

const { model, schema } = defineProps<{
  schema: EngineSchedulerGrid;
  model: object;
}>();

const { bindProps, fieldProps } = useProps();
const { getValue, setValue } = useFormModel();
const { label, bindLabel } = useLabel(schema);
const { t } = useLocale();
const items = ref<EmployeeSchedule[]>([]);
const { resolve } = useResolveVariables();

const localModelWrapper = computed({
  get(): EmployeeSchedule[] | null {
    if (schema.source && schema.source.url) {
      return items.value;
    } else {
      return getValue(model, schema);
    }
  },
  set(val: EmployeeSchedule[]) {
    if (schema.source && schema.source.url) {
      return null;
    } else {
      localModel.value = val;
    }
  },
});

const localModel = computed({
  get(): EmployeeSchedule[] | null {
    return getValue(model, schema);
  },
  set(val: EmployeeSchedule[]) {
    setValue(val, schema);
  },
});

const theme = useTheme();
const isDarkTheme = computed(() => theme.global.current.value.dark);

const hasMonthAndYearContext = computed(() => {
  const modelRecord = model as Record<string, unknown>;
  return Boolean(modelRecord?.month && modelRecord?.year);
});

const visibleSchedules = computed<EmployeeSchedule[]>(() => localModelWrapper.value ?? []);

const getFallbackHeaderDays = (): ScheduleDay[] =>
  Array.from({ length: 31 }, (_, index) => ({
    day: index + 1,
    date: '',
    status: '',
  }));

const getDateSortValue = (date?: string): number | null => {
  if (!date) {
    return null;
  }

  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    return null;
  }

  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
};

const getScheduleDayKey = (scheduleDay: ScheduleDay, fallbackIndex: number): string => {
  const date = scheduleDay.date?.trim();
  if (date) {
    return `date:${date}`;
  }

  const group = scheduleDay.group?.trim() ?? '';
  if (typeof scheduleDay.day === 'number') {
    return group ? `group:${group}|day:${scheduleDay.day}` : `day:${scheduleDay.day}`;
  }

  if (group) {
    return `group:${group}|index:${fallbackIndex}`;
  }

  return `index:${fallbackIndex}`;
};

const headerDays = computed<ScheduleDay[]>(() => {
  const mergedHeaderDays: ScheduleDay[] = [];
  const seenHeaderKeys = new Set<string>();

  visibleSchedules.value.forEach((employeeSchedule) => {
    employeeSchedule.schedule.forEach((scheduleDay, dayIndex) => {
      const dayKey = getScheduleDayKey(scheduleDay, dayIndex);
      if (seenHeaderKeys.has(dayKey)) {
        return;
      }
      seenHeaderKeys.add(dayKey);
      mergedHeaderDays.push(scheduleDay);
    });
  });

  if (mergedHeaderDays.length > 0) {
    const sortableHeaderDays = mergedHeaderDays.map((scheduleDay, firstSeenIndex) => ({
      scheduleDay,
      firstSeenIndex,
      dateSort: getDateSortValue(scheduleDay.date),
      daySort: typeof scheduleDay.day === 'number' ? scheduleDay.day : null,
    }));

    const hasCompleteDateRange = sortableHeaderDays.every(
      (headerDay) => headerDay.dateSort !== null,
    );
    if (hasCompleteDateRange) {
      return sortableHeaderDays
        .slice()
        .sort((a, b) => {
          if (a.dateSort === b.dateSort) {
            return a.firstSeenIndex - b.firstSeenIndex;
          }
          return (a.dateSort ?? 0) - (b.dateSort ?? 0);
        })
        .map((headerDay) => headerDay.scheduleDay);
    }

    const hasAnyGroup = sortableHeaderDays.some((headerDay) =>
      Boolean(headerDay.scheduleDay.group?.trim()),
    );
    const hasCompleteDayRange = sortableHeaderDays.every((headerDay) => headerDay.daySort !== null);
    if (hasCompleteDayRange && !hasAnyGroup) {
      return sortableHeaderDays
        .slice()
        .sort((a, b) => {
          if (a.daySort === b.daySort) {
            return a.firstSeenIndex - b.firstSeenIndex;
          }
          return (a.daySort ?? 0) - (b.daySort ?? 0);
        })
        .map((headerDay) => headerDay.scheduleDay);
    }

    return mergedHeaderDays;
  }

  if (hasMonthAndYearContext.value) {
    return getFallbackHeaderDays();
  }

  return [];
});

const headerDayKeys = computed<string[]>(() =>
  headerDays.value.map((headerDay, dayIndex) => getScheduleDayKey(headerDay, dayIndex)),
);

const alignedSchedules = computed<AlignedEmployeeSchedule[]>(() =>
  visibleSchedules.value.map((employeeSchedule) => {
    const scheduleByKey = new Map<string, ScheduleDay>();

    employeeSchedule.schedule.forEach((scheduleDay, dayIndex) => {
      scheduleByKey.set(getScheduleDayKey(scheduleDay, dayIndex), scheduleDay);
    });

    return {
      ...employeeSchedule,
      alignedSchedule: headerDayKeys.value.map(
        (headerDayKey) => scheduleByKey.get(headerDayKey) ?? null,
      ),
    };
  }),
);

const showGroupHeaders = computed(() => {
  const shouldShow = schema.showGroupHeaders != undefined ? schema.showGroupHeaders : true;
  if (!shouldShow) {
    return false;
  }

  return headerDays.value.some((day) => Boolean(day.group?.trim()));
});

const groupedDayHeaders = computed<GroupHeader[]>(() => {
  if (!showGroupHeaders.value || !headerDays.value.length) {
    return [];
  }

  return headerDays.value.reduce<GroupHeader[]>((groups, day) => {
    const label = day.group?.trim() || '\u00A0';
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.label === label) {
      lastGroup.count += 1;
    } else {
      groups.push({ label, count: 1 });
    }
    return groups;
  }, []);
});

const parseIsoDateParts = (date?: string): { year: number; month: number; day: number } | null => {
  if (!date) {
    return null;
  }

  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    return null;
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
};

const isWeekendDate = (date?: string): boolean => {
  const dateParts = parseIsoDateParts(date);
  if (!dateParts) {
    return false;
  }

  const dayOfWeek = new Date(
    Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day),
  ).getUTCDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

const isWeekendWithoutBusinessData = (scheduleDay?: ScheduleDay): boolean => {
  if (!scheduleDay) {
    return false;
  }

  const status = (scheduleDay.status ?? '').toUpperCase();
  const hasNote = Boolean(scheduleDay.note?.trim());
  const hasPreviousData = Boolean(scheduleDay.prevData);
  const isMarkedAsChanged = scheduleDay.sameAsPrev === false || hasPreviousData;
  const isWeekend = status === 'WEEKEND' || (status === '' && isWeekendDate(scheduleDay.date));

  return isWeekend && !hasNote && !isMarkedAsChanged;
};

const compactDayColumns = computed<boolean[]>(() =>
  headerDayKeys.value.map((_, dayIndex) => {
    const columnDays = alignedSchedules.value
      .map((employeeSchedule) => employeeSchedule.alignedSchedule[dayIndex])
      .filter((day): day is ScheduleDay => Boolean(day));

    if (columnDays.length === 0) {
      return false;
    }

    return columnDays.every((day) => isWeekendWithoutBusinessData(day));
  }),
);

const getDayHeaderLabel = (scheduleDay: ScheduleDay, fallbackIndex: number): string => {
  if (typeof scheduleDay.day === 'number') {
    return String(scheduleDay.day);
  }

  const dateParts = parseIsoDateParts(scheduleDay.date);
  if (dateParts) {
    return String(dateParts.day);
  }

  return String(fallbackIndex + 1);
};

const isDialogOpen = ref(false);

const editDialogState = reactive<{
  employee: User | null;
  day: ScheduleDay | null;
  dayKey: string | null;
  status: string | null;
  note: string | null;
}>({
  employee: null,
  day: null,
  dayKey: null,
  status: null,
  note: null,
});

const openEditDialog = (employee: User, day: ScheduleDay, dayKey: string) => {
  if (fieldProps.value.readonly) {
    return;
  }
  editDialogState.employee = employee;
  editDialogState.day = day;
  editDialogState.dayKey = dayKey;
  editDialogState.status = day.status ?? null;
  editDialogState.note = day.note ?? '';
  isDialogOpen.value = true;
};

const saveChanges = () => {
  if (!editDialogState.employee || !editDialogState.day || !editDialogState.dayKey) return;

  updateScheduleCell({
    employeeId: editDialogState.employee.id,
    dayKey: editDialogState.dayKey,
    status: editDialogState.status,
    note: editDialogState.note,
  });

  isDialogOpen.value = false;
};

const updateScheduleCell = ({
  employeeId,
  dayKey,
  status,
  note,
}: {
  employeeId: number | string;
  dayKey: string;
  status: string | null;
  note: string | null;
}) => {
  if (!localModel.value) return;

  const employeeSchedule = localModel.value.find((e) => e.user.id === employeeId);
  if (!employeeSchedule) return;

  const dayIndex = employeeSchedule.schedule.findIndex(
    (scheduleDay, index) => getScheduleDayKey(scheduleDay, index) === dayKey,
  );
  if (dayIndex === -1) return;

  const scheduleDay = employeeSchedule.schedule[dayIndex];
  if (!scheduleDay) return;

  const nextStatus = status ?? scheduleDay.status;
  const nextNote = note ?? '';

  scheduleDay.status = nextStatus;
  scheduleDay.note = nextNote;
};

const getStatusColor = (statusKey?: string | null): string => {
  if (!statusKey) {
    return isDarkTheme.value ? '#333' : '#fff';
  }
  const mode = isDarkTheme.value ? 'dark' : 'light';
  return (
    schema.legend.find((it) => it.statusKey === statusKey)?.colors[mode] ??
    (isDarkTheme.value ? '#333' : '#fff')
  );
};

const getTextColor = (statusKey?: string | null): string => {
  if (!isDarkTheme.value) return 'rgba(0,0,0,0.87)';
  return statusKey === 'WEEKEND' ? '#666' : '#FFFFFF';
};

const getStatusLabel = (statusKey?: string | null): string => {
  if (!statusKey) {
    return t('emptyValue');
  }
  const translatedStatus = getOptionalTranslation(`schedulerGrid.statusLabels.${statusKey}`, '');
  if (translatedStatus) {
    return translatedStatus;
  }
  const item = schema.legend.find((l) => l.statusKey === statusKey);
  return item ? item.label : statusKey;
};

const getOptionalTranslation = (key: string, fallback: string): string => {
  const translated = t(key);
  return translated === key ? fallback : translated;
};

const previousDataLabel = computed(() =>
  getOptionalTranslation('schedulerGrid.previousData', 'Previous data'),
);

const modifiedDataLabel = computed(() =>
  getOptionalTranslation('schedulerGrid.modifiedData', 'Modified data'),
);

const localizedLegend = computed(() =>
  schema.legend.map((item) => ({
    ...item,
    label: getStatusLabel(item.statusKey),
  })),
);

const getNoteLabel = (note?: string | null): string => {
  const trimmed = note?.trim();
  return trimmed ? trimmed : getOptionalTranslation('schedulerGrid.noNote', t('emptyValue'));
};

const isSameAsPrevDay = (scheduleDay: ScheduleDay): boolean => scheduleDay.sameAsPrev === true;

const hasPreviousData = (scheduleDay: ScheduleDay): boolean => Boolean(scheduleDay.prevData);

const isModifiedDay = (scheduleDay: ScheduleDay): boolean =>
  scheduleDay.sameAsPrev === false ||
  (hasPreviousData(scheduleDay) && scheduleDay.sameAsPrev !== true);

onMounted(async () => {
  await bindLabel(schema);
  await bindProps(schema);

  if (schema.source && schema.source.url) {
    fieldProps.value.readonly = true;
    try {
      const { resolvedText } = await resolve(schema, schema.source.url, true);
      const response = await axios.get(resolvedText);
      items.value = response.data;
    } catch (error) {
      console.error('Failed to load scheduler data:', error);
    }
  }
});
</script>

<style lang="scss" scoped>
.roster-table-wrapper {
  overflow-x: auto !important;
  max-height: calc(100vh - 200px);
}

.roster-grid {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.roster-grid th,
.roster-grid td {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding: 0;
}

.sticky-col {
  position: sticky;
  left: 0;
  z-index: 10;
  border-right: 2px solid rgba(var(--v-border-color), 0.3) !important;
}

thead th.sticky-col {
  z-index: 20;
}
.name-header-cell {
  min-width: 180px;
  height: 48px;
}

.group-header-placeholder {
  height: 30px;
}

.group-header-cell {
  min-width: 40px;
  height: 30px;
  padding: 0 6px;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.day-header-cell {
  min-width: 40px;
  height: 48px;
}

.day-header-cell--compact {
  min-width: 24px;
  width: 24px;
}

.name-cell {
  height: 44px;
}

.status-cell {
  width: 40px;
  min-width: 40px;
  height: 44px;
  position: relative;
  overflow: visible;
  text-align: center;
  transition: background-color 0.2s ease;
}

.status-cell--compact {
  width: 24px;
  min-width: 24px;
}
.status-cell:hover {
  box-shadow:
    inset 0 0 0 2px rgba(var(--v-theme-primary), 0.5),
    inset 0 0 0 999px rgba(0, 0, 0, 0.04); /* Hover effect without stacking context */
}

.status-cell--same-as-prev {
  opacity: 0.4;
  filter: grayscale(0.35) saturate(0.55);
}

.status-cell--same-as-prev:hover {
  filter: grayscale(0.35) saturate(0.55);
  box-shadow: none;
}

.status-tooltip {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 240px;
}

.status-tooltip-prev {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed;
}

.status-tooltip-prev-title {
  font-size: 0.6rem;
  text-transform: uppercase;
}

.status-tooltip-prev-row {
  font-size: 0.75rem;
  line-height: 1.35;
  display: flex;
  gap: 4px;
}

.status-tooltip-prev-label {
  min-width: 44px;
}

.status-tooltip-note {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid;
}

.status-tooltip-note-title {
  font-size: 0.6rem;
  text-transform: uppercase;
}

.status-tooltip-note-text {
  font-size: 0.75rem;
  line-height: 1.35;
  white-space: pre-wrap;
  word-break: break-word;
}

.note-indicator {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.status-cell:hover .note-indicator {
  transform: translateY(-1px);
}

.status-cell--same-as-prev:hover .note-indicator {
  transform: none;
}

.note-indicator-icon {
  font-size: 1rem;
  line-height: 1;
  color: currentColor;
  opacity: 0.8;
}

.change-indicator {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  line-height: 1;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  box-shadow: 0 0 0 1px rgba(var(--v-theme-surface), 0.8);
  z-index: 1000;
}
</style>
