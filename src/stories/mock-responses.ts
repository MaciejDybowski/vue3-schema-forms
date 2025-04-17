// @ts-nocheck
import { http, HttpResponse } from "msw";
import sampleImage from "./path/to/sample-image.png"; // If you're bundling it
import sampleImage from "./path/to/sample-image.png";

export const names = ["🥝 Kiwi", "🍏 Green Apple", "🍉 Watermelon", "🍌 Banana", "🍇 Grape"];
export const locations = ["New Zealand", "Brazil", "USA", "Italy", "South Africa"];
export const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const generatePageData = (page, size) => {
  const totalItems = 100; // Możemy łatwo dostosować liczbę elementów
  const startIndex = page * size;
  const endIndex = startIndex + size;

  const data = Array.from({ length: totalItems }, (_, index) => ({
    name: randomItem(names),
    location: randomItem(locations),
    height: Math.floor(Math.random() * 10000) + 1000, // Generowanie wysokości między 1000 a 11000
    base: Math.floor(Math.random() * 100) + 10, // 10 - 100
    volume: Math.random() * (0.01 - 0.00001) + 0.00001, // 0.00001 - 0.01
    dataId: index + 1,
    alerts: generateAlerts(),
    decimalPlaces: 2,
    heightOptions: [
      { title: "Height:10", value: 10 },
      { title: "Height:20", value: 20 },
      { title: "Height:30", value: 30 },
    ],
  }));

  return data.slice(startIndex, endIndex);
};

export const generateAlerts = () => {
  const alertTypes = ["warning", "info", "error"];
  const alertMessages = [
    "no package quantity defined for product, using one package for calculations",
    "no retail price factor defined, cannot calculate customer margin and retail prices",
    "unknown product volume, cannot calculate transport cost",
    "product is on backorder, delivery will be delayed",
    "product quantity is low, please restock",
    "customer margin is negative, review pricing strategy",
    "price mismatch between supplier and customer system",
    "invalid product data, review inventory management system",
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
  http.post("/mock-data/table-view-mock/:id", async ({ params }) => {
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
          { title: "Height:10", value: 10 },
          { title: "Height:20", value: 20 },
          { title: "Height:30", value: 30 },
        ],
      },
      aggregates: {
        height: Math.floor(Math.random() * 9999),
      },
    });
  }),
];

