// @ts-nocheck
import { HttpResponse, http } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";

import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import { Layout } from "../types/shared/Layout";

initialize();

const meta = {
  title: "Development Dictionary",
  component: DevelopmentTable,
  argTypes: {
    schema: { control: "object", description: "Schema u" },
    model: { control: "object", description: "Model" },
    options: { control: "object", description: "Opcje" },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
    },
    model: {},
  },
  loaders: [mswLoader],
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const europeanCitiesBase = [
  "London",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Warsaw",
  "Vienna",
  "Amsterdam",
  "Lisbon",
  "Prague",
  "Athens",
  "Budapest",
  "Brussels",
  "Stockholm",
  "Copenhagen",
  "Dublin",
  "Helsinki",
  "Oslo",
  "Zagreb",
  "Belgrade",
  "Sofia",
  "Vilnius",
  "Riga",
  "Tallinn",
  "Luxembourg",
  "Ljubljana",
  "Bratislava",
  "Valletta",
  "Reykjavik",
  "Andorra la Vella",
];

const europeanCities = Array.from({ length: 100 }, (_, index) => {
  const baseCity = europeanCitiesBase[index % europeanCitiesBase.length]; // Cykl po bazowych miastach
  return {
    id: `${index + 1}`,
    label: `${baseCity} ${index + 1}`, // Zapewnienie unikalności
  };
});

const RESPONSE = [
  http.get("/mock-dictionaries", async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0", 10);
    const size = parseInt(url.searchParams.get("size") || "20", 10);
    const query = url.searchParams.get("query")?.toLowerCase() || "";
    const valueFilter = url.searchParams.get("value-filter");

    let filteredData;

    if (valueFilter) {
      // Jeśli podano `value-filter`, szukamy tylko tego ID
      const ids = valueFilter.split(",").map((id) => id.trim());
      filteredData = europeanCities.filter((item) => ids.includes(item.id));
    } else {
      // Standardowe filtrowanie po nazwie miasta
      filteredData = europeanCities.filter((item) => item.label.toLowerCase().includes(query));
    }

    // Obsługa paginacji
    const totalElements = filteredData.length;
    const offset = page * size;
    const paginatedData = filteredData.slice(offset, offset + size);

    return HttpResponse.json({
      content: paginatedData,
      page: {
        totalElements,
        page,
        itemsPerPage: size,
      },
      empty: paginatedData.length === 0,
      first: page === 0,
      last: offset + size >= totalElements,
      number: page,
      numberOfElements: paginatedData.length,
      pageable: {
        offset,
        pageNumber: page,
        pageSize: size,
        paged: true,
        unpaged: false,
      },
      size,
    });
  }),
];

export const Standard: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content:
            "<strong>Autocomplete:</strong> wybór tylko z wartości słownika<br><strong>Brak modelu na start</strong><br><strong>Zwracaj obiekt:</strong> tak<br><strong>Opcja autowybierania 1 wartości:</strong> tak",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
        dictionary: {
          label: "Słownik autocomplete - wartość tylko z możliwych",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/mock-dictionaries",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE,
    },
  },
};

export const ReturnObjectFalse: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content:
            "<strong>Autocomplete:</strong> wybór tylko z wartości słownika<br><strong>Brak modelu na start</strong><br><strong>Zwracaj obiekt:</strong> nie<br><strong>Opcja autowybierania 1 wartości:</strong> tak",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
        dictionary: {
          label: "Słownik autocomplete - wartość tylko z możliwych",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/mock-dictionaries",
            title: "label",
            value: "id",
            returnObject: false,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE,
    },
  },
};

export const ModelNaStart: Story = {
  args: {
    model: {
      dictionary: "Paris 2",
    },
    schema: {
      type: "object",
      properties: {
        span: {
          content:
            "<strong>Autocomplete:</strong> wybór tylko z wartości słownika<br><strong>Model na start</strong><br><strong>Zwracaj obiekt:</strong> tak<br><strong>Opcja autowybierania 1 wartości:</strong> tak",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
        dictionary: {
          label: "Słownik autocomplete - wartość tylko z możliwych",
          layout: {
            component: "combobox",
            cols: 12,
          },
          source: {
            url: "/mock-dictionaries",
            title: "label",
            value: "id",
            returnObject: false,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE,
    },
  },
};

export const ValueFilter: Story = {
  args: {
    model: {
      deps: {
        item: {
          id: "9",
        },
      },
    },
    schema: {
      type: "object",
      properties: {
        span: {
          content:
            "<strong>Autocomplete:</strong> wybór tylko z wartości słownika<br><strong>Model na start: brak</strong><br><strong>Zwracaj obiekt:</strong> tak<br><strong>Opcja autowybierania 1 wartości:</strong> tak <br><strong>value-filter:</strong> tak",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
        dictionary: {
          label: "Słownik autocomplete - wartość tylko z możliwych",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/mock-dictionaries?value-filter={deps.item.id}",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE,
    },
  },
};

export const ConditionalFilter: Story = {
  args: {
    model: {
      testInput: "test",
      deps: {
        item: {
          id: "9",
        },
      },
    },
    schema: {
      type: "object",
      properties: {
        dictionary: {
          label: "Słownik",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/mock-dictionaries?filter=id=={deps.item.id}&enable-filter=testInput='test'",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE,
    },
  },
};
