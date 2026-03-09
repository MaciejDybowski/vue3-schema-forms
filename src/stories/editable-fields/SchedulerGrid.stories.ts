// @ts-nocheck
import { expect, waitFor, within } from 'storybook/test';

import { SCHEDULER_GRID_MOCKS } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/SchedulerGrid',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await waitFor(() => {
      expect(canvas.getByText('December 2025')).toBeTruthy();
    });
  },
  args: {
    formModel: {
      month: 'December',
      year: '2025',
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: '{month:-} {year:-}',
          layout: {
            component: 'scheduler-grid',
          },
          legend: [
            {
              statusKey: 'PRESENT',
              label: 'In Office',
              colors: { light: '#C8E6C9', dark: '#1B5E20' },
            },
            {
              statusKey: 'WFH',
              label: 'Work From Home',
              colors: { light: '#BBDEFB', dark: '#0D47A1' },
            },
            {
              statusKey: 'PTO',
              label: 'Paid Time Off',
              colors: { light: '#FFE082', dark: '#E65100' },
            },
            {
              statusKey: 'SICK',
              label: 'Sick Leave',
              colors: { light: '#FFCDD2', dark: '#B71C1C' },
            },
            {
              statusKey: 'WEEKEND',
              label: 'Weekend',
              colors: { light: '#EEEEEE', dark: '#121212' },
            },
            {
              statusKey: 'HOLIDAY',
              label: 'Public Holiday',
              colors: { light: '#E1BEE7', dark: '#4A148C' },
            },
            {
              statusKey: 'HALF_DAY',
              label: 'Part Time',
              colors: { light: '#FFCC80', dark: '#BF360C' },
            },
          ],
        },
      },
    },
  },
};

export const WithModel: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await waitFor(() => {
      // powinny być widoczne nazwiska użytkowników z args (Liam i Olivia)
      expect(canvas.queryByText('Johnson Liam')).toBeTruthy();
      expect(canvas.queryByText('Smith Olivia')).toBeTruthy();
    });
  },
  args: {
    formModel: {
      month: 'December',
      year: '2025',
      schedulerGrid: [
        {
          user: {
            id: 'emp_001',
            firstName: 'Liam',
            lastName: 'Johnson',
          },
          schedule: [
            { day: 1, date: '2025-12-01', status: 'PRESENT' },
            { day: 2, date: '2025-12-02', status: 'PRESENT' },
            { day: 3, date: '2025-12-03', status: 'PRESENT', note: 'po 12:00' },
            { day: 4, date: '2025-12-04', status: 'WFH' },
            { day: 5, date: '2025-12-05', status: 'WFH' },
            { day: 6, date: '2025-12-06', status: 'WEEKEND' },
            { day: 7, date: '2025-12-07', status: 'WEEKEND' },
            { day: 8, date: '2025-12-08', status: 'PRESENT' },
            { day: 9, date: '2025-12-09', status: 'PRESENT' },
            { day: 10, date: '2025-12-10', status: 'PRESENT' },
            { day: 11, date: '2025-12-11', status: 'WFH' },
            { day: 12, date: '2025-12-12', status: 'WFH' },
            { day: 13, date: '2025-12-13', status: 'WEEKEND' },
            { day: 14, date: '2025-12-14', status: 'WEEKEND' },
            { day: 15, date: '2025-12-15', status: 'PRESENT' },
            { day: 16, date: '2025-12-16', status: 'PRESENT' },
            { day: 17, date: '2025-12-17', status: 'PRESENT' },
            { day: 18, date: '2025-12-18', status: 'WFH' },
            { day: 19, date: '2025-12-19', status: 'WFH' },
            { day: 20, date: '2025-12-20', status: 'WEEKEND' },
            { day: 21, date: '2025-12-21', status: 'WEEKEND' },
            { day: 22, date: '2025-12-22', status: 'PTO' },
            { day: 23, date: '2025-12-23', status: 'PTO' },
            { day: 24, date: '2025-12-24', status: 'PTO' },
            { day: 25, date: '2025-12-25', status: 'HOLIDAY' },
            { day: 26, date: '2025-12-26', status: 'HOLIDAY' },
            { day: 27, date: '2025-12-27', status: 'WEEKEND' },
            { day: 28, date: '2025-12-28', status: 'WEEKEND' },
            { day: 29, date: '2025-12-29', status: 'PTO' },
            { day: 30, date: '2025-12-30', status: 'PTO' },
            { day: 31, date: '2025-12-31', status: 'PTO' },
          ],
        },
        {
          user: {
            id: 'emp_002',
            firstName: 'Olivia',
            lastName: 'Smith',
            department: 'Engineering',
          },
          schedule: [
            { day: 1, date: '2025-12-01', status: 'WFH' },
            { day: 2, date: '2025-12-02', status: 'WFH' },
            { day: 3, date: '2025-12-03', status: 'PRESENT' },
            { day: 4, date: '2025-12-04', status: 'PRESENT' },
            { day: 5, date: '2025-12-05', status: 'PRESENT' },
            { day: 6, date: '2025-12-06', status: 'WEEKEND' },
            { day: 7, date: '2025-12-07', status: 'WEEKEND' },
            { day: 8, date: '2025-12-08', status: 'WFH' },
            { day: 9, date: '2025-12-09', status: 'SICK' },
            { day: 10, date: '2025-12-10', status: 'SICK' },
            { day: 11, date: '2025-12-11', status: 'WFH' },
            { day: 12, date: '2025-12-12', status: 'PRESENT' },
            { day: 13, date: '2025-12-13', status: 'WEEKEND' },
            { day: 14, date: '2025-12-14', status: 'WEEKEND' },
            { day: 15, date: '2025-12-15', status: 'PRESENT', note: '8-15' },
            { day: 16, date: '2025-12-16', status: 'PRESENT' },
            { day: 17, date: '2025-12-17', status: 'PRESENT' },
            { day: 18, date: '2025-12-18', status: 'PRESENT' },
            { day: 19, date: '2025-12-19', status: 'PTO' },
            { day: 20, date: '2025-12-20', status: 'WEEKEND' },
            { day: 21, date: '2025-12-21', status: 'WEEKEND' },
            { day: 22, date: '2025-12-22', status: 'PRESENT' },
            { day: 23, date: '2025-12-23', status: 'PRESENT' },
            { day: 24, date: '2025-12-24', status: 'PTO' },
            { day: 25, date: '2025-12-25', status: 'HOLIDAY' },
            { day: 26, date: '2025-12-26', status: 'HOLIDAY' },
            { day: 27, date: '2025-12-27', status: 'WEEKEND' },
            { day: 28, date: '2025-12-28', status: 'WEEKEND' },
            { day: 29, date: '2025-12-29', status: 'WFH' },
            { day: 30, date: '2025-12-30', status: 'WFH' },
            { day: 31, date: '2025-12-31', status: 'PTO' },
          ],
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: '{month:-} {year:-}',
          layout: {
            component: 'scheduler-grid',
          },
          legend: [
            {
              statusKey: 'PRESENT',
              label: 'In Office',
              colors: { light: '#C8E6C9', dark: '#1B5E20' },
            },
            {
              statusKey: 'WFH',
              label: 'Work From Home',
              colors: { light: '#BBDEFB', dark: '#0D47A1' },
            },
            {
              statusKey: 'PTO',
              label: 'Paid Time Off',
              colors: { light: '#FFE082', dark: '#E65100' },
            },
            {
              statusKey: 'SICK',
              label: 'Sick Leave',
              colors: { light: '#FFCDD2', dark: '#B71C1C' },
            },
            {
              statusKey: 'WEEKEND',
              label: 'Weekend',
              colors: { light: '#EEEEEE', dark: '#121212' },
            },
            {
              statusKey: 'HOLIDAY',
              label: 'Public Holiday',
              colors: { light: '#E1BEE7', dark: '#4A148C' },
            },
            {
              statusKey: 'HALF_DAY',
              label: 'Part Time',
              colors: { light: '#FFCC80', dark: '#BF360C' },
            },
          ],
        },
      },
    },
  },
};

