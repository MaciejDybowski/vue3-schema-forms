// @ts-nocheck
import { HttpResponse, http } from 'msw';

export const names = ['🥝 Kiwi', '🍏 Green Apple', '🍉 Watermelon', '🍌 Banana', '🍇 Grape'];
export const locations = ['New Zealand', 'Brazil', 'USA', 'Italy', 'South Africa'];
export const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const generatePageData = (page, size) => {
  const totalItems = 100; // Możemy łatwo dostosować liczbę elementów
  const startIndex = page * size;
  const endIndex = startIndex + size;

  const data = Array.from({ length: totalItems }, (_, index) => ({
    id: index,
    name: randomItem(names),
    location: randomItem(locations),
    height: Math.floor(Math.random() * 10000) + 1000, // Generowanie wysokości między 1000 a 11000
    base: Math.floor(Math.random() * 100) + 10, // 10 - 100
    volume: Math.random() * (0.01 - 0.00001) + 0.00001, // 0.00001 - 0.01
    dataId: index + 1,
    alerts: generateAlerts(),
    decimalPlaces: 2,
    heightOptions: [
      { title: 'Height:10', value: 10, description: 'Combined: height 10' },
      { title: 'Height:20', value: 20, description: 'Combined: height 20' },
      { title: 'Height:30', value: 30, description: 'Combined: height 30' },
    ],
  }));

  return data.slice(startIndex, endIndex);
};

export const generateAlerts = () => {
  const alertTypes = ['warning', 'info', 'error'];
  const alertMessages = [
    'no package quantity defined for product, using one package for calculations',
    'no retail price factor defined, cannot calculate customer margin and retail prices',
    'unknown product volume, cannot calculate transport cost',
    'product is on backorder, delivery will be delayed',
    'product quantity is low, please restock',
    'customer margin is negative, review pricing strategy',
    'price mismatch between supplier and customer system',
    'invalid product data, review inventory management system',
  ];

  const alertsCount = Math.floor(Math.random() * 3) + 1; // Random number of alerts between 1 and 3
  const alerts = [];

  for (let i = 0; i < alertsCount; i++) {
    alerts.push({
      type: randomItem(alertTypes),
      message: randomItem(alertMessages),
    });
  }

  return alerts;
};

export const UPDATE_TABLE_ROW = [
  http.post('/mock-data/table-view-mock/:id', async ({ params }) => {
    const { id } = params; // Pobieramy dynamiczne ID z URL

    return HttpResponse.json({
      content: {
        name: randomItem(names),
        location: randomItem(locations),
        height: Math.floor(Math.random() * 5000) + 5000, // 5000 - 10000
        base: Math.floor(Math.random() * 100) + 10, // 10 - 100
        volume: (Math.random() * 0.01).toFixed(5), // 0.00001 - 0.01
        dataId: Number(id),
        heightOptions: [
          { title: 'Height:10', value: 10, description: 'Combined: height 10' },
          { title: 'Height:20', value: 20, description: 'Combined: height 20' },
          { title: 'Height:30', value: 30, description: 'Combined: height 30' },
        ],
      },
      aggregates: {
        height: Math.floor(Math.random() * 9999),
      },
    });
  }),
];

export const TABLE_PAGE_WITH_AGGREGATES = [
  http.get('/mock-data/table-view-mock', async (req, res, ctx) => {
    const url = req.request.url;
    const urlParams = new URLSearchParams(url.split('?')[1]);

    const page = urlParams.get('page');
    const size = urlParams.get('size');

    const pageData = generatePageData(parseInt(page), parseInt(size));
    const aggregates = {
      height: pageData.reduce((total, item) => total + item.height, 0),
    };

    if (pageData.length === 0) {
      return HttpResponse.text('No data available for the requested page', 404);
    }

    return HttpResponse.json({
      content: pageData,
      page: {
        totalElements: 100,
        page: parseInt(page),
        itemsPerPage: parseInt(size),
      },
      aggregates,
    });
  }),
];

