// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import UIDevelopmentTable from "../components/app/UI-DevelopmentTable.vue";

const meta = {
  title: "Piotr's Workspace",
  component: UIDevelopmentTable,
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
} satisfies Meta<typeof UIDevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_RESPONSE = {
  content: [
    {
      dataId: "d598bcd7-c98d-4704-bdc6-4320044540e5",
      palletQuantity: null,
      palletQuantityIcon: null,
      invoicePrice: 0.0,
      factoryCost: null,
      retailPriceFactor: 1.0,
      targetRetailPriceGross: null,
      product: {
        id: "b7a10f25-7526-475a-981c-f133543421b8",
        number: "KR0139-MET-LY1903",
        name: "Chairs 2 pcs TUMKUR",
        status: "OFFER",
        programName: "CHAIRS",
        mainImage: {
          id: "L2ltcG9ydGVkL3Byb2R1Y3RzL2tyemVzJUM1JTgyYV8yMDIxLTA5LTAyXzExMzA0MS9LUjAxMzktTUVULUxZMTkwM18wNi5qcGc=",
          dataId: "b7a10f25-7526-475a-981c-f133543421b8",
          name: "KR0139-MET-LY1903_06.jpg",
          lastModifiedAt: null,
        },
      },
      details: {
        transportCost: 0.77,
        otherCost: 2.0,
        currentPrice: null,
        nnnPrice: 0.0,
        nnnExwPrice: -0.77,
        minimalInvoicePrice: null,
        minimalMarginPercent: 15.0,
        minimalNnnPrice: null,
        minimalNnnExwPrice: null,
        recommendedInvoicePrice: null,
        recommendedMarginPercent: 25.0,
        recommendedNnnPrice: null,
        recommendedNnnExwPrice: null,
        retailPriceNet: 0.0,
        retailPriceGross: 0.0,
        marginPercent: 0.0,
        customerMarginPercent: 0.0,
        retailPriceFactor: 1.0,
        currencyCode: "EUR",
      },
      alerts: [
        {
          type: "warning",
          message: "no package quantity defined for product, using one package for calculations",
        },
      ],
    },
    {
      dataId: "3ba78ebc-4bd7-4f0a-b220-c12a0da91e2c",
      palletQuantity: null,
      palletQuantityIcon: null,
      invoicePrice: 0.0,
      factoryCost: null,
      retailPriceFactor: 1.0,
      targetRetailPriceGross: null,
      product: {
        id: "b673fc28-8981-4df7-97a6-9d16017f0d35",
        number: "KR0139-MET-Y676",
        name: "Chairs 2 pcs TUMKUR",
        status: "OFFER",
        programName: "CHAIRS",
        mainImage: {
          id: "L19kZWZhdWx0X3VwbG9hZF9idWNrZXQvS1IwMTM5LU1FVC1ZNjc2XzA2LmpwZw==",
          dataId: "b673fc28-8981-4df7-97a6-9d16017f0d35",
          name: "KR0139-MET-Y676_06.jpg",
          lastModifiedAt: null,
        },
      },
      details: {
        transportCost: 0.77,
        otherCost: 2.0,
        currentPrice: null,
        nnnPrice: 0.0,
        nnnExwPrice: -0.77,
        minimalInvoicePrice: null,
        minimalMarginPercent: 15.0,
        minimalNnnPrice: null,
        minimalNnnExwPrice: null,
        recommendedInvoicePrice: null,
        recommendedMarginPercent: 25.0,
        recommendedNnnPrice: null,
        recommendedNnnExwPrice: null,
        retailPriceNet: 0.0,
        retailPriceGross: 0.0,
        marginPercent: 0.0,
        customerMarginPercent: 0.0,
        retailPriceFactor: 1.0,
        currencyCode: "EUR",
      },
      alerts: [
        {
          type: "warning",
          message: "no package quantity defined for product, using one package for calculations",
        },
      ],
    },
    {
      dataId: "cc1eaf8c-7e75-483c-be56-e8298f3bd26b",
      palletQuantity: null,
      palletQuantityIcon: null,
      invoicePrice: 0.0,
      factoryCost: null,
      retailPriceFactor: 1.0,
      targetRetailPriceGross: null,
      product: {
        id: "114981bc-4602-43de-a2df-f4071908a96f",
        number: "KR0128-B99-ONR91",
        name: "Chairs 2 pcs VEGALTA",
        status: "OFFER",
        programName: "CHAIRS",
        mainImage: {
          id: "L2ltcG9ydGVkL3Byb2R1Y3RzL2tyemVzJUM1JTgyYV8yMDIxLTA5LTAyXzExMzA0MS9LUjAxMjgtQjk5LU9OUjkxXzA2LmpwZw==",
          dataId: "114981bc-4602-43de-a2df-f4071908a96f",
          name: "KR0128-B99-ONR91_06.jpg",
          lastModifiedAt: null,
        },
      },
      details: {
        transportCost: 0.72,
        otherCost: 2.0,
        currentPrice: null,
        nnnPrice: 0.0,
        nnnExwPrice: -0.72,
        minimalInvoicePrice: null,
        minimalMarginPercent: 15.0,
        minimalNnnPrice: null,
        minimalNnnExwPrice: null,
        recommendedInvoicePrice: null,
        recommendedMarginPercent: 25.0,
        recommendedNnnPrice: null,
        recommendedNnnExwPrice: null,
        retailPriceNet: 0.0,
        retailPriceGross: 0.0,
        marginPercent: 0.0,
        customerMarginPercent: 0.0,
        retailPriceFactor: 1.0,
        currencyCode: "EUR",
      },
      alerts: [
        {
          type: "warning",
          message: "no package quantity defined for product, using one package for calculations",
        },
      ],
    },
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 7,
    totalPages: 1,
  },
};