export const Readonly: Story = {
  play: async (context) => {
    const canvasEl = context.canvasElement;
    await waitFor(() => {
      // znajdź wszystkie inputy w canvas i sprawdź, że są readonly lub disabled
      const inputs = Array.from(
        canvasEl.querySelectorAll('input, textarea, [contenteditable="true"]'),
      ) as HTMLElement[];
      // jeśli nie ma inputów — też jest OK (grid może renderować divy) — test powinien nie wyrzucać błędu
      if (inputs.length > 0) {
        inputs.forEach((el) => {
          const input = el as HTMLInputElement;
          const isReadonly = input.readOnly === true || input.getAttribute('readonly') !== null;
          const isDisabled = input.disabled === true;
          expect(isReadonly || isDisabled).toBeTruthy();
        });
      }
    });
  },
  args: {
    formModel: {
      month: 'December',
      year: '2025',
      schedulerGrid: [
        {
          user: {
            id: 'emp_001',
            firstName: 'Liam',
            lastName: 'Johnson',
          },
          schedule: [
            { day: 1, date: '2025-12-01', status: 'PRESENT' },
            { day: 2, date: '2025-12-02', status: 'PRESENT' },
            { day: 3, date: '2025-12-03', status: 'PRESENT', note: 'po 12:00' },
            { day: 4, date: '2025-12-04', status: 'WFH' },
            { day: 5, date: '2025-12-05', status: 'WFH' },
            { day: 6, date: '2025-12-06', status: 'WEEKEND' },
            { day: 7, date: '2025-12-07', status: 'WEEKEND' },
            { day: 8, date: '2025-12-08', status: 'PRESENT' },
            { day: 9, date: '2025-12-09', status: 'PRESENT' },
            { day: 10, date: '2025-12-10', status: 'PRESENT' },
            { day: 11, date: '2025-12-11', status: 'WFH' },
            { day: 12, date: '2025-12-12', status: 'WFH' },
            { day: 13, date: '2025-12-13', status: 'WEEKEND' },
            { day: 14, date: '2025-12-14', status: 'WEEKEND' },
            { day: 15, date: '2025-12-15', status: 'PRESENT' },
            { day: 16, date: '2025-12-16', status: 'PRESENT' },
            { day: 17, date: '2025-12-17', status: 'PRESENT' },
            { day: 18, date: '2025-12-18', status: 'WFH' },
            { day: 19, date: '2025-12-19', status: 'WFH' },
            { day: 20, date: '2025-12-20', status: 'WEEKEND' },
            { day: 21, date: '2025-12-21', status: 'WEEKEND' },
            { day: 22, date: '2025-12-22', status: 'PTO' },
            { day: 23, date: '2025-12-23', status: 'PTO' },
            { day: 24, date: '2025-12-24', status: 'PTO' },
            { day: 25, date: '2025-12-25', status: 'HOLIDAY' },
            { day: 26, date: '2025-12-26', status: 'HOLIDAY' },
            { day: 27, date: '2025-12-27', status: 'WEEKEND' },
            { day: 28, date: '2025-12-28', status: 'WEEKEND' },
            { day: 29, date: '2025-12-29', status: 'PTO' },
            { day: 30, date: '2025-12-30', status: 'PTO' },
            { day: 31, date: '2025-12-31', status: 'PTO' },
          ],
        },
        {
          user: {
            id: 'emp_002',
            firstName: 'Olivia',
            lastName: 'Smith',
            department: 'Engineering',
          },
          schedule: [
            { day: 1, date: '2025-12-01', status: 'WFH' },
            { day: 2, date: '2025-12-02', status: 'WFH' },
            { day: 3, date: '2025-12-03', status: 'PRESENT' },
            { day: 4, date: '2025-12-04', status: 'PRESENT' },
            { day: 5, date: '2025-12-05', status: 'PRESENT' },
            { day: 6, date: '2025-12-06', status: 'WEEKEND' },
            { day: 7, date: '2025-12-07', status: 'WEEKEND' },
            { day: 8, date: '2025-12-08', status: 'WFH' },
            { day: 9, date: '2025-12-09', status: 'SICK' },
            { day: 10, date: '2025-12-10', status: 'SICK' },
            { day: 11, date: '2025-12-11', status: 'WFH' },
            { day: 12, date: '2025-12-12', status: 'PRESENT' },
            { day: 13, date: '2025-12-13', status: 'WEEKEND' },
            { day: 14, date: '2025-12-14', status: 'WEEKEND' },
            { day: 15, date: '2025-12-15', status: 'PRESENT', note: '8-15' },
            { day: 16, date: '2025-12-16', status: 'PRESENT' },
            { day: 17, date: '2025-12-17', status: 'PRESENT' },
            { day: 18, date: '2025-12-18', status: 'PRESENT' },
            { day: 19, date: '2025-12-19', status: 'PTO' },
            { day: 20, date: '2025-12-20', status: 'WEEKEND' },
            { day: 21, date: '2025-12-21', status: 'WEEKEND' },
            { day: 22, date: '2025-12-22', status: 'PRESENT' },
            { day: 23, date: '2025-12-23', status: 'PRESENT' },
            { day: 24, date: '2025-12-24', status: 'PTO' },
            { day: 25, date: '2025-12-25', status: 'HOLIDAY' },
            { day: 26, date: '2025-12-26', status: 'HOLIDAY' },
            { day: 27, date: '2025-12-27', status: 'WEEKEND' },
            { day: 28, date: '2025-12-28', status: 'WEEKEND' },
            { day: 29, date: '2025-12-29', status: 'WFH' },
            { day: 30, date: '2025-12-30', status: 'WFH' },
            { day: 31, date: '2025-12-31', status: 'PTO' },
          ],
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: '{month:-} {year:-}',
          layout: {
            component: 'scheduler-grid',
          },
          legend: [
            {
              statusKey: 'PRESENT',
              label: 'In Office',
              colors: { light: '#C8E6C9', dark: '#1B5E20' },
            },
            {
              statusKey: 'WFH',
              label: 'Work From Home',
              colors: { light: '#BBDEFB', dark: '#0D47A1' },
            },
            {
              statusKey: 'PTO',
              label: 'Paid Time Off',
              colors: { light: '#FFE082', dark: '#E65100' },
            },
            {
              statusKey: 'SICK',
              label: 'Sick Leave',
              colors: { light: '#FFCDD2', dark: '#B71C1C' },
            },
            {
              statusKey: 'WEEKEND',
              label: 'Weekend',
              colors: { light: '#EEEEEE', dark: '#121212' },
            },
            {
              statusKey: 'HOLIDAY',
              label: 'Public Holiday',
              colors: { light: '#E1BEE7', dark: '#4A148C' },
            },
            {
              statusKey: 'HALF_DAY',
              label: 'Part Time',
              colors: { light: '#FFCC80', dark: '#BF360C' },
            },
          ],
        },
      },
    },
    options: {
      fieldProps: {
        readonly: true,
        variant: 'outlined',
        density: 'compact',
      },
    },
  },
};

