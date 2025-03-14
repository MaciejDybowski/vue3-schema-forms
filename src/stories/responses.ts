import { http, HttpResponse } from "msw";

const MOCK_OFFER_ITEMS_RESPONSE ={
  "content": [],
  "aggregates": null,
  "page": {
    "size": 10,
    "number": 0,
    "totalElements": 0,
    "totalPages": 0
  }
};


export const OFFER_ITEMS_MOCK = [
  http.get("/api/v1/offers/802d5b51-655b-413e-a19e-fd0f46863863/offer-items?page=0&size=10", async (req, res, ctx) => {
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
