// @ts-nocheck
import { HttpResponse, http } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";

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
  loaders: [mswLoader],
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ForteStart: Story = {
  args: {
    model: {},
    schema: {},
  },
};

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
            footerMapping: "<div style='display:flex; justify-content: space-between; padding-top: 16px'><div>Total Quantity:</div> <div><b>{totalItemQuantity}</b></div></div>",
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

export const Forte: Story = {
  args: {
    model: {
      customer: {
        id: "00086a7f-afad-44ca-b8c5-1ab673ffbfc2",
        description: "",
        label: "(33106) SZEGFU  BUTORIPARI Kft.",
        customerId: "00086a7f-afad-44ca-b8c5-1ab673ffbfc2",
        name: "(33106) SZEGFU  BUTORIPARI Kft.",
        shipCountry: "Hungary",
        salesRegion: "",
      },
      pricelist: {
        id: "00086a7f-afad-44ca-b8c5-1ab673ffbfc2",
        description: "",
        label: "(33106) SZEGFU  BUTORIPARI Kft. [0]",
        shipCountryId: "HU",
        discountPercent: 0,
        defaultCurrencyCode: "HUF",
        highestUserRole: "SU",
        lastQuarterTransportCostRateEurM3: 0,
        defaultIncotermsRule: "DAP",
      },
      offer: {
        type: {
          id: "OTD",
          description: "",
          label: "Standard",
        },
        currency: {
          id: "EUR",
          description: "",
          label: "Euro",
        },
        vatRate: 27,
        number: "2025/3/STD/37",
        id: "802d5b51-655b-413e-a19e-fd0f46863863",
        currencyRate: 4,
        createdBy: "Admin Tecna",
        createdAt: "2025-03-14T09:14:56.343Z",
        owner: [
          {
            firstName: "Admin",
            lastName: "Tecna",
            id: {},
            email: "tecna@dev-forte.int.tecna.pl",
            username: "TECNA",
          },
        ],
      },
      transportConditions: {
        transportCostRateEurM3: 0,
        incotermsRule: {
          id: "DAP",
          description: "Delivered at Place",
          label: "Delivered at Place",
        },
      },
      calculationRules: {
        discountPercent: 0,
        retailPriceFactor: 6,
      },
      offerCreatorRole: "SU",
      showAdditionalData: false,
    },
    schema: {
      type: "object",
      properties: {
        customerData: {
          content:
            "<b>Customer:</b></br> \n{customer.name:No data}\n<br> {customer.shipCountry:No country}, {customer.salesRegion:No sales region}",
          layout: {
            component: "static-content",
            tag: "p",
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
        },
        offer: {
          properties: {
            createdAt: {
              label: "Created at",
              layout: {
                component: "data-viewer",
                cols: { xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 },
              },
              valueMapping: "",
              type: "date-time",
            },
            createdBy: {
              label: "Created by",
              layout: {
                component: "data-viewer",
                cols: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
              },
              valueMapping: "{offer.createdBy}",
            },
          },
          required: [],
        },
        priceList: {
          content: "<b>Pricelist:</b></br> \n{pricelist. label:No data}\n",
          layout: {
            component: "static-content",
            tag: "p",
            cols: { xs: 12, sm: 12, md: 12, lg: 10, xl: 10, xxl: 10 },
          },
        },
        offerOwner: {
          label: "Owned by",
          layout: { component: "data-viewer", cols: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 } },
          valueMapping: "{offer.owner[0].firstName:No data} {offer.owner[0].lastName:No data}",
          type: null,
        },
        showAdditionalData: {
          label: "Advanced settings",
          layout: { component: "switch", props: { color: "success" } },
        },
        groupOfData: {
          layout: {
            component: "fields-group",
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            schema: {
              type: "object",
              properties: {
                offer: {
                  properties: {
                    currency: {
                      label: "Currency",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "dictionary",
                        props: { clearable: false, readonly: true },
                      },
                      source: {
                        url: "/api/dictionaries?feature-id=currencies&lm=name&vm=dataId&dm=%7Bname%7D",
                        title: "id",
                        value: "id",
                        returnObject: true,
                        description: "description",
                      },
                    },
                    currencyRate: {
                      label: "Currency rate",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "number-field",
                        props: { readonly: true },
                      },
                      type: "float",
                      precision: "4",
                      precisionMin: "2",
                    },
                    vatRate: {
                      label: "VAT rate (%)",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        fillRow: true,
                        component: "combobox",
                      },
                      source: { url: "", title: "label", value: "id" },
                    },
                  },
                  required: [],
                },
                "static-content-953": {
                  content: "Transport conditions",
                  layout: { component: "static-content", tag: "h3" },
                },
                transportConditions: {
                  properties: {
                    incotermsRule: {
                      label: "Incoterms® Rule",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "dictionary",
                      },
                      source: {
                        url: "/api/dictionaries?feature-id=incoterm-rules&lm=name&vm=dataId&dm=%7Bname%7D",
                        title: "id",
                        value: "id",
                        returnObject: true,
                        lazy: true,
                        singleOptionAutoSelect: true,
                        description: "description",
                      },
                      onChange: {
                        mode: "change-model",
                        variables: [{ path: "transportConditions.transportRate", value: null }],
                      },
                    },
                    transportCostRateEurM3: {
                      label: "Transport cost rate EUR/m3",
                      layout: {
                        cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                        component: "text-field",
                      },
                      defaultValue: null,
                    },
                    alert1: {
                      content: "If the Incoterms® are changed, the Transport Rate field must be completed.",
                      layout: {
                        component: "static-content",
                        tag: "v-alert",
                        cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
                        props: { type: "warning", density: "default", variant: "tonal" },
                      },
                    },
                  },
                  required: [],
                },
                "static-content-413": {
                  content: "Calculation rules",
                  layout: { component: "static-content", tag: "h3" },
                },
                calculationRules: {
                  properties: {
                    retailPriceFactor: {
                      label: "Retail price factor",
                      layout: {
                        cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                        fillRow: true,
                        component: "number-field",
                      },
                      type: "float",
                      precision: "2",
                      precisionMin: "2",
                      onChange: { mode: "emit-event", eventSignal: "table-refresh" },
                    },
                    discountPercent: {
                      label: "Customer discount (%)",
                      layout: {
                        cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                        component: "number-field",
                        fillRow: true,
                      },
                      type: "float",
                      precision: "2",
                      precisionMin: "2",
                    },
                    alert: {
                      content:
                        "Standard customer discounts retrieved from SAP. Retail price factor must be set to calculate retail price.",
                      layout: {
                        component: "static-content",
                        tag: "v-alert",
                        props: { variant: "tonal", type: "info", density: "default" },
                        cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
                      },
                    },
                  },
                  required: [],
                },
                otherCostsHeader: {
                  content: "<b>Other costs:</b><br/>",
                  layout: { component: "static-content", tag: "p" },
                },
                otherCosts: {
                  layout: {
                    component: "duplicated-section",
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                    schema: {
                      type: "object",
                      properties: {
                        costName: {
                          label: "Cost name",
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                            component: "text-field",
                          },
                        },
                        unitCostPerProduct: {
                          label: "Unit cost per product",
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                            component: "number-field",
                          },
                          type: "float",
                          precision: "2",
                          precisionMin: "2",
                        },
                        unitCostPerPackage: {
                          label: "Unit cost per package",
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                            component: "number-field",
                          },
                          type: "float",
                          precision: "2",
                          precisionMin: "2",
                        },
                      },
                      required: [],
                    },
                    options: {
                      addBtnText: "Add other costs",
                      showDivider: false,
                      ordinalNumberInModel: false,
                      showFirstInitRow: false,
                    },
                    editable: true,
                    showElements: true,
                    props: {},
                  },
                  editable: true,
                  showElements: true,
                  sectionKey: "groupOfData",
                },
              },
              required: [],
            },
            props: {},
            options: { showDivider: false, addBtnText: "Add" },
            if: "nata(showAdditionalData=true)",
          },
        },
        tableHeader: { content: "Products", layout: { component: "static-content", tag: "h3" } },
        offerCurrencyDescription: {
          content: "Offer currency: {offer.currency.id:PLN}",
          layout: {
            component: "static-content",
            tag: "v-alert",
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
            props: { variant: "tonal", type: "info" },
          },
        },
        tableOfOfferItems: { $ref: "../static/forms/offer-standard-table-v1.0.0.json" },
        tableOfOfferItemsOTD: { $ref: "../static/forms/offer-otd-table-v1.0.0.json" },
        tableOfOfferItemsB2C: { $ref: "../static/forms/offer-b2c-table-v1.0.0.json" },
        decisionDetails: {
          content: "Decision details",
          layout: { component: "static-content", tag: "h3" },
          label: "tableHeader171_cloned",
        },
        salesDirector: {
          label: "Sales Director",
          layout: {
            component: "user-input",
            if: "nata(pricelist.highestUserRole!='MD' and pricelist.highestUserRole!='SD')",
            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
            fillRow: true,
            props: { multiple: true, maxSelection: 1 },
          },
          source: {
            url: "/api/dictionaries?feature-id=customer-sales-manager-directors&lm=salesDirectorFullName&vm=salesDirector.id&customAttributes=username%2C%7BsalesDirector.username%7D%2CfirstName%2C%7BsalesDirector.firstName%7D%2ClastName%2C%7BsalesDirector.lastName%7D%2Cemail%2C%7BsalesDirector.emaill%7D&filter=customer.id%3D%3D{customer.customerId}%3Bid.salesManagerUsername%3D%3D%5E{offer.owner.username}",
          },
        },
        prepareOfferDecision: {
          label: "Decision",
          layout: { cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }, component: "select" },
          source: {
            items: [
              { value: "yes", title: "Yes - Send for approval" },
              {
                value: "no",
                title: "No - Cancel the offer",
              },
            ],
            returnObject: false,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: [...SCHEMAS, ...OFFER_ITEMS_MOCK],
    },
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
