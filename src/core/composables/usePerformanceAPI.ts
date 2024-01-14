import { nextTick, onBeforeMount, onUpdated, ref } from 'vue';

export default function usePerformanceAPI() {
  let result = ref(0);
  const isShouldMeasureRenderTime = import.meta.env.VITE_ENABLE_RENDER_TEST === 'true';

  if (isShouldMeasureRenderTime) {
    const ID = Math.floor(Math.random() * 100 + 1);
    const START_MARK = 'start-render-vue-schema-form-' + ID;
    const END_MARK = 'end-update-vue-schema-form-' + ID;
    const MEASURE_NAME = 'render-time-' + ID;

    onBeforeMount(() => {
      performance.clearMeasures();
      performance.mark(START_MARK);
    });

    onUpdated(async () => {
      await nextTick();
      await nextTick();
      await nextTick();
      performance.mark(END_MARK);
      performance.measure(MEASURE_NAME, START_MARK, END_MARK);
      const measure = performance.getEntriesByType('measure').find((entry) => entry.name === MEASURE_NAME);

      result.value = measure ? measure.duration : 0;
      console.debug('Render time:', result.value);
    });
  }

  return { result };
}