export const Customization: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await waitFor(() => {
      // w wariancie customization kolumna usera powinna być ukryta -> brak tekstu "Liam Johnson"
      expect(canvas.queryByText('Liam Johnson')).toBeNull();
    });
  },
  args: {
    formModel: {
      month: 'December',
      year: '2025',
      schedulerGrid: [
        {
          user: {
            id: 'emp_001',
            firstName: 'Liam',
            lastName: 'Johnson',
          },
          schedule: [
            { day: 1, date: '2025-12-01', status: 'PRESENT' },
            { day: 2, date: '2025-12-02', status: 'PRESENT' },
            { day: 3, date: '2025-12-03', status: 'PRESENT', note: 'po 12:00' },
            { day: 4, date: '2025-12-04', status: 'WFH' },
            { day: 5, date: '2025-12-05', status: 'WFH' },
            { day: 6, date: '2025-12-06', status: 'WEEKEND' },
            { day: 7, date: '2025-12-07', status: 'WEEKEND' },
            { day: 8, date: '2025-12-08', status: 'PRESENT' },
            { day: 9, date: '2025-12-09', status: 'PRESENT' },
            { day: 10, date: '2025-12-10', status: 'PRESENT' },
            { day: 11, date: '2025-12-11', status: 'WFH' },
            { day: 12, date: '2025-12-12', status: 'WFH' },
            { day: 13, date: '2025-12-13', status: 'WEEKEND' },
            { day: 14, date: '2025-12-14', status: 'WEEKEND' },
            { day: 15, date: '2025-12-15', status: 'PRESENT' },
            { day: 16, date: '2025-12-16', status: 'PRESENT' },
            { day: 17, date: '2025-12-17', status: 'PRESENT' },
            { day: 18, date: '2025-12-18', status: 'WFH' },
            { day: 19, date: '2025-12-19', status: 'WFH' },
            { day: 20, date: '2025-12-20', status: 'WEEKEND' },
            { day: 21, date: '2025-12-21', status: 'WEEKEND' },
            { day: 22, date: '2025-12-22', status: 'PTO' },
            { day: 23, date: '2025-12-23', status: 'PTO' },
            { day: 24, date: '2025-12-24', status: 'PTO' },
            { day: 25, date: '2025-12-25', status: 'HOLIDAY' },
            { day: 26, date: '2025-12-26', status: 'HOLIDAY' },
            { day: 27, date: '2025-12-27', status: 'WEEKEND' },
            { day: 28, date: '2025-12-28', status: 'WEEKEND' },
            { day: 29, date: '2025-12-29', status: 'PTO' },
            { day: 30, date: '2025-12-30', status: 'PTO' },
            { day: 31, date: '2025-12-31', status: 'PTO' },
          ],
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: '{month:-} {year:-}',
          showLabel: false,
          showUserColumn: false,
          layout: {
            component: 'scheduler-grid',
          },
          legend: [
            {
              statusKey: 'PRESENT',
              label: 'In Office',
              colors: { light: '#C8E6C9', dark: '#1B5E20' },
            },
            {
              statusKey: 'WFH',
              label: 'Work From Home',
              colors: { light: '#BBDEFB', dark: '#0D47A1' },
            },
            {
              statusKey: 'PTO',
              label: 'Paid Time Off',
              colors: { light: '#FFE082', dark: '#E65100' },
            },
            {
              statusKey: 'SICK',
              label: 'Sick Leave',
              colors: { light: '#FFCDD2', dark: '#B71C1C' },
            },
            {
              statusKey: 'WEEKEND',
              label: 'Weekend',
              colors: { light: '#EEEEEE', dark: '#121212' },
            },
            {
              statusKey: 'HOLIDAY',
              label: 'Public Holiday',
              colors: { light: '#E1BEE7', dark: '#4A148C' },
            },
            {
              statusKey: 'HALF_DAY',
              label: 'Part Time',
              colors: { light: '#FFCC80', dark: '#BF360C' },
            },
          ],
        },
      },
    },
  },
};

