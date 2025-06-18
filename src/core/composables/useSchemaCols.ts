import { DisplayBreakpoint, useDisplay } from 'vuetify';

import { computed } from 'vue';

import { EngineField } from '@/types/engine/EngineField';
import { Cols } from '@/types/shared/Cols';
import { Layout } from '@/types/shared/Layout';
import { Offset } from '@/types/shared/Offset';

export function useSchemaCols(schema: EngineField) {
  const display = useDisplay();
  const isOffsetExist = !!schema.layout.offset;
  const offset = computed(() => {
    return isOffsetExist
      ? getOffsetByDisplay(display.name.value, schema.layout.offset as Offset)
      : 0;
  });

  const fillRow = computed(() => {
    return !!schema.layout.fillRow && cols.value < 12;
  });

  const cols = computed((): number => {
    const layout: Layout = schema.layout;
    let resolvedCols: number;

    if (layout.cols === undefined) {
      resolvedCols = 12;
    } else if (typeof layout.cols === 'object') {
      resolvedCols = getColsByDisplay(display.name.value, layout.cols);
    } else {
      resolvedCols = layout.cols as number;
    }

    if (offset.value > 0 && offset.value + resolvedCols > 12) {
      resolvedCols = 12 - offset.value;
    }

    return resolvedCols;
  });

  return { cols, isOffsetExist, offset, fillRow };
}

function getColsByDisplay(displayBreakpoint: DisplayBreakpoint, cols: Cols): number {
  switch (displayBreakpoint) {
    case 'xxl':
      const xxl = cols.xxl;
      return xxl ? xxl : 12;
    case 'xl':
      const xl = cols.xl;
      return xl ? xl : 12;
    case 'lg':
      const lg = cols.lg;
      return lg ? lg : 12;
    case 'md':
      const md = cols.md;
      return md ? md : 12;
    case 'sm':
      const sm = cols.sm;
      return sm ? sm : 12;
    case 'xs':
      const xs = cols.xs;
      return xs ? xs : 12;
  }
}

function getOffsetByDisplay(displayBreakpoint: DisplayBreakpoint, offset: Offset): number {
  switch (displayBreakpoint) {
    case 'xxl':
      const xxl = offset.xxl;
      return xxl ? xxl : 0;
    case 'xl':
      const xl = offset.xl;
      return xl ? xl : 0;
    case 'lg':
      const lg = offset.lg;
      return lg ? lg : 0;
    case 'md':
      const md = offset.md;
      return md ? md : 0;
    case 'sm':
      const sm = offset.sm;
      return sm ? sm : 0;
    case 'xs':
      const xs = offset.xs;
      return xs ? xs : 0;
  }
}
