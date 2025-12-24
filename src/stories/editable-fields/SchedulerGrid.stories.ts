// @ts-nocheck
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/SchedulerGrid',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {},
  args: {
    formModel: {
      month: 'December',
      year: 2025,
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
  play: async (context) => {},
  args: {
    formModel: {
      month: 'December',
      year: 2025,
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
  play: async (context) => {},
  args: {
    formModel: {
      month: 'December',
      year: 2025,
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
