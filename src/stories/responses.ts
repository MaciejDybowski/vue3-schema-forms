import { http, HttpResponse } from "msw";

const MOCK_OFFER_ITEMS_RESPONSE ={
  "content": [
    {
      "dataId": "646c1a33-85ac-4f03-a203-f2456d6eeb25",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 58.0000,
      "factoryCost": 56.0900,
      "retailPriceFactor": 9.0000,
      "targetRetailPriceGross": 13.000000,
      "itemQuantity": 53,
      "product": {
        "id": "360c2cdf-79f5-4292-8d13-2990b2807732",
        "number": "NX16-000",
        "name": "Sprung slatted bed base",
        "status": "OFFER",
        "programName": "HELEN",
        "pricingTierName": "Good",
        "mainImage": {
          "id": "L19kZWZhdWx0X3VwbG9hZF9idWNrZXQvTlgxNi0wMDBfMDYuanBn",
          "dataId": "360c2cdf-79f5-4292-8d13-2990b2807732",
          "name": "NX16-000_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.000000,
        "otherCost": 0.000000,
        "currentPrice": null,
        "nnnPrice": 58.000000,
        "nnnExwPrice": 58.000000,
        "minimalInvoicePrice": 59.040000,
        "minimalMarginAfterTransportPercent": 5.00,
        "minimalMarginAfterTransportAmount": 2.950000,
        "minimalNnnPrice": 59.040000,
        "minimalNnnExwPrice": 59.040000,
        "recommendedInvoicePrice": 65.990000,
        "recommendedMarginAfterTransportPercent": 15.00,
        "recommendedMarginAfterTransportAmount": 9.900000,
        "recommendedNnnPrice": 65.990000,
        "recommendedNnnExwPrice": 65.990000,
        "retailPriceNet": 522.000000,
        "retailPriceGross": 642.060000,
        "marginAfterTransportPercent": 3.30,
        "retailerMarginPercent": 88.90,
        "retailerMarginAmount": 464.000000,
        "effectiveRetailPriceFactor": 9.0000,
        "marginAfterTransportAmount": 1.910000,
        "totalInvoicePrice": 3074.00,
        "totalNnnPrice": 3074.00,
        "totalNnnExwPrice": 3074.00,
        "totalMarginAfterTransportAmount": 101.23,
        "currencyCode": "EUR",
        "currencyDecimalPlaces": 2
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no transport cost rate defined, cannot calculate recommended prices and margin"
        },
        {
          "type": "warning",
          "message": "no customer discount defined"
        }
      ]
    },
    {
      "dataId": "83e3b08d-29f1-49a0-9feb-c77b4a2c2d0c",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": 28.2200,
      "retailPriceFactor": 5.0000,
      "targetRetailPriceGross": null,
      "itemQuantity": null,
      "product": {
        "id": "823b9c76-f6bd-40dc-9040-4d0816f76c57",
        "number": "NX26-000",
        "name": "Basic slatted bed base",
        "status": "REMOVED",
        "programName": "COMBINO",
        "pricingTierName": null,
        "mainImage": {
          "id": "L19kZWZhdWx0X3VwbG9hZF9idWNrZXQvTlgyNi0wMDBfMDYuanBn",
          "dataId": "823b9c76-f6bd-40dc-9040-4d0816f76c57",
          "name": "NX26-000_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.000000,
        "otherCost": 0.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": null,
        "minimalInvoicePrice": 33.200000,
        "minimalMarginAfterTransportPercent": 15.00,
        "minimalMarginAfterTransportAmount": 4.980000,
        "minimalNnnPrice": 33.200000,
        "minimalNnnExwPrice": 33.200000,
        "recommendedInvoicePrice": 37.630000,
        "recommendedMarginAfterTransportPercent": 25.00,
        "recommendedMarginAfterTransportAmount": 9.410000,
        "recommendedNnnPrice": 37.630000,
        "recommendedNnnExwPrice": 37.630000,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginAfterTransportPercent": 0.00,
        "retailerMarginPercent": 0.00,
        "retailerMarginAmount": 0.000000,
        "effectiveRetailPriceFactor": 5.0000,
        "marginAfterTransportAmount": null,
        "totalInvoicePrice": null,
        "totalNnnPrice": null,
        "totalNnnExwPrice": null,
        "totalMarginAfterTransportAmount": null,
        "currencyCode": "EUR",
        "currencyDecimalPlaces": 2
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no transport cost rate defined, cannot calculate recommended prices and margin"
        },
        {
          "type": "warning",
          "message": "no customer discount defined"
        }
      ]
    },
    {
      "dataId": "87ccbc58-8523-4b20-903c-420f7433d88c",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": 15.9600,
      "retailPriceFactor": 5.0000,
      "targetRetailPriceGross": null,
      "itemQuantity": null,
      "product": {
        "id": "216beaa2-5cf4-4fef-819b-8e017714d321",
        "number": "NX29-000",
        "name": "Basic slatted bed base",
        "status": "REMOVED",
        "programName": "INDIGO",
        "pricingTierName": null,
        "mainImage": {
          "id": "L19kZWZhdWx0X3VwbG9hZF9idWNrZXQvTlgyOS0wMDBfMDYuanBn",
          "dataId": "216beaa2-5cf4-4fef-819b-8e017714d321",
          "name": "NX29-000_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.000000,
        "otherCost": 0.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": null,
        "minimalInvoicePrice": 18.780000,
        "minimalMarginAfterTransportPercent": 15.00,
        "minimalMarginAfterTransportAmount": 2.820000,
        "minimalNnnPrice": 18.780000,
        "minimalNnnExwPrice": 18.780000,
        "recommendedInvoicePrice": 21.280000,
        "recommendedMarginAfterTransportPercent": 25.00,
        "recommendedMarginAfterTransportAmount": 5.320000,
        "recommendedNnnPrice": 21.280000,
        "recommendedNnnExwPrice": 21.280000,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginAfterTransportPercent": 0.00,
        "retailerMarginPercent": 0.00,
        "retailerMarginAmount": 0.000000,
        "effectiveRetailPriceFactor": 5.0000,
        "marginAfterTransportAmount": null,
        "totalInvoicePrice": null,
        "totalNnnPrice": null,
        "totalNnnExwPrice": null,
        "totalMarginAfterTransportAmount": null,
        "currencyCode": "EUR",
        "currencyDecimalPlaces": 2
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no transport cost rate defined, cannot calculate recommended prices and margin"
        },
        {
          "type": "warning",
          "message": "no customer discount defined"
        }
      ]
    },
    {
      "dataId": "4e35e1d8-171d-45c5-af57-a1c33e936efc",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": 45.7000,
      "retailPriceFactor": 5.0000,
      "targetRetailPriceGross": null,
      "itemQuantity": null,
      "product": {
        "id": "9ec7cb95-b7bb-490c-937c-bf1572ec9071",
        "number": "NXSK22-D30G06",
        "name": "Chest",
        "status": "OFFER",
        "programName": "NEXUS",
        "pricingTierName": "Better",
        "mainImage": {
          "id": "L2ltcG9ydGVkL3Byb2R1Y3RzL3RyemVjaWFfMjAyMC0xMS0yOV8xMDAxMjEvTlhTSzIyLUQzMEcwNl8wNi5qcGc=",
          "dataId": "9ec7cb95-b7bb-490c-937c-bf1572ec9071",
          "name": "NXSK22-D30G06_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.000000,
        "otherCost": 0.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": null,
        "minimalInvoicePrice": 53.760000,
        "minimalMarginAfterTransportPercent": 15.00,
        "minimalMarginAfterTransportAmount": 8.060000,
        "minimalNnnPrice": 53.760000,
        "minimalNnnExwPrice": 53.760000,
        "recommendedInvoicePrice": 60.930000,
        "recommendedMarginAfterTransportPercent": 25.00,
        "recommendedMarginAfterTransportAmount": 15.230000,
        "recommendedNnnPrice": 60.930000,
        "recommendedNnnExwPrice": 60.930000,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginAfterTransportPercent": 0.00,
        "retailerMarginPercent": 0.00,
        "retailerMarginAmount": 0.000000,
        "effectiveRetailPriceFactor": 5.0000,
        "marginAfterTransportAmount": null,
        "totalInvoicePrice": null,
        "totalNnnPrice": null,
        "totalNnnExwPrice": null,
        "totalMarginAfterTransportAmount": null,
        "currencyCode": "EUR",
        "currencyDecimalPlaces": 2
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no transport cost rate defined, cannot calculate recommended prices and margin"
        },
        {
          "type": "warning",
          "message": "no customer discount defined"
        }
      ]
    },
    {
      "dataId": "cd6fe6bd-2d50-4468-ac9a-0d7d1f56c468",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": 19.9000,
      "retailPriceFactor": 5.0000,
      "targetRetailPriceGross": null,
      "itemQuantity": null,
      "product": {
        "id": "8ba2279a-7d09-4b33-8651-e61c8dbe08ab",
        "number": "OFK22-D46",
        "name": "Chest",
        "status": "REMOVED",
        "programName": "OSLO",
        "pricingTierName": null,
        "mainImage": {
          "id": "L2ltcG9ydGVkL3Byb2R1Y3RzL3RyemVjaWFfMjAyMC0xMS0yOV8xMDAxMjEvT0ZLMjItRDQ2XzA2LmpwZw==",
          "dataId": "8ba2279a-7d09-4b33-8651-e61c8dbe08ab",
          "name": "OFK22-D46_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.000000,
        "otherCost": 0.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": null,
        "minimalInvoicePrice": 23.410000,
        "minimalMarginAfterTransportPercent": 15.00,
        "minimalMarginAfterTransportAmount": 3.510000,
        "minimalNnnPrice": 23.410000,
        "minimalNnnExwPrice": 23.410000,
        "recommendedInvoicePrice": 26.530000,
        "recommendedMarginAfterTransportPercent": 25.00,
        "recommendedMarginAfterTransportAmount": 6.630000,
        "recommendedNnnPrice": 26.530000,
        "recommendedNnnExwPrice": 26.530000,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginAfterTransportPercent": 0.00,
        "retailerMarginPercent": 0.00,
        "retailerMarginAmount": 0.000000,
        "effectiveRetailPriceFactor": 5.0000,
        "marginAfterTransportAmount": null,
        "totalInvoicePrice": null,
        "totalNnnPrice": null,
        "totalNnnExwPrice": null,
        "totalMarginAfterTransportAmount": null,
        "currencyCode": "EUR",
        "currencyDecimalPlaces": 2
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no transport cost rate defined, cannot calculate recommended prices and margin"
        },
        {
          "type": "warning",
          "message": "no customer discount defined"
        }
      ]
    },
    {
      "dataId": "6b249794-95ea-4916-9fcf-9613a4eb8e51",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 61.0000,
      "factoryCost": 55.8200,
      "retailPriceFactor": 5.0000,
      "targetRetailPriceGross": 3.000000,
      "itemQuantity": 16,
      "product": {
        "id": "ff7b3245-ebf9-4a29-bdd6-8c56568af217",
        "number": "OFK83-D46",
        "name": "Chest",
        "status": "REMOVED",
        "programName": "OSLO",
        "pricingTierName": null,
        "mainImage": {
          "id": "L2ltcG9ydGVkL3Byb2R1Y3RzL3RyemVjaWFfMjAyMC0xMS0yOV8xMDAxMjEvT0ZLODMtRDQ2XzA2LmpwZw==",
          "dataId": "ff7b3245-ebf9-4a29-bdd6-8c56568af217",
          "name": "OFK83-D46_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.000000,
        "otherCost": 0.000000,
        "currentPrice": null,
        "nnnPrice": 61.000000,
        "nnnExwPrice": 61.000000,
        "minimalInvoicePrice": 65.670000,
        "minimalMarginAfterTransportPercent": 15.00,
        "minimalMarginAfterTransportAmount": 9.850000,
        "minimalNnnPrice": 65.670000,
        "minimalNnnExwPrice": 65.670000,
        "recommendedInvoicePrice": 74.430000,
        "recommendedMarginAfterTransportPercent": 25.00,
        "recommendedMarginAfterTransportAmount": 18.610000,
        "recommendedNnnPrice": 74.430000,
        "recommendedNnnExwPrice": 74.430000,
        "retailPriceNet": 305.000000,
        "retailPriceGross": 375.150000,
        "marginAfterTransportPercent": 8.50,
        "retailerMarginPercent": 80.00,
        "retailerMarginAmount": 244.000000,
        "effectiveRetailPriceFactor": 5.0000,
        "marginAfterTransportAmount": 5.180000,
        "totalInvoicePrice": 976.00,
        "totalNnnPrice": 976.00,
        "totalNnnExwPrice": 976.00,
        "totalMarginAfterTransportAmount": 82.88,
        "currencyCode": "EUR",
        "currencyDecimalPlaces": 2
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no transport cost rate defined, cannot calculate recommended prices and margin"
        },
        {
          "type": "warning",
          "message": "no customer discount defined"
        }
      ]
    }
  ],
  "aggregates": {
    "totalItemQuantity": 69,
    "totalInvoicePrice": 4050.00,
    "totalNnnPrice": 4050.00,
    "totalMarginAfterTransportAmount": 184.11,
    "totalMarginAfterTransportPercent": 4.54592592592592592600,
    "anyMarginAfterTransportBelowMinimal": true
  },
  "page": {
    "size": 10,
    "number": 0,
    "totalElements": 6,
    "totalPages": 1
  }
};


