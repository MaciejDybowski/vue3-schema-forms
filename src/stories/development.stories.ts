// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";

const meta = {
  title: "Development Page",
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
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ForteStart: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        description1: {
          content:
            "Select an option displayed as:\n<br>\n(Payer Number) Payer Name - (Sold to Party Number) Sold to Party Name if the payer and sold-to party are different.\n<br>\n(Sold to Party Number) Sold to Party Name if they are the same.",
          layout: {
            component: "static-content",
            tag: "v-alert",
            props: { type: "info", density: "default", variant: "tonal" },
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
        },
        customer: {
          label: "Customer",
          layout: {
            cols: { xs: 12, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
            component: "dictionary",
            props: { clearable: true },
          },
          source: {
            url: "/api/dictionaries?feature-id=payers-sold-to-parties&lm=description&vm=soldToParty.id&customAttributes=customerId%2C%7BsoldToParty.id%7D%2Cname%2C%7Bdescription%7D",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
        groupOne: {
          layout: {
            component: "fields-group",
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            schema: {
              type: "object",
              properties: {
                description2: {
                  content:
                    "Select the pricelist associated with the previously chosen Sold to Party. The pricelist may be available at different hierarchy levels. If no hierarchical pricelist is found, you can choose a pricelist at the Sold to Party level.",
                  layout: {
                    component: "static-content",
                    tag: "v-alert",
                    props: { type: "info", variant: "tonal", density: "default" },
                    cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
                  },
                  sectionKey: "groupOne",
                },
                pricelist: {
                  label: "Price list",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
                    component: "dictionary",
                  },
                  source: {
                    url: "/api/dictionaries?feature-id=customer-pricelists&lm=pricelistPath&vm=id.pricelistCustomerId&filter=id.customerId%3D%3D{customer.customerId}&customAttributes=defaultCurrencyCode%2C%7Bsettings.defaultCurrencyCode%7D%2CdefaultIncotermsRule%2C%7Bsettings.defaultIncotermsRule%7D%2ClastQuarterTransportCostRateEurM3%2C%7Bsettings.lastQuarterTransportCostRateEurM3%7D%2CdiscountPercent%2C%7Bsettings.discountPercent%7D",
                    title: "label",
                    value: "id",
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                  },
                  sectionKey: "groupOne",
                },
                offer: {
                  properties: {
                    type: {
                      label: "Offer type",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "select",
                        fillRow: true,
                      },
                      source: {
                        items: [
                          { value: "STD", title: "Offer" },
                          {
                            value: "ONE",
                            title: "One time-deal offer",
                          },
                          { value: "EVT", title: "Event" },
                        ],
                        returnObject: true,
                      },
                      sectionKey: "groupOne",
                    },
                    event: {
                      label: "Event",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "dictionary",
                        if: "nata(offer.type.value='EVT')",
                      },
                      source: {
                        url: "",
                        title: "label",
                        value: "id",
                        returnObject: true,
                        lazy: true,
                        singleOptionAutoSelect: true,
                      },
                      sectionKey: "groupOne",
                    },
                    eventYear: {
                      label: "Event year",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "dictionary",
                        if: "nata(offer.type.value='EVT')",
                      },
                      source: {
                        url: "",
                        title: "label",
                        value: "id",
                        returnObject: true,
                        lazy: true,
                        singleOptionAutoSelect: true,
                      },
                      sectionKey: "groupOne",
                    },
                    currency: {
                      label: "Currency",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "dictionary",
                        props: { clearable: true },
                        if: "",
                        fillRow: true,
                      },
                      source: {
                        url: "/api/dictionaries?feature-id=currencies&lm=name&vm=dataId&query={pricelist.defaultCurrencyCode}",
                        title: "label",
                        value: "id",
                        lazy: true,
                        returnObject: true,
                        singleOptionAutoSelect: true,
                      },
                      sectionKey: "groupOne",
                    },
                    vatRate: {
                      label: "Vat rate (%)",
                      layout: {
                        cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                        component: "combobox",
                        props: { clearable: true },
                      },
                      source: {
                        url: "/api/dictionaries?feature-id=vat-rates&lm=vatRate&vm=dataId",
                        title: "label",
                        value: "id",
                        lazy: true,
                        returnObject: false,
                        singleOptionAutoSelect: true,
                      },
                      sectionKey: "groupOne",
                    },
                  },
                  required: ["type", "currency"],
                },
              },
              required: ["pricelist"],
            },
            if: "nata(customer!=null)",
            props: {},
            options: { showDivider: false, addBtnText: "Add" },
          },
        },
        groupTwo: {
          layout: {
            component: "fields-group",
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            schema: {
              type: "object",
              properties: {
                transportConditionHeader: {
                  content: "Transport conditions",
                  layout: { component: "static-content", tag: "h3" },
                  sectionKey: "groupTwo",
                },
                transportConditions: {
                  properties: {
                    incotermsRule: {
                      label: "Incoterms® rule",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "dictionary",
                        props: { clearable: true },
                      },
                      source: {
                        url: "/api/dictionaries?feature-id=incoterm-rules&lm=name&vm=dataId&query={pricelist.defaultIncotermsRule}",
                        title: "label",
                        value: "id",
                        returnObject: true,
                        lazy: true,
                        singleOptionAutoSelect: true,
                      },
                      sectionKey: "groupTwo",
                    },
                    transportRate: {
                      label: "Transport rate",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "number-field",
                      },
                      type: "int",
                      sectionKey: "groupTwo",
                    },
                  },
                  required: ["transportRate"],
                },
                calculationRulesHeader: {
                  content: "Calculation rules",
                  layout: { component: "static-content", tag: "h3" },
                  label: "static-content-706013_cloned",
                  sectionKey: "groupTwo",
                },
                calculationRules: {
                  properties: {
                    retailPriceFactor: {
                      label: "Retail price factor",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "number-field",
                      },
                      type: "int",
                      sectionKey: "groupTwo",
                    },
                    discountPercent: {
                      label: "Customer discount (%)",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "number-field",
                      },
                      type: "int",
                      sectionKey: "groupTwo",
                    },
                  },
                  required: ["retailPriceFactor"],
                },
                otherCostsHeader: {
                  content: "Other costs",
                  layout: { component: "static-content", tag: "h3" },
                  label: "static-content-706013_cloned136_cloned",
                  sectionKey: "groupTwo",
                },
                otherCosts: {
                  layout: {
                    component: "duplicated-section",
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                    schema: {
                      type: "object",
                      properties: {
                        costaName: {
                          label: "Cost name",
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                            component: "text-field",
                          },
                          sectionKey: "otherCosts",
                        },
                        unitCostPerProduct: {
                          label: "Unit cost per product",
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                            component: "number-field",
                          },
                          type: "int",
                          sectionKey: "otherCosts",
                        },
                        unitCostPerPackage: {
                          label: "Unit cost per package",
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                            component: "number-field",
                          },
                          type: "int",
                          sectionKey: "otherCosts",
                        },
                      },
                      required: [],
                    },
                    options: { addBtnText: "Add element", showDivider: false, ordinalNumberInModel: false },
                    editable: true,
                    showElements: true,
                    props: {},
                  },
                  sectionKey: "groupTwo",
                },
              },
              required: ["transportRate", "retailPriceFactor"],
            },
            if: "nata(customer!=null and pricelist!=null and offer.type!=null and offer.currency!=null)",
            props: {},
            options: { showDivider: false, addBtnText: "Add" },
          },
        },
      },
      required: ["customer"],
    },
  },
};