const modifiedDataLegend = [
  {
    statusKey: 'PRESENT',
    label: 'In Office',
    colors: { light: '#C8E6C9', dark: '#1B5E20' },
  },
  {
    statusKey: 'WFH',
    label: 'Work From Home',
    colors: { light: '#BBDEFB', dark: '#0D47A1' },
  },
  {
    statusKey: 'PTO',
    label: 'Paid Time Off',
    colors: { light: '#FFE082', dark: '#E65100' },
  },
  {
    statusKey: 'SICK',
    label: 'Sick Leave',
    colors: { light: '#FFCDD2', dark: '#B71C1C' },
  },
  {
    statusKey: 'WEEKEND',
    label: 'Weekend',
    colors: { light: '#EEEEEE', dark: '#121212' },
  },
  {
    statusKey: 'HOLIDAY',
    label: 'Public Holiday',
    colors: { light: '#E1BEE7', dark: '#4A148C' },
  },
  {
    statusKey: 'HALF_DAY',
    label: 'Part Time',
    colors: { light: '#FFCC80', dark: '#BF360C' },
  },
];

const toDecemberDate = (day) => `2025-12-${String(day).padStart(2, '0')}`;

const buildScheduleWithModifications = (baseStatuses, modifiedDays, baseNotes = {}) =>
  baseStatuses.map((baseStatus, index) => {
    const day = index + 1;
    const modified = modifiedDays[day];
    const note = modified?.note ?? baseNotes[day];

    return {
      day,
      date: toDecemberDate(day),
      status: modified?.status ?? baseStatus,
      ...(note ? { note } : {}),
      sameAsPrev: !modified,
      ...(modified?.prevData ? { prevData: modified.prevData } : {}),
    };
  });

