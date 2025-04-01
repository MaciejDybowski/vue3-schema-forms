// @ts-nocheck
import { HttpResponse, http } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";

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
  loaders: [mswLoader],
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

initialize();

const SCHEMAS = [
  http.get("/static/forms/offer-standard-table-v1.0.0.json", async (req, res, ctx) => {
    return HttpResponse.json({
      layout: {
        component: "table-view",
        if: "nata(offer.type.id='STD')",
      },
    });
  }),
  http.get("/static/forms/offer-otd-table-v1.0.0.json", async (req, res, ctx) => {
    return HttpResponse.json({
      layout: { component: "table-view", if: "nata(offer.type.id='OTD')" },
      source: {
        data: "/api/v1/offers/{offer.id}/offer-items",
        headers: [
          {
            type: "ALERT",
            key: "alerts",
            title: "",
            color:
              "product.status='DESIGNING' ? 'table-cell-background-blue-light-4' : product.status='IN_WITHDRAWN_PROCESS' ? 'table-cell-background-yellow-light-4' : product.status='REMOVED' ? 'table-cell-background-red-light-4' : ''",
            properties: { width: "24px", sortable: false },
          },
          {
            title: "Product",
            key: "mainImageUrl",
            valueMapping:
              "/api/v1/features/products/images/{product.mainImage.id}?Workspace-Id=forte&dataId={product.mainImage.dataId}",
            footerMapping: "<div style='padding-top: 16px'><b>Summary</b></div>",
            type: "IMAGE",
            properties: {
              minWidth: 80,
              maxWidth: 80,
              cellProps: { style: "padding-left:4px; padding-right:4px;" },
            },
          },
          {
            title: "",
            key: "product",
            valueMapping:
              '<div>\n  <span style="display: block; margin-top: 16px"><b>{product.number:1}</b></span>\n  <span style="display: block;">{product.name: Product name}</span>\n  <span style="display: block; margin-top: 16px">Program: {product.programName:N/A}</span>\n  <span style="display: block; margin-top: 16px;">Cluster: {product.pricingTierName:N/A}</span>\n</div>\n',
            type: "TEXT",
            properties: { cellProps: { style: "vertical-align: top;" } },
          },
          {
            title: "Offer",
            key: "collection",
            type: "COLLECTION",
            color: "",
            items: [
              {
                title: "Input Invoice Price",
                key: "input-invoice-price",
                type: "",
                editable: [{ label: "Invoice (NN):", key: "invoicePrice", valueMapping: "invoicePrice" }],
              },
              {
                type: "TEXT",
                key: "offerPrice",
                valueMapping:
                  '<div style="display: flex; flex-direction: column; padding-top: 16px;"><div style="display: flex; justify-content: space-between;"><span>NNN:</span><span><b>{details.nnnPrice:-:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span></div><div style="display: flex; justify-content: space-between;"><span>NNN EXW:</span><span><b>{details.nnnExwPrice:-:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span></div><div style="display: flex; justify-content: space-between; margin-top: 16px;"><span>MaT:</span><span><b>{details.marginAfterTransportAmount:-:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span></div><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>MaT (%):</span><span><b>{details.marginAfterTransportPercent:0.0:NUMBER:1}%</b></span></div></div>',
              },
              {
                title: "Input quantity",
                key: "input-quantity",
                type: "",
                editable: [{ label: "Quantity", key: "itemQuantity", valueMapping: "itemQuantity" }],
              },
            ],
            properties: {
              minWidth: "170px",
              maxWidth: "170px",
              cellProps: { style: "vertical-align: top; padding-top: 8px; padding-bottom:8px;" },
            },
            footerMapping:
              "<div style='display:flex; justify-content: space-between; padding-top: 16px'><div>Total Quantity:</div> <div><b>{totalItemQuantity}</b></div></div>",
          },
          {
            title: "Retail",
            type: "COLLECTION",
            items: [
              {
                title: "Input",
                key: "inputs",
                type: "",
                editable: [
                  {
                    label: "Target gross",
                    key: "targetRetailPriceGross",
                    valueMapping: "targetRetailPriceGross",
                  },
                  { label: "Factor", key: "retailPriceFactor", valueMapping: "retailPriceFactor" },
                ],
              },
            ],
            key: "retail",
            valueMapping: "retails",
            properties: {
              minWidth: "170px",
              maxWidth: "170px",
              cellProps: { style: "vertical-align: top; padding-top: 8px" },
            },
          },
          {
            title: "",
            type: "TEXT",
            key: "recommendedPrice",
            valueMapping:
              '<div style="display: flex; flex-direction: column;">\n  <div style="display: flex; justify-content: space-between;margin-top:20px;margin-bottom:32px;">\n    <span>Price gross:</span>\n    <span><b>{details.retailPriceGross:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n  <div style="display: flex; justify-content: space-between;">\n    <span>Price net:</span>\n    <span><b>{details.retailPriceNet:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n<div style="display: flex; justify-content: space-between; margin-top: 32px">\n    <span>Retailer margin:</span>\n    <span><b>{details.retailerMarginAmount:0.0:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n<div style="display:flex;justify-content:space-between;"><span>Retailer margin [%]:</span><span><b> {details.retailerMarginPercent:-:NUMBER:1}%</b></span></div>\n </div>',
            properties: {
              minWidth: "200px",
              maxWidth: "200px",
              cellProps: { style: "vertical-align: top;" },
            },
            color: "dataId != null ? 'table-cell-background-grey-light': ''",
          },
          {
            title: "Result",
            key: "collection2",
            type: "TEXT",
            color: "",
            items: [
              {
                title: "Result",
                type: "TEXT",
                key: "result",
                valueMapping:
                  '<div style="display:flex;flex-direction:column;"><div style="display:flex;justify-content:space-between; margin-top:16px;margin-bottom:24px"><span>Price gross:</span><div><b>{details.retailPriceGross:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</div></div><div style="display:flex;justify-content:space-between"><span>Price net:</span><div><b>{details.retailPriceNet:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</div></div><div style="display:flex;justify-content:space-between;margin-top:28px"><span>Retailer margin:</span><span><b>{details.retailerMarginAmount:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span></div><div style="display:flex;justify-content:space-between"><span>Retailer margin [%]:</span><span><b>{details.retailerMarginPercent:0.0:NUMBER:1}%</b></span></div></div>',
              },
            ],
            properties: {
              minWidth: "200px",
              maxWidth: "200px",
              cellProps: { style: "vertical-align: top;" },
            },
            valueMapping:
              '<div style="display: flex; flex-direction: column;">\n  <div style="display: flex; justify-content: space-between;margin-top:20px;margin-bottom:22px;">\n    <span>Sales NN:</span>\n    <span><b>{details.totalInvoicePrice:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n  <div style="display: flex; justify-content: space-between;margin-top: 8px">\n    <span>Sales NNN:</span>\n    <span><b>{details.totalNnnPrice:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n<div style="display:flex;justify-content:space-between;margin-top: 26px"><span>MaT absolut:</span><span><b> {details.totalMarginAfterTransportAmount:-:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span></div>\n</div>',
            footerMapping:
              '<div style="display: flex; flex-direction: column; padding-top: 16px; padding-bottom: 16px">\n  <div style="display: flex; justify-content: space-between;">\n    <span>Total Sales NN:</span>\n    <span><b>{totalInvoicePrice:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n  <div style="display: flex; justify-content: space-between;">\n    <span>Total Sales NNN:</span>\n    <span><b>{totalNnnPrice:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n<div style="display:flex;justify-content:space-between;margin-top: 18px"><span>Total MaT:</span>\n    <span><b>{totalMarginAfterTransportAmount:0.0:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span></div>\n  <div style="display: flex; justify-content: space-between">\n  <span>Total MaT (%):</span><span><b> {totalMarginAfterTransportPercent:-:NUMBER:1}%</b></span>  \n  </div>\n</div>',
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
                config: { params: { script: "delete_product_from_offer" }, body: { dataId: "{product.id}" } },
                props: { color: "error" },
              },
              {
                title: "Pallet shipping",
                condition: "palletQuantity=null",
                icon: "mdi-shipping-pallet",
                mode: "action",
                code: "callScript",
                config: { params: { script: "add_pallet_price" }, body: { dataId: "{product.id}" } },
                props: { color: "primary" },
              },
              {
                title: "Disable pallet shipping",
                condition: "palletQuantity=true or palletQuantity=false",
                icon: "mdi-shipping-pallet",
                mode: "action",
                code: "callScript",
                config: {
                  params: { script: "disable_offer_item_pallet_quantity" },
                  body: { dataId: "{product.id}" },
                },
                props: { color: "error" },
              },
            ],
            properties: { width: "24px", sortable: false },
          },
        ],
        buttons: [
          {
            label: "Add products",
            btnProps: { color: "primary", rounded: false },
            mode: "action",
            config: {
              code: "batchAdd",
              featureId: "products",
              viewId: "94578-tabela",
              batchAddAttributePath: "dataId",
              scriptName: "add_products_to_offer",
            },
          },
        ],
      },
      actions: {},
    });
  }),
  http.get("/static/forms/offer-b2c-table-v1.0.0.json", async (req, res, ctx) => {
    return HttpResponse.json({
      layout: {
        component: "table-view",
        if: "nata(offer.type.id='B2C')",
      },
    });
  }),
];

export const Table: Story = {
  args: {
    model: {
      popupModel: {
        csvBody: "1.2.3.4.5.6.7",
      },
    },
    schema: {
      type: "object",
      properties: {
        button: {
          label: "Click it!",
          layout: {
            component: "button",
          },
          mode: "form-and-action",
          config: {
            code: "update_csv",
            modelReference: "popupModel",
            title: "string",
          },
          schema: {
            properties: {
              button: {
                label: "Copy CSV",
                layout: {
                  component: "button",
                  props: {
                    "append-icon": "mdi-content-copy"
                  }
                },
                mode: "copy",
                config: {
                  modelReference: "csvBody",
                },
              },
              csvBody: {
                label: "CsvBody",
                layout: {
                  component: "text-field",
                },
              },
              input: {
                label: "Input",
                layout: {
                  component: "text-field",
                },
              },
            },
          },
        },
      },
    },
  },
};