const MOCK_RESPONSE = {
  "content": [
    {
      "dataId": "d598bcd7-c98d-4704-bdc6-4320044540e5",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": null,
      "retailPriceFactor": 1.0000,
      "targetRetailPriceGross": null,
      "product": {
        "id": "b7a10f25-7526-475a-981c-f133543421b8",
        "number": "KR0139-MET-LY1903",
        "name": "Chairs 2 pcs TUMKUR",
        "status": "OFFER",
        "programName": "CHAIRS",
        "mainImage": {
          "id": "L2ltcG9ydGVkL3Byb2R1Y3RzL2tyemVzJUM1JTgyYV8yMDIxLTA5LTAyXzExMzA0MS9LUjAxMzktTUVULUxZMTkwM18wNi5qcGc=",
          "dataId": "b7a10f25-7526-475a-981c-f133543421b8",
          "name": "KR0139-MET-LY1903_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.770000,
        "otherCost": 2.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": -0.770000,
        "minimalInvoicePrice": null,
        "minimalMarginPercent": 15.00,
        "minimalNnnPrice": null,
        "minimalNnnExwPrice": null,
        "recommendedInvoicePrice": null,
        "recommendedMarginPercent": 25.00,
        "recommendedNnnPrice": null,
        "recommendedNnnExwPrice": null,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginPercent": 0.00,
        "customerMarginPercent": 0.00,
        "retailPriceFactor": 1.0000,
        "currencyCode": "EUR"
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no package quantity defined for product, using one package for calculations"
        }
      ]
    },
    {
      "dataId": "3ba78ebc-4bd7-4f0a-b220-c12a0da91e2c",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": null,
      "retailPriceFactor": 1.0000,
      "targetRetailPriceGross": null,
      "product": {
        "id": "b673fc28-8981-4df7-97a6-9d16017f0d35",
        "number": "KR0139-MET-Y676",
        "name": "Chairs 2 pcs TUMKUR",
        "status": "OFFER",
        "programName": "CHAIRS",
        "mainImage": {
          "id": "L19kZWZhdWx0X3VwbG9hZF9idWNrZXQvS1IwMTM5LU1FVC1ZNjc2XzA2LmpwZw==",
          "dataId": "b673fc28-8981-4df7-97a6-9d16017f0d35",
          "name": "KR0139-MET-Y676_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.770000,
        "otherCost": 2.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": -0.770000,
        "minimalInvoicePrice": null,
        "minimalMarginPercent": 15.00,
        "minimalNnnPrice": null,
        "minimalNnnExwPrice": null,
        "recommendedInvoicePrice": null,
        "recommendedMarginPercent": 25.00,
        "recommendedNnnPrice": null,
        "recommendedNnnExwPrice": null,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginPercent": 0.00,
        "customerMarginPercent": 0.00,
        "retailPriceFactor": 1.0000,
        "currencyCode": "EUR"
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no package quantity defined for product, using one package for calculations"
        }
      ]
    },
    {
      "dataId": "cc1eaf8c-7e75-483c-be56-e8298f3bd26b",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": null,
      "retailPriceFactor": 1.0000,
      "targetRetailPriceGross": null,
      "product": {
        "id": "114981bc-4602-43de-a2df-f4071908a96f",
        "number": "KR0128-B99-ONR91",
        "name": "Chairs 2 pcs VEGALTA",
        "status": "OFFER",
        "programName": "CHAIRS",
        "mainImage": {
          "id": "L2ltcG9ydGVkL3Byb2R1Y3RzL2tyemVzJUM1JTgyYV8yMDIxLTA5LTAyXzExMzA0MS9LUjAxMjgtQjk5LU9OUjkxXzA2LmpwZw==",
          "dataId": "114981bc-4602-43de-a2df-f4071908a96f",
          "name": "KR0128-B99-ONR91_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.720000,
        "otherCost": 2.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": -0.720000,
        "minimalInvoicePrice": null,
        "minimalMarginPercent": 15.00,
        "minimalNnnPrice": null,
        "minimalNnnExwPrice": null,
        "recommendedInvoicePrice": null,
        "recommendedMarginPercent": 25.00,
        "recommendedNnnPrice": null,
        "recommendedNnnExwPrice": null,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginPercent": 0.00,
        "customerMarginPercent": 0.00,
        "retailPriceFactor": 1.0000,
        "currencyCode": "EUR"
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no package quantity defined for product, using one package for calculations"
        }
      ]
    },
    {
      "dataId": "018c1bfb-82d4-4522-8adc-bf10b01f379d",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": null,
      "retailPriceFactor": 1.0000,
      "targetRetailPriceGross": null,
      "product": {
        "id": "2fb0f989-f8f7-4d74-bd82-3675e342672a",
        "number": "KR0140-MET-Y016",
        "name": "Chairs 2 pcs YADGIR",
        "status": "OFFER",
        "programName": "CHAIRS",
        "mainImage": {
          "id": "L19kZWZhdWx0X3VwbG9hZF9idWNrZXQvS1IwMTQwLU1FVC1ZMDE2XzA2LmpwZw==",
          "dataId": "2fb0f989-f8f7-4d74-bd82-3675e342672a",
          "name": "KR0140-MET-Y016_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.660000,
        "otherCost": 2.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": -0.660000,
        "minimalInvoicePrice": null,
        "minimalMarginPercent": 15.00,
        "minimalNnnPrice": null,
        "minimalNnnExwPrice": null,
        "recommendedInvoicePrice": null,
        "recommendedMarginPercent": 25.00,
        "recommendedNnnPrice": null,
        "recommendedNnnExwPrice": null,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginPercent": 0.00,
        "customerMarginPercent": 0.00,
        "retailPriceFactor": 1.0000,
        "currencyCode": "EUR"
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no package quantity defined for product, using one package for calculations"
        }
      ]
    },
    {
      "dataId": "46172056-5813-49e5-83f3-4effd9efb10d",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": null,
      "retailPriceFactor": 1.0000,
      "targetRetailPriceGross": null,
      "product": {
        "id": "cfb1a8b0-f5e4-485a-82e5-5d8102ad3046",
        "number": "FSGK233B-M395",
        "name": "Chest",
        "status": null,
        "programName": "FIRST LEAGUE",
        "mainImage": {
          "id": "L19kZWZhdWx0X3VwbG9hZF9idWNrZXQvRlNHSzIzM0ItTTM5NV8wNi5qcGc=",
          "dataId": "cfb1a8b0-f5e4-485a-82e5-5d8102ad3046",
          "name": "FSGK233B-M395_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": null,
        "otherCost": 2.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": null,
        "minimalInvoicePrice": null,
        "minimalMarginPercent": 15.00,
        "minimalNnnPrice": null,
        "minimalNnnExwPrice": null,
        "recommendedInvoicePrice": null,
        "recommendedMarginPercent": 25.00,
        "recommendedNnnPrice": null,
        "recommendedNnnExwPrice": null,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginPercent": 0.00,
        "customerMarginPercent": 0.00,
        "retailPriceFactor": 1.0000,
        "currencyCode": "EUR"
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no package quantity defined for product, using one package for calculations"
        },
        {
          "type": "warning",
          "message": "unknown product volume, cannot calculate transport cost"
        }
      ]
    },
    {
      "dataId": "3faacbf3-ac73-4dc7-a6a7-a963c5367f36",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": null,
      "retailPriceFactor": 1.0000,
      "targetRetailPriceGross": null,
      "product": {
        "id": "a1856746-6171-4a44-8b13-fe3a91cd855b",
        "number": "KR0096-D47-LAT1",
        "name": "Set 2 chairs",
        "status": "OFFER",
        "programName": "CHAIRS",
        "mainImage": {
          "id": "L2ltcG9ydGVkL3Byb2R1Y3RzL2tyemVzJUM1JTgyYV8yMDIxLTA5LTAyXzExMzA0MS9LUjAwOTYtRDQ3LUxBVDFfMDYuanBn",
          "dataId": "a1856746-6171-4a44-8b13-fe3a91cd855b",
          "name": "KR0096-D47-LAT1_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.900000,
        "otherCost": 2.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": -0.900000,
        "minimalInvoicePrice": null,
        "minimalMarginPercent": 15.00,
        "minimalNnnPrice": null,
        "minimalNnnExwPrice": null,
        "recommendedInvoicePrice": null,
        "recommendedMarginPercent": 25.00,
        "recommendedNnnPrice": null,
        "recommendedNnnExwPrice": null,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginPercent": 0.00,
        "customerMarginPercent": 0.00,
        "retailPriceFactor": 1.0000,
        "currencyCode": "EUR"
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no package quantity defined for product, using one package for calculations"
        }
      ]
    },
    {
      "dataId": "3d4aaec7-cfec-4b82-965f-92d7bf697d29",
      "palletQuantity": null,
      "palletQuantityIcon": null,
      "invoicePrice": 0.0000,
      "factoryCost": null,
      "retailPriceFactor": 1.0000,
      "targetRetailPriceGross": null,
      "product": {
        "id": "f61512fa-7c71-4898-86d4-3ff52c966d33",
        "number": "KR0112-MET-YBS07",
        "name": "Set.2chairs.metal.chr/dbl.stitching Grey",
        "status": "OFFER",
        "programName": "CHAIRS",
        "mainImage": {
          "id": "L2ltcG9ydGVkL3Byb2R1Y3RzL2tyemVzJUM1JTgyYV8yMDIxLTA5LTAyXzExMzA0MS9LUjAxMTItTUVULVlCUzA3XzA2LmpwZw==",
          "dataId": "f61512fa-7c71-4898-86d4-3ff52c966d33",
          "name": "KR0112-MET-YBS07_06.jpg",
          "lastModifiedAt": null
        }
      },
      "details": {
        "transportCost": 0.460000,
        "otherCost": 2.000000,
        "currentPrice": null,
        "nnnPrice": 0.000000,
        "nnnExwPrice": -0.460000,
        "minimalInvoicePrice": null,
        "minimalMarginPercent": 15.00,
        "minimalNnnPrice": null,
        "minimalNnnExwPrice": null,
        "recommendedInvoicePrice": null,
        "recommendedMarginPercent": 25.00,
        "recommendedNnnPrice": null,
        "recommendedNnnExwPrice": null,
        "retailPriceNet": 0.000000,
        "retailPriceGross": 0.000000,
        "marginPercent": 0.00,
        "customerMarginPercent": 0.00,
        "retailPriceFactor": 1.0000,
        "currencyCode": "EUR"
      },
      "alerts": [
        {
          "type": "warning",
          "message": "no package quantity defined for product, using one package for calculations"
        }
      ]
    }
  ],
  "page": {
    "size": 10,
    "number": 0,
    "totalElements": 7,
    "totalPages": 1
  }
}