export const TABLE_PAGE_WITH_AGGREGATES = [
  http.get("/mock-data/table-view-mock", async (req, res, ctx) => {
    const url = req.request.url;
    const urlParams = new URLSearchParams(url.split("?")[1]);

    const page = urlParams.get("page");
    const size = urlParams.get("size");

    const pageData = generatePageData(parseInt(page), parseInt(size));
    const aggregates = {
      height: pageData.reduce((total, item) => total + item.height, 0),
    };

    if (pageData.length === 0) {
      return HttpResponse.text("No data available for the requested page", 404);
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
  http.get("/mock-data/table-view-mock", async (req, res, ctx) => {
    const url = req.request.url;
    const urlParams = new URLSearchParams(url.split("?")[1]);

    const page = urlParams.get("page");
    const size = urlParams.get("size");
    const pageData = generatePageData(parseInt(page), parseInt(size));

    if (pageData.length === 0) {
      return HttpResponse.text("No data available for the requested page", 404);
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

const allCurrencies = [
  { id: "USD", label: "US Dollar" },
  { id: "EUR", label: "Euro" },
  { id: "GBP", label: "British Pound" },
  { id: "JPY", label: "Japanese Yen" },
  { id: "CHF", label: "Swiss Franc" },
  { id: "AUD", label: "Australian Dollar" },
  { id: "CAD", label: "Canadian Dollar" },
  { id: "NZD", label: "New Zealand Dollar" },
  { id: "SEK", label: "Swedish Krona" },
  { id: "NOK", label: "Norwegian Krone" },
  { id: "DKK", label: "Danish Krone" },
  { id: "PLN", label: "Polish Zloty" },
  { id: "CZK", label: "Czech Koruna" },
  { id: "HUF", label: "Hungarian Forint" },
  { id: "RUB", label: "Russian Ruble" },
  { id: "CNY", label: "Chinese Yuan" },
  { id: "INR", label: "Indian Rupee" },
  { id: "BRL", label: "Brazilian Real" },
  { id: "ZAR", label: "South African Rand" },
  { id: "MXN", label: "Mexican Peso" },
];

// Funkcja do paginacji walut
const generateCurrenciesPage = (page, size) => {
  const startIndex = page * size;
  const endIndex = startIndex + size;
  return allCurrencies.slice(startIndex, endIndex);
};

export const CURRENCIES_REQUEST = http.get("/mock-data/currencies", async (req, res, ctx) => {
  const url = req.request.url;
  const urlParams = new URLSearchParams(url.split("?")[1]);

  const page = parseInt(urlParams.get("page") ?? "0");
  const size = parseInt(urlParams.get("size") ?? "50");

  const currencies = generateCurrenciesPage(page, size);

  if (currencies.length === 0) {
    return HttpResponse.text("No currencies available for the requested page", { status: 404 });
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
  http.get("/mocks/currencies", async ({ request }) => {
    console.log("Intercepted request:", request.url);
    const url = new URL(request.url);
    const valueFilter = url.searchParams.get("value-filter");
    const query = url.searchParams.get("query");
    const page = Number(url.searchParams.get("page")) || 0;
    const size = Number(url.searchParams.get("size")) || 20;

    const allCurrencies = [
      { id: "AFN", label: "Afgani", digitsAfterDecimal: "2" },
      { id: "ALL", label: "Lek", digitsAfterDecimal: "3" },
      { id: "AMD", label: "Dram", digitsAfterDecimal: "2" },
      { id: "ANG", label: "Gulden Antyli Holenderskich", digitsAfterDecimal: "2" },
      { id: "AOA", label: "Kwanza", digitsAfterDecimal: "2" },
      { id: "ARS", label: "Peso argentyńskie", digitsAfterDecimal: "2" },
      { id: "AUD", label: "Dolar australijski", digitsAfterDecimal: "2" },
      { id: "AWG", label: "Florin arubański", digitsAfterDecimal: "2" },
      { id: "AZN", label: "Manat azerbejdżański", digitsAfterDecimal: "2" },
      { id: "BAM", label: "Marka zamienna", digitsAfterDecimal: "2" },
      { id: "BBD", label: "Dolar barbadoski", digitsAfterDecimal: "2" },
      { id: "BDT", label: "Taka", digitsAfterDecimal: "2" },
      { id: "BGN", label: "Lew", digitsAfterDecimal: "2" },
      { id: "BHD", label: "Dinar bahrajski", digitsAfterDecimal: "3" },
      { id: "BIF", label: "Frank burundyjski", digitsAfterDecimal: "0" },
      { id: "BMD", label: "Dolar bermudzki", digitsAfterDecimal: "2" },
      { id: "BND", label: "Dolar brunejski", digitsAfterDecimal: "2" },
      { id: "BOB", label: "Boliviano", digitsAfterDecimal: "2" },
      { id: "BOV", label: "MVDOL boliwijski", digitsAfterDecimal: "2" },
      { id: "BRL", label: "Real brazylijski", digitsAfterDecimal: "2" },
    ];

    if (valueFilter) {
      // Jeśli value-filter jest ustawiony, zwracamy tylko jedną walutę
      return HttpResponse.json({
        content: [
          {
            id: valueFilter,
            label: "Polski Złoty", // Tutaj możesz dodać lookup po ID jeśli chcesz dynamicznie
          },
        ],
        pagination: { page, size },
      });
    }

    let filteredCurrencies = allCurrencies;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredCurrencies = allCurrencies.filter(
        (currency) => currency.id.toLowerCase().includes(lowerQuery) || currency.label.toLowerCase().includes(lowerQuery),
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
  http.get("/mock-dictionaries", async ({ request }) => {
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


export const IMAGE_REQUEST = http.get("/mocks/products/images", async (req, res, ctx) => {
  // TODO - try return sample image
  return null
});