export const OFFER_ITEMS_MOCK = [
  http.get("/api/v1/offers/802d5b51-655b-413e-a19e-fd0f46863863/offer-items?page=0&size=10", async () => {
    return HttpResponse.json(MOCK_OFFER_ITEMS_RESPONSE);
  }),
]


const MOCK_RELATIONSHIP_RESPONSE = {
  content: [
    {
      dataId: "8a6a5f37-c2fe-4319-b3f1-fbb72e33320b_WE",
      partner: {
        id: "8a6a5f37-c2fe-4319-b3f1-fbb72e33320b",
        name: "TUCO VALENCIA  EL OSITO",
        number: "794201",
      },
      function: {
        id: "WE",
        name: "Ship To Party",
      },
    },
    {
      dataId: "d6231bf6-bf77-4250-bac2-5bb07d2b3582_AG",
      partner: {
        id: "d6231bf6-bf77-4250-bac2-5bb07d2b3582",
        name: "MOBELMUR 2020 S.L.U.",
        number: "7942",
      },
      function: {
        id: "AG",
        name: "Sold To Party",
      },
    },
    {
      dataId: "d6231bf6-bf77-4250-bac2-5bb07d2b3582_RE",
      partner: {
        id: "d6231bf6-bf77-4250-bac2-5bb07d2b3582",
        name: "MOBELMUR 2020 S.L.U.",
        number: "7942",
      },
      function: {
        id: "RE",
        name: "Bill To Party",
      },
    },
    {
      dataId: "d6231bf6-bf77-4250-bac2-5bb07d2b3582_RG",
      partner: {
        id: "d6231bf6-bf77-4250-bac2-5bb07d2b3582",
        name: "MOBELMUR 2020 S.L.U.",
        number: "7942",
      },
      function: {
        id: "RG",
        name: "Payer",
      },
    },
    {
      dataId: "d6231bf6-bf77-4250-bac2-5bb07d2b3582_WE",
      partner: {
        id: "d6231bf6-bf77-4250-bac2-5bb07d2b3582",
        name: "MOBELMUR 2020 S.L.U.",
        number: "7942",
      },
      function: {
        id: "WE",
        name: "Ship To Party",
      },
    },
    {
      dataId: "eb4159fb-fa30-4771-af17-5a8920ed134f_WE",
      partner: {
        id: "eb4159fb-fa30-4771-af17-5a8920ed134f",
        name: "TUCO CASTELLÓN (SALERA)",
        number: "794202",
      },
      function: {
        id: "WE",
        name: "Ship To Party",
      },
    },
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 6,
    totalPages: 1,
  },
};
export const RELATIONSHIP_RESPONSE = {
  url: "/api/v1/customers/1/relationships?page=0&size=10",
  method: "GET",
  status: 200,
  response: (request) => {
    const { body, searchParams } = request;

    return MOCK_RELATIONSHIP_RESPONSE;
  },
};