const OFFER_ITEMS_MOCK = {
  url: "/api/v1/offers/maciek-offer/offer-items?page=0&size=10",
  method: "GET",
  status: 200,
  response: (request) => {
    const { body, searchParams } = request;

    return MOCK_RESPONSE;
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
                color: "dataId != null ? 'table-cell-background-grey-lighten-3': ''",
                items: [
                  {
                    title: "Input",
                    key: "inputs",
                    type: "",
                    editable: [{ label: "Invoice price (NN):", key: "invoicePrice", valueMapping: "invoicePrice" }],
                  },
                  {
                    type: "TEXT",
                    key: "recommendedPrice",
                    valueMapping:
                      '<div style="display:flex;flex-direction:column;line-height: 2">\n' +
                      '  <div style="display:flex;justify-content:space-between"><span>Price NNN:</span><span><b>{details.recommendedInvoicePrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                      '  <div style="display:flex;justify-content:space-between"><span>Price NNN EXW:</span><span><b>{details.recommendedNnnPrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                      '  <div style="display:flex;justify-content:space-between; margin-top: 8px"><span>MaT:</span><span><b> {details.marginAfterTransportAmount:0} {details.currencyCode:PLN} / {details.marginPercent:0}%</b></span></div>\n' +
                      "</div>",
                  },
                ],
              },
              {
                title: "Recommended",
                type: "TEXT",
                key: "recommendedPrice",
                valueMapping:
                  '<div style="display: flex; flex-direction: column; line-height:2; padding-top: 4px">\n' +
                  '  <div style="display: flex; justify-content: space-between;padding-bottom: 4px">\n' +
                  "    <span>Price NN:</span>\n" +
                  "    <span><b>{details.recommendedInvoicePrice:0.00}</b> {details.currencyCode:PLN}</span>\n" +
                  "  </div>\n" +
                  '  <div style="display: flex; justify-content: space-between;">\n' +
                  "    <span>Price NNN:</span>\n" +
                  "    <span><b>{details.recommendedInvoicePrice:0.00}</b> {details.currencyCode:PLN}</span>\n" +
                  "  </div>\n" +
                  '  <div style="display: flex; justify-content: space-between;">\n' +
                  "    <span>Price NNN EXW:</span>\n" +
                  "    <span><b>{details.recommendedNnnPrice:0.00}</b> {details.currencyCode:PLN}</span>\n" +
                  "  </div>\n" +
                  '  <div style="display: flex; justify-content: space-between; margin-top: 8px">\n' +
                  "    <span>MaT:</span>\n" +
                  "    <span><b>{details.marginPercent:0}%</b></span>\n" +
                  "  </div>\n" +
                  "</div>\n",
              },
              {
                title: "Offer",
                key: "collection2",
                type: "COLLECTION",
                color: "dataId != null ? 'table-cell-background-grey-lighten-3': ''",
                items: [
                  {
                    title: "Input",
                    key: "inputs",
                    type: "",
                    editable: [
                      { label: "Target price gross:", key: "targetPriceGross", valueMapping: "targetPriceGross" },
                      { label: "Price factor:", key: "priceFactor", valueMapping: "priceFactor" },
                    ],
                  },
                  {
                    title: "Result",
                    type: "TEXT",
                    key: "result",
                    valueMapping:
                      "" +
                      '<div style="display:flex;flex-direction:column; line-height: 1.8">\n' +
                      '  <div style="display:flex;justify-content:space-between">\n' +
                      "    <span>Price net/gross:</span>\n" +
                      "    <span><b>{details.retailPriceNet:0.00}</b> {details.currencyCode:PLN} / <b>{details.retailPriceGross:0.00}</b> {details.currencyCode:PLN}</span>\n" +
                      "  </div>\n" +
                      '  <div style="display:flex;justify-content:space-between;">\n' +
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