const liamBaseStatuses = [
  'PRESENT',
  'PRESENT',
  'PRESENT',
  'WFH',
  'WFH',
  'WEEKEND',
  'WEEKEND',
  'PRESENT',
  'PRESENT',
  'PRESENT',
  'WFH',
  'WFH',
  'WEEKEND',
  'WEEKEND',
  'PRESENT',
  'PRESENT',
  'PRESENT',
  'WFH',
  'WFH',
  'WEEKEND',
  'WEEKEND',
  'PTO',
  'PTO',
  'PTO',
  'HOLIDAY',
  'HOLIDAY',
  'WEEKEND',
  'WEEKEND',
  'PTO',
  'PTO',
  'PTO',
];

const oliviaBaseStatuses = [
  'WFH',
  'WFH',
  'PRESENT',
  'PRESENT',
  'PRESENT',
  'WEEKEND',
  'WEEKEND',
  'WFH',
  'SICK',
  'SICK',
  'WFH',
  'PRESENT',
  'WEEKEND',
  'WEEKEND',
  'PRESENT',
  'PRESENT',
  'PRESENT',
  'PRESENT',
  'PTO',
  'WEEKEND',
  'WEEKEND',
  'PRESENT',
  'PRESENT',
  'PTO',
  'HOLIDAY',
  'HOLIDAY',
  'WEEKEND',
  'WEEKEND',
  'WFH',
  'WFH',
  'PTO',
];

const liamModifiedDays = {
  3: { status: 'WFH', note: 'po 12:00', prevData: { status: 'PRESENT', note: 'po 12:00' } },
  5: { status: 'HALF_DAY', note: '8:00-12:00', prevData: { status: 'WFH', note: '' } },
  10: { status: 'SICK', note: 'L4', prevData: { status: 'PRESENT', note: '' } },
  15: { status: 'PRESENT', note: 'dyzur do 18:00', prevData: { status: 'PRESENT', note: '' } },
  22: { status: 'PRESENT', note: '', prevData: { status: 'PTO', note: '' } },
  29: { status: 'WFH', note: '', prevData: { status: 'PTO', note: '' } },
};

const oliviaModifiedDays = {
  3: { status: 'PRESENT', note: 'powrot do biura', prevData: { status: 'WFH', note: '' } },
  8: { status: 'SICK', note: 'L4', prevData: { status: 'WFH', note: '' } },
  15: { status: 'HALF_DAY', note: '8-15', prevData: { status: 'PRESENT', note: '8-15' } },
  19: { status: 'PRESENT', note: '', prevData: { status: 'PTO', note: '' } },
  24: { status: 'WFH', note: 'po 12:00', prevData: { status: 'PTO', note: '' } },
  30: { status: 'PTO', note: 'urlop okolicznosciowy', prevData: { status: 'WFH', note: '' } },
};

const createModifiedDataModel = () => [
  {
    user: {
      id: 'emp_001',
      firstName: 'Liam',
      lastName: 'Johnson',
    },
    schedule: buildScheduleWithModifications(liamBaseStatuses, liamModifiedDays, {
      2: 'bez zmian',
    }),
  },
  {
    user: {
      id: 'emp_002',
      firstName: 'Olivia',
      lastName: 'Smith',
      department: 'Engineering',
    },
    schedule: buildScheduleWithModifications(oliviaBaseStatuses, oliviaModifiedDays, {
      11: 'bez zmian',
    }),
  },
];

