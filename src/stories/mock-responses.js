import { HttpResponse, http } from "msw";

export const names = ["🥝 Kiwi", "🍏 Green Apple", "🍉 Watermelon", "🍌 Banana", "🍇 Grape"];
export const locations = ["New Zealand", "Brazil", "USA", "Italy", "South Africa"];
export const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const  generatePageData = (page, size) => {
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
    decimalPlaces:2
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

