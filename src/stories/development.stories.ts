// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import { OFFER_ITEMS_MOCK, RELATIONSHIP_RESPONSE } from "./responses";

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
    schema: {},
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
                type: "IMAGE",
                properties: { minWidth: 80, maxWidth: 80,  cellProps: { style: "padding-left:4px; padding-right:4px;" }, },
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
                title: "",
                key: "palletQuantityIcon",
                valueMapping: "palletQuantityIcon",
                type: "ICON",
                properties: { sortable: false },
              },
              {
                title: "Offer",
                key: "collection",
                type: "COLLECTION",
                color: "",
                items: [
                  {
                    title: "Input",
                    key: "inputs",
                    type: "",
                    editable: [{ label: "Invoice (NN):", key: "invoicePrice", valueMapping: "invoicePrice" }],
                  },
                  {
                    type: "TEXT",
                    key: "offerPrice",
                    valueMapping:
                      '<div style="display:flex;flex-direction:column;padding-top: 16px">\n  <div style="display:flex;justify-content:space-between"><span>NNN:</span><span><b>{details.nnnPrice:-:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span></div>\n  <div style="display:flex;justify-content:space-between"><span>NNN EXW:</span><span><b>{details.nnnExwPrice:-:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span></div>\n<div style="display:flex;justify-content:space-between;margin-top: 8px"><span>MaT:</span><span><b> {details.marginAfterTransportAmount:-:NUMBER:details.currencyDecimalPlaces}  </b>{details.currencyCode:PLN}</span></div>\n  <div style="display:flex;justify-content:space-between"><span>MaT (%):</span><span><b> {details.marginAfterTransportPercent:0.0:NUMBER:1}%</b></span></div></div>',
                  },
                ],
                properties: {
                  minWidth: "220px",
                  maxWidth: "220px",
                  cellProps: { style: "vertical-align: top; padding-top: 8px" },
                },
              },
              {
                title: "Recommended",
                type: "TEXT",
                key: "recommendedPrice",
                valueMapping:
                  '<div style="display: flex; flex-direction: column;">\n  <div style="display: flex; justify-content: space-between;margin-top:16px;margin-bottom:24px;">\n    <span>NN:</span>\n    <span><b>{details.recommendedInvoicePrice:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n  <div style="display: flex; justify-content: space-between;">\n    <span>NNN:</span>\n    <span><b>{details.recommendedNnnPrice:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n  <div style="display: flex; justify-content: space-between;">\n    <span>NNN EXW:</span>\n    <span><b>{details.recommendedNnnExwPrice:0.00:NUMBER:details.currencyDecimalPlaces}</b> {details.currencyCode:PLN}</span>\n  </div>\n<div style="display:flex;justify-content:space-between;margin-top: 8px"><span>MaT:</span><span><b> {details.recommendedMarginAfterTransportAmount:-:NUMBER:details.currencyDecimalPlaces} </b>{details.currencyCode:PLN}</span></div>\n  <div style="display: flex; justify-content: space-between">\n    <span>MaT (%):</span>\n    <span><b>{details.recommendedMarginAfterTransportPercent:0.0:NUMBER:1}%</b></span>\n  </div>\n</div>',
                properties: {
                  minWidth: "200px",
                  maxWidth: "200px",
                  cellProps: { style: "vertical-align: top;" },
                },
                color: "dataId != null ? 'table-cell-background-grey-light': ''",
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
                        label: "Target:",
                        key: "targetRetailPriceGross",
                        valueMapping: "targetRetailPriceGross",
                      },
                      { label: "Factor:", key: "retailPriceFactor", valueMapping: "retailPriceFactor" },
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
                key: "collection2",
                type: "COLLECTION",
                color: "dataId != null ? 'table-cell-background-grey-light': ''",
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
                  minWidth: "250px",
                  maxWidth: "250px",
                  cellProps: { style: "vertical-align: top;" },
                },
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
  parameters: {
    mockData: [RELATIONSHIP_RESPONSE],
  },
  args: {
    model: {
      dataId: 1,
    },
    schema: {
      type: "object",
      properties: {
        partners: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/api/v1/customers/{dataId}/relationships",
            headers: [
              {
                title: "Number",
                key: "number",
                type: "TEXT",
                valueMapping: "{partner.number}",
              },
              {
                title: "Name",
                key: "name",
                type: "TEXT",
                valueMapping: "{partner.name}",
              },
              {
                title: "Function",
                key: "function.name",
                type: "TEXT",
                valueMapping: "{function.name}",
              },
            ],
          },
          actions: {
            "partner.name": "redirectToCustomerDetails",
            "partner.number": "redirectToCustomerDetails",
          },
        },
      },
      required: [],
    },
  },
};

export const Table2: Story = {
  parameters: {
    mockData: [RELATIONSHIP_RESPONSE],
  },
  args: {
    model: {
      attributes: [
        {
          definition: {
            code: "wysokosc",
            label: "Wysokosc",
            valueType: "NUMBER",
            priority: 6,
          },
          numberValue: "10",
        },
        {
          definition: {
            code: "waga-calkowita-kg",
            label: "Waga całkowita kg",
            valueType: "NUMBER",
            priority: 5,
          },
          numberValue: 1,
        },
        {
          definition: {
            code: "gramatura",
            label: "Gramatura",
            valueType: "TEXT",
            priority: 4,
          },
          textValue: "test",
        },
        {
          definition: {
            code: "czas-palenia",
            label: "Czas Palenia",
            valueType: "TEXT",
            priority: 3,
          },
          textValue: "test123321312",
        },
        {
          definition: {
            code: "ilosc-w-opakowaniu",
            label: "Ilość w opakowaniu",
            valueType: "NUMBER",
            priority: 2,
          },
          numberValue: 3123,
        },
      ],
    },
    schema: {
      type: "object",
      properties: {
        attributes: {
          layout: {
            component: "duplicated-section",
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
              xl: 12,
              xxl: 12,
            },
            schema: {
              type: "object",
              properties: {
                definition: {
                  label: "Atrybut",
                  layout: {
                    component: "dictionary",
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      xxl: 6,
                    },
                  },
                  source: {
                    url: "/api/dictionaries?feature-id=attribute-definitions&lm=basicData.name&vm=dataId&customAttributes=valueType%2C%7BbasicData.valueType%7D%2Cdictionary%2C%7Bdictionary.code%7D",
                    title: "label",
                    value: "code",
                    lazy: true,
                    singleOptionAutoSelect: true,
                    returnObject: true,
                  },
                },
                dateValue: {
                  label: "Data",
                  layout: {
                    component: "date-picker",
                    if: "nata(attributes[].definition.valueType='DATE'",
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      xxl: 6,
                    },
                  },
                },
                numberValue: {
                  label: "Liczba",
                  layout: {
                    component: "number-field",
                    if: "nata(attributes[].definition.valueType='NUMBER')",
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      xxl: 6,
                    },
                  },
                  type: "float",
                },
                textValue: {
                  label: "Tekst",
                  layout: {
                    component: "text-field",
                    if: "nata(attributes[].definition.valueType='TEXT')",
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      xxl: 6,
                    },
                  },
                },
              },
              required: [],
            },
            options: {
              addBtnText: "Dodaj atrybut",
              showDivider: false,
              ordinalNumberInModel: false,
            },
            editable: true,
            showElements: true,
            props: {},
          },
        },
      },
      required: [],
    },
  },
};