export const TABLE_PAGE_WITHOUT_AGGREGATES = [
  http.get('/mock-data/table-view-mock', async (req, res, ctx) => {
    const url = req.request.url;
    const urlParams = new URLSearchParams(url.split('?')[1]);

    const page = urlParams.get('page');
    const size = urlParams.get('size');
    const pageData = generatePageData(parseInt(page), parseInt(size));

    if (pageData.length === 0) {
      return HttpResponse.text('No data available for the requested page', 404);
    }

    return HttpResponse.json({
      content: pageData,
      page: {
        totalElements: 100,
        page: parseInt(page),
        itemsPerPage: parseInt(size),
      },
    });
  }),
];

export const TABLE_PAGE_WITHOUT_AGGREGATES_ZERO = [
  http.get('/mock-data/table-view-mock-zero', async (req, res, ctx) => {
    return HttpResponse.json({
      content: [],
      page: {
        totalElements: 0,
        page: 0,
        itemsPerPage: 25,
      },
    });
  }),
];

const allCurrencies = [
  { id: 'USD', label: 'US Dollar' },
  { id: 'EUR', label: 'Euro' },
  { id: 'GBP', label: 'British Pound' },
  { id: 'JPY', label: 'Japanese Yen' },
  { id: 'CHF', label: 'Swiss Franc' },
  { id: 'AUD', label: 'Australian Dollar' },
  { id: 'CAD', label: 'Canadian Dollar' },
  { id: 'NZD', label: 'New Zealand Dollar' },
  { id: 'SEK', label: 'Swedish Krona' },
  { id: 'NOK', label: 'Norwegian Krone' },
  { id: 'DKK', label: 'Danish Krone' },
  { id: 'PLN', label: 'Polish Zloty' },
  { id: 'CZK', label: 'Czech Koruna' },
  { id: 'HUF', label: 'Hungarian Forint' },
  { id: 'RUB', label: 'Russian Ruble' },
  { id: 'CNY', label: 'Chinese Yuan' },
  { id: 'INR', label: 'Indian Rupee' },
  { id: 'BRL', label: 'Brazilian Real' },
  { id: 'ZAR', label: 'South African Rand' },
  { id: 'MXN', label: 'Mexican Peso' },
];

// Funkcja do paginacji walut
const generateCurrenciesPage = (page, size) => {
  const startIndex = page * size;
  const endIndex = startIndex + size;
  return allCurrencies.slice(startIndex, endIndex);
};

export const CURRENCIES_REQUEST = http.get('/mock-data/currencies', async (req, res, ctx) => {
  const url = req.request.url;
  const urlParams = new URLSearchParams(url.split('?')[1]);

  const page = parseInt(urlParams.get('page') ?? '0');
  const size = parseInt(urlParams.get('size') ?? '50');

  const currencies = generateCurrenciesPage(page, size);

  if (currencies.length === 0) {
    return HttpResponse.text('No currencies available for the requested page', { status: 404 });
  }

  return HttpResponse.json({
    content: currencies,
    page: {
      totalElements: allCurrencies.length,
      page,
      itemsPerPage: size,
    },
  });
});