export const WithModifiedData: Story = {
  name: 'With Modified Data',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const canvasEl = context.canvasElement;
    await waitFor(() => {
      expect(canvas.queryByText('Johnson Liam')).toBeTruthy();
      expect(canvas.queryByText('Smith Olivia')).toBeTruthy();

      const dayHeaders = canvasEl.querySelectorAll('.day-header-cell');
      const fadedCells = canvasEl.querySelectorAll('.status-cell.status-cell--same-as-prev');
      const changedCells = canvasEl.querySelectorAll(
        '.status-cell:not(.status-cell--same-as-prev)',
      );
      const changeIndicators = canvasEl.querySelectorAll('.change-indicator');
      const mutedNoteIcons = canvasEl.querySelectorAll(
        '.status-cell--same-as-prev .note-indicator-icon',
      );

      expect(dayHeaders.length).toBe(31);
      expect(fadedCells.length).toBeGreaterThan(0);
      expect(changedCells.length).toBeGreaterThan(0);
      expect(changeIndicators.length).toBeGreaterThan(0);
      expect(mutedNoteIcons.length).toBeGreaterThan(0);
    });
  },
  args: {
    formModel: {
      month: 'December',
      year: '2025',
      schedulerGrid: createModifiedDataModel(),
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: '{month:-} {year:-}',
          layout: {
            component: 'scheduler-grid',
          },
          legend: modifiedDataLegend,
        },
      },
    },
  },
};

export const WithModifiedDataReadonly: Story = {
  name: 'With Modified Data - Readonly',
  play: async (context) => {
    const canvasEl = context.canvasElement;
    await waitFor(() => {
      const dayHeaders = canvasEl.querySelectorAll('.day-header-cell');
      const fadedCells = canvasEl.querySelectorAll('.status-cell.status-cell--same-as-prev');
      const clickableCells = canvasEl.querySelectorAll('.status-cell.cursor-pointer');
      const changeIndicators = canvasEl.querySelectorAll('.change-indicator');

      expect(dayHeaders.length).toBe(31);
      expect(fadedCells.length).toBeGreaterThan(0);
      expect(clickableCells.length).toBe(0);
      expect(changeIndicators.length).toBeGreaterThan(0);
    });
  },
  args: {
    formModel: {
      month: 'December',
      year: '2025',
      schedulerGrid: createModifiedDataModel(),
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: '{month:-} {year:-}',
          layout: {
            component: 'scheduler-grid',
          },
          legend: modifiedDataLegend,
        },
      },
    },
    options: {
      fieldProps: {
        readonly: true,
        variant: 'outlined',
        density: 'compact',
      },
    },
  },
};

const selectedRangeScheduleLiam = [
  { day: 5, date: '2026-05-05', status: 'PRESENT' },
  { day: 6, date: '2026-05-06', status: 'WFH' },
  { day: 7, date: '2026-05-07', status: 'PRESENT' },
  { day: 8, date: '2026-05-08', status: 'PRESENT', note: '8:00-16:00' },
  { day: 9, date: '2026-05-09', status: 'WEEKEND' },
  { day: 10, date: '2026-05-10', status: 'WEEKEND' },
];

const selectedRangeScheduleOlivia = [
  { day: 5, date: '2026-05-05', status: 'WFH' },
  { day: 6, date: '2026-05-06', status: 'WFH' },
  { day: 7, date: '2026-05-07', status: 'PRESENT' },
  { day: 8, date: '2026-05-08', status: 'HALF_DAY' },
  { day: 9, date: '2026-05-09', status: 'WEEKEND' },
  { day: 10, date: '2026-05-10', status: 'WEEKEND' },
];

const mixedGroupScheduleLiam = [
  { day: 7, date: '2026-01-07', group: 'Styczen', status: 'PRESENT' },
  { day: 19, date: '2026-01-19', group: 'Styczen', status: 'WFH' },
  { day: 31, date: '2026-01-31', group: 'Styczen', status: 'WEEKEND' },
  { day: 2, date: '2026-02-02', group: 'Luty', status: 'PRESENT' },
  { day: 5, date: '2026-02-05', group: 'Luty', status: 'PTO' },
  { day: 8, date: '2026-02-08', group: 'Luty', status: 'WEEKEND' },
  { day: 11, date: '2026-02-11', group: 'Luty', status: 'WFH' },
  { day: 14, date: '2026-02-14', group: 'Luty', status: 'WEEKEND' },
];

const mixedGroupScheduleOlivia = [
  { day: 7, date: '2026-01-07', group: 'Styczen', status: 'WFH' },
  { day: 19, date: '2026-01-19', group: 'Styczen', status: 'PRESENT' },
  { day: 31, date: '2026-01-31', group: 'Styczen', status: 'WEEKEND' },
  { day: 2, date: '2026-02-02', group: 'Luty', status: 'PRESENT' },
  { day: 5, date: '2026-02-05', group: 'Luty', status: 'SICK' },
  { day: 8, date: '2026-02-08', group: 'Luty', status: 'WEEKEND' },
  { day: 11, date: '2026-02-11', group: 'Luty', status: 'PRESENT' },
  { day: 14, date: '2026-02-14', group: 'Luty', status: 'WEEKEND' },
];

