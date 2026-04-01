import axios from 'axios';

import { useEventBus } from '@vueuse/core';
import { computed, ref } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSource } from './useSource';

const model = ref<Record<string, any>>({});

vi.mock('@/core/state/useFormModelProvider', () => ({
  useInjectedFormModel: () => ({
    getFormModel: computed(() => model.value),
  }),
}));

describe('useSource', () => {
  beforeEach(() => {
    model.value = {};
    vi.restoreAllMocks();
  });

  it('reads options from model when source is path string', async () => {
    model.value = {
      dictionaries: {
        countries: [
          { title: 'Polska', value: 'PL' },
          { title: 'Niemcy', value: 'DE' },
        ],
      },
    };

    const { data } = useSource('dictionaries.countries');

    expect(data.value).toHaveLength(2);
    expect(data.value[0].value).toBe('PL');

    model.value = {
      dictionaries: {
        countries: [{ title: 'Czechy', value: 'CZ' }],
      },
    };

    useEventBus<string>('form-model').emit('model-changed');
    await Promise.resolve();

    expect(data.value).toHaveLength(1);
    expect(data.value[0].value).toBe('CZ');
  });

  it('keeps backward compatibility for source.items', () => {
    const { data, loading } = useSource({
      items: [{ title: 'Aktywny', value: 'ACTIVE' }],
    });

    expect(loading.value).toBe(false);
    expect(data.value[0].value).toBe('ACTIVE');
  });

  it('loads options from source.url', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        content: [{ title: 'Opcja z API', value: 'API' }],
      },
    });

    const { data } = useSource({ url: '/api/options' });
    await Promise.resolve();

    expect(axios.get).toHaveBeenCalledWith('/api/options');
    expect(data.value[0].value).toBe('API');
  });
});