export const MOCK_REQUEST_CURRENCY = [
  http.get('/mocks/currencies', async ({ request }) => {
    const url = new URL(request.url);
    const valueFilter = url.searchParams.get('value-filter');
    const query = url.searchParams.get('query');
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 20;

    const allCurrencies = [
      { id: 'AFN', label: 'Afgani', digitsAfterDecimal: '2', labels: 'the-best' },
      { id: 'ALL', label: 'Lek', digitsAfterDecimal: '3', labels: 'the-least' },
      { id: 'AMD', label: 'Dram', digitsAfterDecimal: '2' },
      { id: 'ANG', label: 'Gulden Antyli Holenderskich', digitsAfterDecimal: '2' },
      { id: 'AOA', label: 'Kwanza', digitsAfterDecimal: '2' },
      { id: 'ARS', label: 'Peso argentyńskie', digitsAfterDecimal: '2' },
      { id: 'AUD', label: 'Dolar australijski', digitsAfterDecimal: '2' },
      { id: 'AWG', label: 'Florin arubański', digitsAfterDecimal: '2' },
      { id: 'AZN', label: 'Manat azerbejdżański', digitsAfterDecimal: '2' },
      { id: 'BAM', label: 'Marka zamienna', digitsAfterDecimal: '2' },
      { id: 'BBD', label: 'Dolar barbadoski', digitsAfterDecimal: '2' },
      { id: 'BDT', label: 'Taka', digitsAfterDecimal: '2' },
      { id: 'BGN', label: 'Lew', digitsAfterDecimal: '2' },
      { id: 'BHD', label: 'Dinar bahrajski', digitsAfterDecimal: '3' },
      { id: 'BIF', label: 'Frank burundyjski', digitsAfterDecimal: '0' },
      { id: 'BMD', label: 'Dolar bermudzki', digitsAfterDecimal: '2' },
      { id: 'BND', label: 'Dolar brunejski', digitsAfterDecimal: '2' },
      { id: 'BOB', label: 'Boliviano', digitsAfterDecimal: '2' },
      { id: 'BOV', label: 'MVDOL boliwijski', digitsAfterDecimal: '2' },
      { id: 'BRL', label: 'Real brazylijski', digitsAfterDecimal: '2' },
    ];

    if (valueFilter) {
      // Jeśli value-filter jest ustawiony, zwracamy tylko jedną walutę
      return HttpResponse.json({
        content: [
          {
            id: valueFilter,
            label: 'Polski Złoty', // Tutaj możesz dodać lookup po ID jeśli chcesz dynamicznie
          },
        ],
        pagination: { page, size },
      });
    }

    let filteredCurrencies = allCurrencies;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredCurrencies = allCurrencies.filter(
        (currency) =>
          currency.id.toLowerCase().includes(lowerQuery) ||
          currency.label.toLowerCase().includes(lowerQuery),
      );
    }

    // Paginacja
    const start = page * size;
    const end = start + size;
    const paginatedCurrencies = filteredCurrencies.slice(start, end);

    return HttpResponse.json({
      content: paginatedCurrencies,
      pagination: {
        page,
        size,
      },
    });
  }),
];

