import { onBeforeMount, ref } from 'vue';

export default function usePerformanceAPI() {
  let result = ref<any>(null); // Start z null, aby wykryć brak pomiaru
  let stopMeasure = () => {};
  const isShouldMeasureRenderTime = import.meta.env.VITE_ENABLE_RENDER_TEST === 'true';

  if (isShouldMeasureRenderTime) {
    const ID = Math.floor(Math.random() * 100 + 1);
    const START_MARK = `start-render-vue-schema-form-${ID}`;
    const END_MARK = `end-render-vue-schema-form-${ID}`;
    const MEASURE_NAME = `render-time-${ID}`;

    onBeforeMount(() => {
      performance.clearMarks();
      performance.clearMeasures();
      performance.mark(START_MARK);
    });

    // Nasłuchujemy na zdarzenie "isFormReady" do zakończenia pomiaru
    stopMeasure = () => {
      if (isShouldMeasureRenderTime) {
        performance.mark(END_MARK);
        performance.measure(MEASURE_NAME, START_MARK, END_MARK);
        const measure = performance.getEntriesByName(MEASURE_NAME)[0];

        if (measure) {
          result.value = measure.duration;
          console.debug('Final Render Time:', result.value);
        }
      }
    };

    return { result, stopMeasure };
  }

  return { result, stopMeasure };
}