const OFFER_ITEMS_MOCK = {
  url: "/api/v1/offers/maciek-offer/offer-items?page=0&size=10",
  method: "GET",
  status: 200,
  response: (request) => {
    const { body, searchParams } = request;

    return MOCK_RESPONSE
  },
};

export const Forte: Story = {
  args: {
    model: {
      offer: {
        id: "maciek-offer",
      },
    },
    schema: {
      type: "object",
      properties: {
        tableOfOfferItems: {
          layout: { component: "table-view" },
          source: {
            data: "/api/v1/offers/{offer.id}/offer-items",
            headers: [
              {
                title: "Image",
                key: "mainImageUrl",
                valueMapping:
                  "/api/v1/features/products/images/{product.mainImage.id}%3D%3D?Workspace-Id={context.workspaceId}&dataId={product.mainImage.dataId}",
                type: "IMAGE",
                properties: {
                  minWidth: 64,
                  maxWidth: 64,
                },
              },
              {
                title: "Product",
                key: "product",
                valueMapping:
                  "<b>{product.name: Product name}</b> </br>{product.number:1}\n<br/>\nProgram: {product.programName}",
                type: "TEXT",
              },
              {
                title: "",
                key: "palletQuantityIcon",
                valueMapping: "palletQuantityIcon",
                type: "ICON",
              },
              {
                title: "Offer",
                key: "collection",
                type: "COLLECTION",
                items: [
                  {
                    color: "dataId != null ? '#E0E0E0': ''",
                    title: "Input",
                    key: "inputs",
                    type: "",
                    editable: [
                      { label: "Invoice price (NN):", key: "invoicePrice", valueMapping: "invoicePrice"},
                    ],
                  },
                  {
                    color: "dataId != null ? '#E0E0E0': ''",
                    type: "TEXT",
                    key: "recommendedPrice",
                    valueMapping:
                      '<div style="display:flex;flex-direction:column">\n' +
                      '  <div style="display:flex;justify-content:space-between"><span>Price NNN:</span><span><b>{details.recommendedInvoicePrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                      '  <div style="display:flex;justify-content:space-between"><span>Price NNN EXW:</span><span><b>{details.recommendedNnnPrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                      '  <div style="display:flex;justify-content:space-between;margin-top:8px"><span>MaT:</span><span><b>{details.marginPercent:0}%</b></span></div>\n' +
                      "</div>",
                  }
                ],

              },
              {
                title: "Recommended",
                type: "TEXT",
                key: "recommendedPrice",
                valueMapping:
                  '<div style="display:flex;flex-direction:column">\n' +
                  '  <div style="display:flex;justify-content:space-between; margin-bottom:8px"><span>Price NN:</span><span><b>{details.recommendedInvoicePrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                  '  <div style="display:flex;justify-content:space-between"><span>Price NNN:</span><span><b>{details.recommendedInvoicePrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                  '  <div style="display:flex;justify-content:space-between"><span>Price NNN EXW:</span><span><b>{details.recommendedNnnPrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                  '  <div style="display:flex;justify-content:space-between;margin-top:8px"><span>MaT:</span><span><b>{details.marginPercent:0}%</b></span></div>\n' +
                  "</div>",
              },
              {
                title: "Offer",
                key: "collection2",
                type: "COLLECTION",
                items: [
                  {
                    color: "dataId != null ? '#E0E0E0': ''",
                    title: "Input",
                    key: "inputs",
                    type: "",
                    editable: [
                      { label: "Target price gross:", key: "targetPriceGross", valueMapping: "targetPriceGross"},
                      { label: "Price factor:", key: "priceFactor", valueMapping: "priceFactor"},
                    ],
                  },
                  {
                    color: "dataId != null ? '#E0E0E0': ''",
                    title: "Result",
                    type: "TEXT",
                    key: "result",
                    valueMapping:
                      "" +
                      '<div style="display:flex;flex-direction:column">\n' +
                      '  <div style="display:flex;justify-content:space-between">\n' +
                      "    <span>Price net/gross:</span>\n" +
                      "    <span><b>{details.retailPriceNet:0.00}</b> {details.currencyCode:PLN} / <b>{details.retailPriceGross:0.00}</b> {details.currencyCode:PLN}</span>\n" +
                      "  </div>\n" +
                      '  <div style="display:flex;justify-content:space-between;margin-top:8px">\n' +
                      "    <span>Retailer margin:</span>\n" +
                      "    <span><b>{details.marginPercent:0}%</b></span>\n" +
                      "  </div>\n" +
                      "</div>",
                  },
                ],

              },

              {
                title: "",
                key: "actions",
                actions: [
                  {
                    title: "Delete",
                    icon: "mdi-delete-outline",
                    mode: "action",
                    code: "callScript",
                    config: {
                      params: {
                        script: "delete_product_from_offer",
                      },
                      body: {
                        dataId: "{product.id}",
                      },
                    },
                    props: {
                      color: "error",
                    },
                  },
                  {
                    title: "Pallet shipping",
                    icon: "mdi-shipping-pallet",
                    mode: "action",
                    code: "callScript",
                    config: {
                      params: {
                        script: "add_pallet_price",
                      },
                      body: {
                        dataId: "{product.id}",
                      },
                    },
                    props: {
                      color: "primary",
                    },
                  },
                ],
              },
            ],
            buttons: [
              {
                label: "Add products",
                btnProps: {
                  color: "primary",
                  rounded: false,
                },
                mode: "action",
                config: {
                  code: "batchAdd", // na froncie jest sprawdzanie jak batchAdd to i tak woła skrypt bo w obsłudze zadanie jest tylko jedna uniwersalna akcja
                  featureId: "products",
                  viewId: "94578-tabela",
                  batchAddAttributePath: "dataId",
                  scriptName: "add_products_to_offer",
                },
              },
            ],
          },
          actions: {},
        },
      },
      required: [],
    },
  },
  parameters: {
    mockData: [OFFER_ITEMS_MOCK],
  },
};

export const Table1: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
};