export const RESPONSE_DICTIONARY = [
  http.get('/mock-dictionaries', async ({ request }) => {
    const europeanCitiesBase = [
      'London',
      'Paris',
      'Berlin',
      'Madrid',
      'Rome',
      'Warsaw',
      'Vienna',
      'Amsterdam',
      'Lisbon',
      'Prague',
      'Athens',
      'Budapest',
      'Brussels',
      'Stockholm',
      'Copenhagen',
      'Dublin',
      'Helsinki',
      'Oslo',
      'Zagreb',
      'Belgrade',
      'Sofia',
      'Vilnius',
      'Riga',
      'Tallinn',
      'Luxembourg',
      'Ljubljana',
      'Bratislava',
      'Valletta',
      'Reykjavik',
      'Andorra la Vella',
    ];

    const europeanCities = Array.from({ length: 100 }, (_, index) => {
      const baseCity = europeanCitiesBase[index % europeanCitiesBase.length]; // Cykl po bazowych miastach
      return {
        id: `${index + 1}`,
        label: `${baseCity} ${index + 1}`, // Zapewnienie unikalności
      };
    });

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);
    const query = url.searchParams.get('query')?.toLowerCase() || '';
    const valueFilter = url.searchParams.get('value-filter');

    let filteredData;

    if (valueFilter) {
      // Jeśli podano `value-filter`, szukamy tylko tego ID
      const ids = valueFilter.split(',').map((id) => id.trim());
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

export const IMAGE_REQUEST = http.get('/mocks/products/images', async (req, res, ctx) => {
  // TODO - try return sample image
  return null;
});

export const BTN_MOCK = [
  http.post('/mocks/files/item-1', async (req, res, ctx) => {
    return HttpResponse.json({});
  }),
];

export const LOCATION_MOCK_REQUEST = http.get(
  'https://nominatim.openstreetmap.org/search',
  async (req, res, ctx) => {
    const url = req.request.url;
    const searchParams = new URLSearchParams(url.split('?')[1]);

    const query = searchParams.get('q');
    const lang = searchParams.get('accept-language');

    return HttpResponse.json([
      {
        place_id: 170375139,
        licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
        osm_type: 'way',
        osm_id: 218415904,
        lat: '50.0894450',
        lon: '19.9146950',
        class: 'highway',
        type: 'primary',
        place_rank: 26,
        importance: 0.05341270084687568,
        addresstype: 'road',
        name: 'Opolska',
        display_name:
          'Opolska, Azory, Prądnik Biały, Kraków, województwo małopolskie, 31-326, Polska',
        address: {
          road: 'Opolska',
          quarter: 'Azory',
          suburb: 'Prądnik Biały',
          city_district: 'Prądnik Biały',
          city: 'Kraków',
          state: 'województwo małopolskie',
          'ISO3166-2-lvl4': 'PL-12',
          postcode: '31-326',
          country: 'Polska',
          country_code: 'pl',
        },
        boundingbox: ['50.0893243', '50.0898204', '19.9131718', '19.9164197'],
      },
      {
        place_id: 170544697,
        licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
        osm_type: 'way',
        osm_id: 153148688,
        lat: '50.0916243',
        lon: '19.9382794',
        class: 'highway',
        type: 'primary',
        place_rank: 26,
        importance: 0.05341270084687568,
        addresstype: 'road',
        name: 'Opolska',
        display_name: 'Opolska, Prądnik Biały, Kraków, województwo małopolskie, 31-221, Polska',
        address: {
          road: 'Opolska',
          quarter: 'Prądnik Biały',
          suburb: 'Prądnik Biały',
          city_district: 'Prądnik Biały',
          city: 'Kraków',
          state: 'województwo małopolskie',
          'ISO3166-2-lvl4': 'PL-12',
          postcode: '31-221',
          country: 'Polska',
          country_code: 'pl',
        },
        boundingbox: ['50.0914939', '50.0917505', '19.9369995', '19.9395589'],
      },
      {
        place_id: 170401589,
        licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
        osm_type: 'way',
        osm_id: 27090960,
        lat: '50.0870228',
        lon: '19.9510053',
        class: 'highway',
        type: 'primary',
        place_rank: 26,
        importance: 0.05341270084687568,
        addresstype: 'road',
        name: 'Opolska',
        display_name: 'Opolska, Prądnik Biały, Kraków, województwo małopolskie, 31-217, Polska',
        address: {
          road: 'Opolska',
          quarter: 'Prądnik Biały',
          city_district: 'Prądnik Biały',
          city: 'Kraków',
          state: 'województwo małopolskie',
          'ISO3166-2-lvl4': 'PL-12',
          postcode: '31-217',
          country: 'Polska',
          country_code: 'pl',
        },
        boundingbox: ['50.0870228', '50.0874406', '19.9495202', '19.9510053'],
      },
    ]);
  },
);

export const MULTI_ORDERED_SELECT_MOCK = [
  http.get('/mocks/multi-ordered-items', () => {
    return HttpResponse.json({
      content: [
        { id: 1, label: 'Poland' },
        { id: 2, label: 'Germany' },
        { id: 3, label: 'France' },
        { id: 4, label: 'Italy' },
        { id: 5, label: 'Spain' },
        { id: 6, label: 'Portugal' },
        { id: 7, label: 'Netherlands' },
        { id: 8, label: 'Belgium' },
        { id: 9, label: 'Sweden' },
        { id: 10, label: 'Norway' },
        { id: 11, label: 'Finland' },
        { id: 12, label: 'Denmark' },
        { id: 13, label: 'Austria' },
        { id: 14, label: 'Switzerland' },
        { id: 15, label: 'Czech Republic' },
        { id: 16, label: 'Slovakia' },
        { id: 17, label: 'Hungary' },
        { id: 18, label: 'Romania' },
        { id: 19, label: 'Bulgaria' },
        { id: 20, label: 'Greece' },
        { id: 21, label: 'Ireland' },
        { id: 22, label: 'United Kingdom' },
        { id: 23, label: 'Ukraine' },
        { id: 24, label: 'Turkey' },
        { id: 25, label: 'Lithuania' },
      ],
    });
  }),
];

export const USER_INPUT_MOCKS = [
  http.get('/mocks/users', ({ request, params }) => {
    const urlParams = new URLSearchParams(request.url.split('?')[1]);
    const filter = urlParams.get('filter');
    if (filter) {
      return HttpResponse.json({
        content: [
          {
            id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
            email: 'alice@example.com',
            firstName: 'Alice',
            lastName: 'Smith',
            username: 'asmith',
            labels: 'the-best',
          },
        ],
      });
    }

    return HttpResponse.json({
      content: [
        {
          id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
          email: 'alice@example.com',
          firstName: 'Alice',
          lastName: 'Smith',
          username: 'asmith',
          labels: 'the-best',
        },
        {
          id: '2d6e0d79-5f5b-4c4f-b6e1-aaa2b38fba1f',
          email: 'bob@example.com',
          firstName: 'Bob',
          lastName: 'Johnson',
          username: 'bjohnson',
        },
        {
          id: '3c4c0aef-b9ae-4d50-8e5e-b8b3df5c5e2f',
          email: 'carol@example.com',
          firstName: 'Carol',
          lastName: 'Williams',
          username: 'cwilliams',
        },
        {
          id: '4aefc4a4-1ac4-4c6d-9de5-cb167a9b8f3b',
          email: 'dave@example.com',
          firstName: 'Dave',
          lastName: 'Brown',
          username: 'dbrown',
        },
        {
          id: '5ba7e07c-d688-4ad5-89a4-2d5f9171099e',
          email: 'eve@example.com',
          firstName: 'Eve',
          lastName: 'Jones',
          username: 'ejones',
        },
        {
          id: '6d3091de-c019-4b89-b18f-10b91f6e0c22',
          email: 'frank@example.com',
          firstName: 'Frank',
          lastName: 'Garcia',
          username: 'fgarcia',
        },
        {
          id: '79ec7de5-4121-45fa-9c56-045cb989672e',
          email: 'grace@example.com',
          firstName: 'Grace',
          lastName: 'Martinez',
          username: 'gmartinez',
        },
        {
          id: '81adf4b0-3d24-412d-bc8c-4162cfd4f1b2',
          email: 'henry@example.com',
          firstName: 'Henry',
          lastName: 'Davis',
          username: 'hdavis',
        },
        {
          id: '9a1f4d3c-1e6f-4c39-9956-7f4f2f8b0e4a',
          email: 'irene@example.com',
          firstName: 'Irene',
          lastName: 'Lopez',
          username: 'ilopez',
        },
        {
          id: 'a2c9b7e3-f7b1-4c64-8fa7-3a08db9d079e',
          email: 'jack@example.com',
          firstName: 'Jack',
          lastName: 'Gonzalez',
          username: 'jgonzalez',
        },
      ],
    });
  }),
  http.get('/api/v1/users/:id/avatar', ({ params, request }) => {
    const avatarBase64 =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
    const binary = Uint8Array.from(atob(avatarBase64), (c) => c.charCodeAt(0));
    const avatarBlob = new Blob([binary], { type: 'image/png' });

    const { id } = params;
    const url = new URL(request.url);
    const size = url.searchParams.get('size') ?? '32';

    const validUserIds = [
      '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
      '2d6e0d79-5f5b-4c4f-b6e1-aaa2b38fba1f',
      '3c4c0aef-b9ae-4d50-8e5e-b8b3df5c5e2f',
      '4aefc4a4-1ac4-4c6d-9de5-cb167a9b8f3b',
      '5ba7e07c-d688-4ad5-89a4-2d5f9171099e',
      '6d3091de-c019-4b89-b18f-10b91f6e0c22',
      '79ec7de5-4121-45fa-9c56-045cb989672e',
      '81adf4b0-3d24-412d-bc8c-4162cfd4f1b2',
      '9a1f4d3c-1e6f-4c39-9956-7f4f2f8b0e4a',
      'a2c9b7e3-f7b1-4c64-8fa7-3a08db9d079e',
    ];

    if (validUserIds.includes(id as string)) {
      return new HttpResponse(avatarBlob, {
        status: 200,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
    }

    return HttpResponse.json({ error: 'User not found' }, { status: 404 });
  }),
];
