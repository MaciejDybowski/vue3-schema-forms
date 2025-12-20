<template>
  <v-card
    border
    class="scheduler-card"
    elevation="2"
  >
    <v-card-item class="bg-surface py-3 border-b">
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
          <tr>
            <th class="sticky-col name-header-cell bg-surface text-high-emphasis">
              <span class="text-subtitle-2 font-weight-bold">{{ t('schedulerGrid.person') }}</span>
            </th>
            <th
              v-for="day in daysInMonth"
              :key="day"
              class="day-header-cell bg-surface text-center"
            >
              <span class="text-caption font-weight-bold text-medium-emphasis">{{ day }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employeeSchedule in localModel"
            :key="employeeSchedule.user.id"
            class="employee-row"
          >
            <td class="sticky-col bg-surface name-cell">
              <div class="text-body-2 font-weight-medium text-high-emphasis text-no-wrap px-3">
                {{ employeeSchedule.user.lastName }} {{ employeeSchedule.user.firstName }}
              </div>
            </td>

            <td
              v-for="scheduleDay in employeeSchedule.schedule"
              :key="scheduleDay.day"
              :style="{
                backgroundColor: getStatusColor(scheduleDay.status),
                color: getTextColor(scheduleDay.status),
              }"
              class="status-cell text-center"
              @click="openEditDialog(employeeSchedule.user, scheduleDay)"
            >
              <v-tooltip
                activator="parent"
                location="top"
                open-delay="500"
              >
                <span class="text-caption">
                  {{ t('schedulerGrid.clickToEdit') }}<br />
                  <strong>{{ scheduleDay.date }}</strong
                  >: {{ getStatusLabel(scheduleDay.status) }}
                </span>
              </v-tooltip>

              <span
                v-if="scheduleDay.note"
                class="text-caption font-weight-black d-flex align-center justify-center h-100"
                style="line-height: 1; font-size: 0.65rem !important"
              >
                {{ scheduleDay.note }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </v-table>

    <v-divider></v-divider>

    <div class="bg-surface pa-4">
      <div class="d-flex flex-wrap justify-center gap-4">
        <div
          v-for="item in schema.legend"
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
            :items="schema.legend"
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
import { useTheme } from 'vuetify';

import { computed, onMounted, reactive, ref } from 'vue';

import { useFormModel, useLabel, useLocale, useProps } from '@/core/composables';
import { User } from '@/types/engine/User';
import { EngineSchedulerGrid } from '@/types/engine/controls';

interface ScheduleDay {
  day: number;
  date: string;
  status: string;
  note?: string;
}

interface EmployeeSchedule {
  user: User;
  schedule: ScheduleDay[];
}

const { model, schema } = defineProps<{
  schema: EngineSchedulerGrid;
  model: object;
}>();

const { bindProps, fieldProps } = useProps();
const { getValue, setValue } = useFormModel();
const { label, bindLabel } = useLabel(schema);
const { t } = useLocale();

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

const daysInMonth = computed(() =>
  localModel.value ? localModel.value[0]?.schedule.length || 31 : 31,
);
const isDialogOpen = ref(false);

const editDialogState = reactive<{
  employee: User | null;
  day: ScheduleDay | null;
  status: string | null;
  note: string | null;
}>({
  employee: null,
  day: null,
  status: null,
  note: null,
});

const openEditDialog = (employee: User, day: ScheduleDay) => {
  editDialogState.employee = employee;
  editDialogState.day = day;
  editDialogState.status = day.status;
  editDialogState.note = day.note ?? '';
  isDialogOpen.value = true;
};

const saveChanges = () => {
  if (!editDialogState.employee || !editDialogState.day) return;

  updateScheduleCell({
    employeeId: editDialogState.employee.id,
    day: editDialogState.day.day,
    status: editDialogState.status,
    note: editDialogState.note,
  });

  isDialogOpen.value = false;
};

const updateScheduleCell = ({
  employeeId,
  day,
  status,
  note,
}: {
  employeeId: number | string;
  day: number;
  status: string | null;
  note: string | null;
}) => {
  if (!localModel.value) return;

  const employeeSchedule = localModel.value.find((e) => e.user.id === employeeId);
  if (!employeeSchedule) return;

  const scheduleDay = employeeSchedule.schedule.find((d) => d.day === day);
  if (!scheduleDay) return;

  scheduleDay.status = status ?? scheduleDay.status;
  scheduleDay.note = note ?? '';
};

const getStatusColor = (statusKey: string): string => {
  const mode = isDarkTheme.value ? 'dark' : 'light';
  return (
    schema.legend.find((it) => it.statusKey === statusKey)?.colors[mode] ??
    (isDarkTheme.value ? '#333' : '#fff')
  );
};

const getTextColor = (statusKey: string): string => {
  if (!isDarkTheme.value) return 'rgba(0,0,0,0.87)';
  return statusKey === 'WEEKEND' ? '#666' : '#FFFFFF';
};

const getStatusLabel = (statusKey: string): string => {
  const item = schema.legend.find((l) => l.statusKey === statusKey);
  return item ? item.label : statusKey;
};

onMounted(async () => {
  await bindLabel(schema);
  await bindProps(schema);
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
.day-header-cell {
  min-width: 40px;
  height: 48px;
}
.name-cell {
  height: 44px;
}

.status-cell {
  width: 40px;
  min-width: 40px;
  height: 44px;
  cursor: pointer; /* Indicates Clickable */
  transition: background-color 0.2s ease;
}
.status-cell:hover {
  filter: brightness(0.95);
  box-shadow: inset 0 0 0 2px rgba(var(--v-theme-primary), 0.5); /* Hover effect */
}
</style>