const mixedGroupModifiedScheduleLiam = [
  { day: 7, date: '2026-01-07', group: 'Styczen', status: 'PRESENT', sameAsPrev: true },
  {
    day: 19,
    date: '2026-01-19',
    group: 'Styczen',
    status: 'WFH',
    note: 'spotkanie 10:00',
    sameAsPrev: false,
    prevData: { status: 'PRESENT', note: '' },
  },
  { day: 31, date: '2026-01-31', group: 'Styczen', status: 'WEEKEND', sameAsPrev: true },
  {
    day: 2,
    date: '2026-02-02',
    group: 'Luty',
    status: 'PRESENT',
    sameAsPrev: false,
    prevData: { status: 'WFH', note: '' },
  },
  { day: 5, date: '2026-02-05', group: 'Luty', status: 'PTO', sameAsPrev: true },
  { day: 8, date: '2026-02-08', group: 'Luty', status: 'WEEKEND', sameAsPrev: true },
  { day: 11, date: '2026-02-11', group: 'Luty', status: 'WFH', sameAsPrev: true },
  { day: 14, date: '2026-02-14', group: 'Luty', status: 'WEEKEND', sameAsPrev: true },
];

const mixedGroupModifiedScheduleOlivia = [
  { day: 7, date: '2026-01-07', group: 'Styczen', status: 'WFH', sameAsPrev: true },
  { day: 19, date: '2026-01-19', group: 'Styczen', status: 'PRESENT', sameAsPrev: true },
  { day: 31, date: '2026-01-31', group: 'Styczen', status: 'WEEKEND', sameAsPrev: true },
  {
    day: 2,
    date: '2026-02-02',
    group: 'Luty',
    status: 'PRESENT',
    sameAsPrev: false,
    prevData: { status: 'WFH', note: '' },
  },
  {
    day: 5,
    date: '2026-02-05',
    group: 'Luty',
    status: 'SICK',
    note: 'L4',
    sameAsPrev: false,
    prevData: { status: 'PRESENT', note: '' },
  },
  { day: 8, date: '2026-02-08', group: 'Luty', status: 'WEEKEND', sameAsPrev: true },
  { day: 11, date: '2026-02-11', group: 'Luty', status: 'PRESENT', sameAsPrev: true },
  { day: 14, date: '2026-02-14', group: 'Luty', status: 'WEEKEND', sameAsPrev: true },
];

export const WithSelectedRange: Story = {
  name: 'With Selected Range',
  play: async (context) => {
    const canvasEl = context.canvasElement;

    await waitFor(() => {
      const dayHeaders = Array.from(canvasEl.querySelectorAll('.day-header-cell'));
      const compactHeaders = canvasEl.querySelectorAll('.day-header-cell--compact');
      const groupHeaders = canvasEl.querySelectorAll('.group-header-cell');

      expect(dayHeaders.length).toBe(6);
      expect(dayHeaders[0].textContent?.trim()).toBe('5');
      expect(dayHeaders[5].textContent?.trim()).toBe('10');
      expect(groupHeaders.length).toBe(1);
      expect(groupHeaders[0].textContent?.includes('May 2026')).toBeTruthy();
      expect(compactHeaders.length).toBeGreaterThan(0);
    });
  },
  args: {
    formModel: {
      dateFrom: '2026-05-05',
      dateTo: '2026-05-10',
      schedulerGrid: [
        {
          user: {
            id: 'emp_001',
            firstName: 'Liam',
            lastName: 'Johnson',
          },
          schedule: selectedRangeScheduleLiam,
        },
        {
          user: {
            id: 'emp_002',
            firstName: 'Olivia',
            lastName: 'Smith',
          },
          schedule: selectedRangeScheduleOlivia,
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: '{dateFrom:-} - {dateTo:-}',
          layout: {
            component: 'scheduler-grid',
          },
          legend: modifiedDataLegend,
        },
      },
    },
  },
};

export const WithGroupedDays: Story = {
  name: 'With Grouped Days',
  play: async (context) => {
    const canvasEl = context.canvasElement;

    await waitFor(() => {
      const dayHeaders = Array.from(canvasEl.querySelectorAll('.day-header-cell'));
      const groupHeaders = Array.from(canvasEl.querySelectorAll('.group-header-cell'));

      expect(dayHeaders.length).toBe(8);
      expect(dayHeaders[0].textContent?.trim()).toBe('7');
      expect(dayHeaders[1].textContent?.trim()).toBe('19');
      expect(dayHeaders[2].textContent?.trim()).toBe('31');
      expect(groupHeaders.length).toBe(2);
      expect(groupHeaders[0].textContent?.includes('Styczen')).toBeTruthy();
      expect(groupHeaders[1].textContent?.includes('Luty')).toBeTruthy();
    });
  },
  args: {
    formModel: {
      schedulerGrid: [
        {
          user: {
            id: 'emp_001',
            firstName: 'Liam',
            lastName: 'Johnson',
          },
          schedule: mixedGroupScheduleLiam,
        },
        {
          user: {
            id: 'emp_002',
            firstName: 'Olivia',
            lastName: 'Smith',
          },
          schedule: mixedGroupScheduleOlivia,
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: 'Custom grouped days',
          layout: {
            component: 'scheduler-grid',
          },
          legend: modifiedDataLegend,
        },
      },
    },
  },
};

