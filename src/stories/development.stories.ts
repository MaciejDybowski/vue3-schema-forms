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
                color: "dataId != null ? '#E0E0E0': ''",
                title: "Input",
                key: "inputs",
                type: "",
                editable: [
                  { label: "Invoice price (NN):", valueMapping: "invoicePrice" },

                  {
                    label: "Retail price factor:",
                    valueMapping: "details.marginPercent",
                  },

                  {
                    label: "Retail target price gross:",
                    valueMapping: "details.recommendedMarginPercent",
                    class: "ml-auto",
                  },
                ],
                properties: {
                  maxWidth: 200,
                  minWidth: 200,
                },
              },
              {
                title: "Recommendation",
                type: "TEXT",
                key: "recommendedPrice",
                valueMapping:
                  '<div style="display:flex;flex-direction:column">\n' +
                  '  <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span>Margin:</span><span><b>{details.marginPercent:0}%</b></span></div>\n' +
                  '  <div style="display:flex;justify-content:space-between"><span>NN:</span><span><b>{details.recommendedInvoicePrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                  '  <div style="display:flex;justify-content:space-between"><span>NNN:</span><span><b>{details.recommendedNnnPrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                  '  <div style="display:flex;justify-content:space-between"><span>NNN EXW:</span><span><b>{details.recommendedNnnExwPrice:0.00}</b> {details.currencyCode:PLN}</span></div>\n' +
                  "</div>",
              },
              {
                title: "Result",
                type: "TEXT",
                key: "result",
                valueMapping:
                  "" +
                  '<div style="display:flex;flex-direction:column">\n' +
                  '  <div style="display:flex;justify-content:space-between;margin-bottom:8px">\n' +
                  "    <span>MaT [%]:</span>\n" +
                  "    <span><b>{details.marginPercent:0}%</b></span>\n" +
                  "  </div>\n" +
                  '  <div style="display:flex;justify-content:space-between">\n' +
                  "    <span>Retail price:</span>\n" +
                  "  </div>\n" +
                  '  <div style="display:flex;justify-content:space-between">\n' +
                  "    <span>-net:</span>\n" +
                  "    <span><b>{details.retailPriceNet:0.00}</b> {details.currencyCode:PLN}</span>\n" +
                  "  </div>\n" +
                  '  <div style="display:flex;justify-content:space-between">\n' +
                  "    <span>-gross:</span>\n" +
                  "    <span><b>{details.retailPriceGross:0.00}</b> {details.currencyCode:PLN}</span>\n" +
                  "  </div>\n" +
                  "</div>",
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
