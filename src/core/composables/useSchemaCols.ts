import { DisplayBreakpoint, useDisplay } from "vuetify";
import { computed } from "vue";

import { EngineField } from "@/types/engine";
import { Cols } from "@/types/shared/Cols";
import { Layout } from "@/types/shared/Layout";

export function useSchemaCols(schema: EngineField) {
  const display = useDisplay();
  const isOffsetExist = !!schema.layout.offset;
  const offset = isOffsetExist ? (schema.layout.offset as number) : 0;
  const hideField = !schema.layout.hide;

  const fillRow = computed(() => {
    return !!schema.layout.fillRow && cols.value < 12;
  });

  const cols = computed((): number => {
    const layout: Layout = schema.layout;
    if (layout.cols === undefined) {
      return 12;
    }
    if (typeof layout.cols === "object") {
      return getColsByDisplay(display.name.value, layout.cols);
    } else {
      return schema.layout.cols as number;
    }
  });

  const completionOfRow = computed((): number => {
    return isOffsetExist ? cols.value - offset : 12 - cols.value;
  });

  return { cols, completionOfRow, isOffsetExist, offset, fillRow, hideField };
}

function getColsByDisplay(displayBreakpoint: DisplayBreakpoint, cols: Cols): number {
  switch (displayBreakpoint) {
    case "xxl":
      const xxl = cols.xxl;
      return xxl ? xxl : 12;
    case "xl":
      const xl = cols.xl;
      return xl ? xl : 12;
    case "lg":
      const lg = cols.lg;
      return lg ? lg : 12;
    case "md":
      const md = cols.md;
      return md ? md : 12;
    case "sm":
      const sm = cols.sm;
      return sm ? sm : 12;
    case "xs":
      const xs = cols.xs;
      return xs ? xs : 12;
  }
}