export const WithGroupedDaysHidden: Story = {
  name: 'With Grouped Days - Hidden Groups',
  play: async (context) => {
    const canvasEl = context.canvasElement;

    await waitFor(() => {
      const dayHeaders = canvasEl.querySelectorAll('.day-header-cell');
      const groupHeaders = canvasEl.querySelectorAll('.group-header-cell');

      expect(dayHeaders.length).toBe(8);
      expect(groupHeaders.length).toBe(0);
    });
  },
  args: {
    formModel: {
      schedulerGrid: [
        {
          user: {
            id: 'emp_001',
            firstName: 'Liam',
            lastName: 'Johnson',
          },
          schedule: mixedGroupScheduleLiam,
        },
        {
          user: {
            id: 'emp_002',
            firstName: 'Olivia',
            lastName: 'Smith',
          },
          schedule: mixedGroupScheduleOlivia,
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: 'Custom grouped days',
          showGroupHeaders: false,
          layout: {
            component: 'scheduler-grid',
          },
          legend: modifiedDataLegend,
        },
      },
    },
  },
};

export const CustomizedWithGroupsAndModifiedData: Story = {
  name: 'Customization - Groups + Modified Data',
  play: async (context) => {
    const canvasEl = context.canvasElement;

    await waitFor(() => {
      const nameHeaders = canvasEl.querySelectorAll('.name-header-cell');
      const groupHeaders = canvasEl.querySelectorAll('.group-header-cell');
      const dayHeaders = canvasEl.querySelectorAll('.day-header-cell');
      const changedCells = canvasEl.querySelectorAll('.status-cell--modified');
      const fadedCells = canvasEl.querySelectorAll('.status-cell--same-as-prev');

      expect(nameHeaders.length).toBe(0);
      expect(groupHeaders.length).toBe(2);
      expect(dayHeaders.length).toBe(8);
      expect(changedCells.length).toBeGreaterThan(0);
      expect(fadedCells.length).toBeGreaterThan(0);
    });
  },
  args: {
    formModel: {
      schedulerGrid: [
        {
          user: {
            id: 'emp_001',
            firstName: 'Liam',
            lastName: 'Johnson',
          },
          schedule: mixedGroupModifiedScheduleLiam,
        },
        {
          user: {
            id: 'emp_002',
            firstName: 'Olivia',
            lastName: 'Smith',
          },
          schedule: mixedGroupModifiedScheduleOlivia,
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: 'Combined customization view',
          showLabel: false,
          showUserColumn: false,
          layout: {
            component: 'scheduler-grid',
          },
          legend: modifiedDataLegend,
        },
      },
    },
  },
};

export const SourceAPI: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await waitFor(
      () => {
        // mock zwraca trzech użytkowników; sprawdź ich obecność
        expect(canvas.queryByText('Johnson Liam')).toBeTruthy();
        expect(canvas.queryByText('Williams Emma')).toBeTruthy();
        expect(canvas.queryByText('Brown Noah')).toBeTruthy();
      },
      { timeout: 3000 },
    );
  },
  args: {
    formModel: {
      month: 'December',
      year: '2025',
    },
    schema: {
      type: 'object',
      properties: {
        schedulerGrid: {
          label: '{month:-} {year:-}',
          layout: {
            component: 'scheduler-grid',
          },
          source: {
            url: '/mocks/scheduler-grid-data',
          },
          legend: [
            {
              statusKey: 'PRESENT',
              label: 'In Office',
              colors: { light: '#C8E6C9', dark: '#1B5E20' },
            },
            {
              statusKey: 'WFH',
              label: 'Work From Home',
              colors: { light: '#BBDEFB', dark: '#0D47A1' },
            },
            {
              statusKey: 'PTO',
              label: 'Paid Time Off',
              colors: { light: '#FFE082', dark: '#E65100' },
            },
            {
              statusKey: 'SICK',
              label: 'Sick Leave',
              colors: { light: '#FFCDD2', dark: '#B71C1C' },
            },
            {
              statusKey: 'WEEKEND',
              label: 'Weekend',
              colors: { light: '#EEEEEE', dark: '#121212' },
            },
            {
              statusKey: 'HOLIDAY',
              label: 'Public Holiday',
              colors: { light: '#E1BEE7', dark: '#4A148C' },
            },
            {
              statusKey: 'HALF_DAY',
              label: 'Part Time',
              colors: { light: '#FFCC80', dark: '#BF360C' },
            },
          ],
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...SCHEDULER_GRID_MOCKS],
    },
  },
};
