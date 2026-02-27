// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';










export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    emittedObject: {},
    signals: {},
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: '',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const Table4: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        generalInfo: {
          title: 'General Info',
          layout: {
            component: 'card',
            schema: {
              type: 'object',
              properties: {
                createdAt: {
                  label: 'Created At',
                  layout: {
                    component: 'data-viewer',
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    },
                    offset: {
                      xs: 0,
                      sm: 0,
                      md: 0,
                      lg: 10,
                      xl: 10,
                      xxl: 10,
                    },
                    fillRow: true,
                  },
                  type: 'date-time',
                },
                requestor: {
                  label: 'Requestor',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    component: 'user-input',
                    props: {
                      multiple: false,
                      readonly: true,
                    },
                  },
                  source: {
                    url: '',
                  },
                  onChange: [],
                },
                requestVariant: {
                  label: 'Request variant',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'select',
                  },
                  source: {
                    items: [
                      {
                        value: 'v1',
                        title: 'Custom project - can be a blank page',
                      },
                      {
                        value: 'v2',
                        title: 'New category for existing program',
                      },
                      {
                        value: 'v3',
                        title: 'New decor for existing SKUs ',
                      },
                      {
                        value: 'v4',
                        title:
                          'New article for existing program: new décor, new dimensions or new furniture type',
                      },
                      {
                        value: 'v5',
                        title:
                          'GIGA tenders - potential to offer or slightly rework something from Forte offer',
                      },
                      {
                        value: 'v6',
                        title:
                          'GIGA Design for Fair DE/FR - GIGA owns the design and provides brief to share costs for this program',
                      },
                      {
                        value: 'v7',
                        title: 'OEM & Customer owned designs (NOT GIGA)',
                      },
                    ],
                  },
                  onChange: [],
                },
                chooseSalesRegions: {
                  label: 'Choose sales regions',
                  layout: {
                    component: 'radio-button',
                    props: {
                      inline: true,
                    },
                    cols: 12,
                  },
                  source: {
                    items: [
                      {
                        value: 'all',
                        title: 'All sales regions',
                      },
                      {
                        value: 'specific',
                        title: 'Specific sales regions',
                      },
                    ],
                  },
                  onChange: [],
                },
                salesRegionsAndCustomers: {
                  layout: {
                    component: 'duplicated-section',
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    schema: {
                      type: 'object',
                      properties: {
                        salesRegion: {
                          label: 'Sales region',
                          layout: {
                            component: 'dictionary',
                            cols: 12,
                          },
                          source: {
                            url: '/api/dictionaries?feature-id=sales-regions&lm=name&vm=dataId',
                            title: 'label',
                            value: 'id',
                            multiple: false,
                            singleOptionAutoSelect: true,
                            lazy: true,
                            returnObject: true,
                          },
                          onChange: [],
                        },
                        chooseCustomer: {
                          label: 'Choose customer',
                          layout: {
                            component: 'radio-button',
                            props: {
                              inline: true,
                            },
                            cols: 12,
                          },
                          source: {
                            items: [
                              {
                                value: 'specific',
                                title: 'Select specific customer',
                              },
                              {
                                value: 'new',
                                title: 'Enter name of new customer',
                              },
                            ],
                          },
                          onChange: [],
                        },
                        specificCustomer: {
                          label: 'Choose customer',
                          layout: {
                            component: 'dictionary',
                            if: 'nata(salesRegionsAndCustomers[].chooseCustomer="specific")',
                            cols: 12,
                          },
                          source: {
                            url: '/api/dictionaries?feature-id=payers-sold-to-parties&lm=name&vm=payer.id&&customAttributes=number%2C%7Bpayer.number%7D%2Cname%2C%7Bpayer.name%7D&filter=salesRegion.id%3D%3D{salesRegionsAndCustomers.salesRegion.id}',
                            title: 'label',
                            value: 'id',
                          },
                        },
                        newCustomerName: {
                          label: 'Name of new customer',
                          layout: {
                            component: 'text-field',
                            if: 'nata(salesRegionsAndCustomers[].chooseCustomer="new")',
                            cols: 12,
                          },
                          onChange: [],
                        },
                      },
                      required: ['salesRegion'],
                    },
                    options: {
                      addBtnText: 'Add sales region',
                      showDivider: true,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                    },
                    if: 'nata(chooseSalesRegions="specific")',
                    fillRow: true,
                  },
                  editable: true,
                  showElements: true,
                  onChange: [],
                  schema: {
                    properties: {
                      salesRegion: {
                        layout: {
                          cols: {
                            lg: 12,
                            xl: 12,
                            xxl: 12,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            cols: 12,
            cardProps: {
              cardTitleClass: 'bg-grey-lighten-2',
              variant: 'elevated',
              elevation: 10
            },
          },
        },
        projectInformation: {
          layout: {
            component: 'fields-group',
            title: 'Project Information',
            schema: {
              type: 'object',
              properties: {
                shortname: {
                  label: 'Project short name',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-field',
                    props: {
                      hint: 'e.g. Farmhouse living for Otto,  Good modular system for Agata, Trondheim replacement for Roller,',
                      'persistent-hint': true,
                    },
                  },
                  onChange: [],
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
        businessBackground: {
          layout: {
            component: 'fields-group',
            title: 'Business Background',
            schema: {
              type: 'object',
              properties: {
                reasonForProject: {
                  label: 'Reason for project',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 9,
                      md: 9,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
        businessCase: {
          layout: {
            component: 'fields-group',
            title: 'Business Case',
            schema: {
              type: 'object',
              properties: {
                nnn: {
                  label: 'NNN in €',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'number-field',
                  },
                  type: 'float',
                  onChange: [],
                  precision: '2',
                  precisionMin: '2',
                  roundOption: 'round',
                },
                mat: {
                  label: 'MAT in %',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'number-field',
                  },
                  type: 'int',
                  onChange: [],
                  precision: '2',
                  precisionMin: '2',
                  roundOption: 'round',
                },
                sku: {
                  label: '# of SKU',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'number-field',
                    props: {
                      hint: 'Optional: Volume in pcs (total program)',
                      'persistent-hint': true,
                    },
                  },
                  type: 'int',
                  onChange: [],
                  precision: '2',
                  precisionMin: '2',
                  roundOption: 'round',
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
        programAttributesInformation: {
          layout: {
            component: 'fields-group',
            title: 'Program attributes information',
            schema: {
              type: 'object',
              properties: {
                category: {
                  label: 'Category',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'dictionary',
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-categories&lm=name&vm=code&filter=parent%3Dnull%3D',
                    title: 'label',
                    value: 'id',
                    description: 'description',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: false,
                    multiple: true,
                    maxSelection: 5,
                  },
                  onChange: [],
                },
                designDirection: {
                  label: 'Design direction',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
                inspiration: {
                  layout: {
                    component: 'fields-group',
                    title: 'Inspiration',
                    schema: {
                      type: 'object',
                      properties: {
                        inspirationLink: {
                          label: 'Inspiration Link',
                          layout: {
                            cols: {
                              xs: 12,
                              sm: 6,
                              md: 6,
                              lg: 12,
                              xl: 12,
                              xxl: 12,
                            },
                            component: 'text-field',
                          },
                          onChange: [],
                        },
                        inspirationFile: {
                          label: 'Inspiration File',
                          layout: {
                            cols: {
                              xs: 12,
                              sm: 6,
                              md: 6,
                              lg: 12,
                              xl: 12,
                              xxl: 12,
                            },
                            fillRow: true,
                            component: 'file-field',
                          },
                        },
                      },
                    },
                    options: {
                      showDivider: false,
                      addBtnText: 'Add',
                    },
                    cols: 12,
                  },
                },
                pricingTier: {
                  label: 'Pricing tier',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'dictionary',
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=pricing-tiers&lm=name&vm=dataId',
                    title: 'label',
                    value: 'id',
                    description: 'description',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: false,
                    multiple: false,
                    maxSelection: 5,
                  },
                  onChange: [],
                },
                carcase: {
                  label: 'Carcase - material + decor',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    component: 'dictionary',
                    props: {
                      hint: '',
                      'persistent-hint': true,
                    },
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-decors&lm=name&vm=dataId',
                    title: 'label',
                    value: 'dataId',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    multiple: true,
                    maxSelection: 3,
                  },
                },
                carcaseComments: {
                  content: 'Click to add comments',
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                },
                front: {
                  label: 'Front - material + decor',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    component: 'dictionary',
                    props: {
                      hint: '',
                      'persistent-hint': true,
                    },
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-decors&lm=name&vm=dataId',
                    title: 'label',
                    value: 'dataId',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    multiple: true,
                    maxSelection: 3,
                  },
                  onChange: [],
                },
                frontComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                edgeBanding: {
                  label: 'Edge banding ABS / Paper - which ones?',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    component: 'dictionary',
                    props: {
                      hint: '',
                      'persistent-hint': true,
                    },
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-edge-types&lm=label&vm=dataId',
                    title: 'label',
                    value: 'dataId',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    multiple: true,
                    maxSelection: 3,
                  },
                },
                edgeBandingComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                drawerGuide: {
                  label: 'Drawer guide - which ones?',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    component: 'dictionary',
                    props: {
                      hint: '',
                      'persistent-hint': true,
                    },
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-runner-types&lm=label&vm=dataId',
                    title: 'label',
                    value: 'dataId',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    multiple: true,
                    maxSelection: 3,
                  },
                },
                drawerGuideComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                drawerInsideDecor: {
                  label: 'Drawer inside decor',
                  layout: {
                    fillRow: true,
                    component: 'text-field',
                    cols: 12,
                  },
                },
                insideDivisionInArticle: {
                  label: 'Inside division in the article',
                  layout: {
                    component: 'text-area',
                    fillRow: true,
                    cols: 12,
                  },
                },
                hinges: {
                  label: 'Hinges - which ones?',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    component: 'dictionary',
                    props: {
                      hint: '',
                      'persistent-hint': true,
                    },
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-hinges&lm=label&vm=dataId&dm=description%2C%7Bdescription%7D',
                    title: 'label',
                    value: 'dataId',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    multiple: false,
                    maxSelection: 0,
                    description: 'description',
                  },
                },
                hingesComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                leg: {
                  label: 'Leg - material + decor',
                  layout: {
                    component: 'dictionary',
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    props: {
                      hint: '',
                      'persistent-hint': true,
                    },
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-legs-materials&lm=label&vm=dataId',
                    title: 'label',
                    value: 'dataId',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    multiple: true,
                    maxSelection: 3,
                  },
                },
                legComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                handle: {
                  label: 'Handle - material + decor',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    component: 'dictionary',
                    props: {
                      hint: '',
                      'persistent-hint': true,
                    },
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-handle-materials&lm=label&vm=dataId',
                    title: 'label',
                    value: 'dataId',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    multiple: true,
                    maxSelection: 3,
                  },
                },
                handleComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                lightning: {
                  label: 'Lightning - decor',
                  layout: {
                    component: 'radio-button',
                    props: {
                      inline: true,
                      hint: '',
                      'persistent-hint': true,
                    },
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                  },
                  source: {
                    items: [
                      {
                        value: 'none',
                        title: 'None',
                      },
                      {
                        value: 'optional',
                        title: 'Optional',
                      },
                      {
                        value: 'included',
                        title: 'Included',
                      },
                    ],
                  },
                },
                lightningComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                upholstery: {
                  label: 'Upholstery - Material + Decor',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    component: 'dictionary',
                    props: {
                      hint: '',
                      'persistent-hint': true,
                    },
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=product-upholstery-colors&lm=label&vm=dataId',
                    title: 'label',
                    value: 'dataId',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    multiple: false,
                    maxSelection: 0,
                  },
                },
                upholsteryComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Fill in if new (appropriate data / parameters)',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                recessForSkirtingBoards: {
                  label: 'Recess for skirting boards',
                  layout: {
                    component: 'radio-button',
                    props: {
                      inline: true,
                    },
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                  },
                  source: {
                    items: [
                      {
                        value: 'yes',
                        title: 'Yes',
                      },
                      {
                        value: 'no',
                        title: 'No',
                      },
                    ],
                  },
                },
                recessForSkirtingBoardsComments: {
                  label: 'Comments',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 4,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    component: 'text-switch-field',
                    props: {
                      hint: 'Other comments',
                      'persistent-hint': true,
                    },
                    cellClass: 'pt-0',
                  },
                  content: 'Click to add comments',
                },
                glassDecor: {
                  label: 'Glass - Decor',
                  layout: {
                    fillRow: true,
                    component: 'text-field',
                    props: {
                      hint: 'If new enter the appropriate data/parameters (thickness, color, other)',
                    },
                    cols: 12,
                  },
                },
                additionalComments: {
                  label: 'Additional comments',
                  layout: {
                    component: 'text-area',
                    cols: 12,
                  },
                },
                targetRetailPrice: {
                  label: 'Target retail price',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
                criticalFunctionalities: {
                  label: 'Critical functionalities',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
                keyElements: {
                  label: 'Key Element(s) for program',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
        additionalInput: {
          layout: {
            component: 'fields-group',
            title: 'Additional Input',
            schema: {
              type: 'object',
              properties: {
                specialDesignRequirements: {
                  label: 'Special Requirements Regarding Design or Construction?',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
                specialPackagingRequirements: {
                  label: 'Special Requirements Regarding Packaging',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
                isExclusive: {
                  label: 'Offered as exclusive',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'switch',
                  },
                  onChange: [],
                },
                switchFairs: {
                  label: 'For fairs?',
                  layout: {
                    component: 'switch',
                    fillRow: true,
                    cols: 12,
                  },
                  onChange: [],
                },
                whichFairs: {
                  label: 'Which fairs?',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 8,
                      md: 8,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    component: 'dictionary',
                    if: 'nata(switchFairs=true)',
                  },
                  source: {
                    url: '/api/dictionaries?feature-id=trade-events&lm=name&vm=dataId',
                    title: 'label',
                    value: 'id',
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                  },
                  onChange: [],
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
        projectTiming: {
          layout: {
            component: 'fields-group',
            title: 'Project timing (ESTIMATIONS)',
            schema: {
              type: 'object',
              properties: {
                targetStartOfSales: {
                  label: 'Targeted start of sales',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    fillRow: true,
                    component: 'date-picker',
                  },
                  onChange: [],
                },
                firstDesignPresentation: {
                  label: 'First design presentation to Customer',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    fillRow: true,
                    component: 'date-picker',
                  },
                  onChange: [],
                },
                firstOfferPresentation: {
                  label: 'First offer presentation',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    fillRow: true,
                    component: 'date-picker',
                  },
                  onChange: [],
                },
                firstSamplesPresentation: {
                  label: 'First samples presentation',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 8,
                      xl: 8,
                      xxl: 8,
                    },
                    fillRow: true,
                    component: 'date-picker',
                  },
                  onChange: [],
                },
                commentsToTimings: {
                  label: 'Comments to timings',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
        optionalAdditionalInfo: {
          layout: {
            component: 'fields-group',
            title: 'ADDITIONAL INFO (optional)',
            schema: {
              type: 'object',
              properties: {
                commentsFromRequestor: {
                  label: 'Comments from Requestor',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'text-area',
                  },
                  onChange: [],
                },
                otherAttachments: {
                  label: 'Other attachements ',
                  layout: {
                    cols: {
                      xs: 12,
                      sm: 6,
                      md: 6,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    fillRow: true,
                    component: 'file-field',
                  },
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
      },
    },
  },
};

export const Table3: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        alert2: {
          memorable: true,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          layout: {
            component: 'alert',
            hide: "nata(item2!='a')",
            props: {
              type: 'warning',
              variant: 'outlined',
            },
          },
        },
        alert: {
          content: 'Lorem ipsum...',
          layout: {
            component: 'alert',
            props: {},
          },
        },
        item2: {
          label: 'item2',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            fillRow: true,
            component: 'text-field',
          },
          onChange: [],
          validations: [{ name: 'conditional-required', rule: 'item1=1', message: null }],
        },
      },
      required: ['item1'],
    },
  },
};

export const Table1: Story = {
  args: {
    formModel: {
      validationMessages: [
        {
          code: 'WARN001',
          message: 'This is a warning message',
          severity: 'warning',
        },
        {
          code: 'ERR001',
          message: 'This is an error message',
          severity: 'error',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        pesel: {
          label: 'pesel',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            fillRow: true,
            component: 'pesel-field',
          },
          onChange: [],
          checkSumValidation: 'warning',
          adultsValidation: 'warning',
        },
        nip: {
          label: 'nip',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            fillRow: true,
            component: 'nip-field',
          },
          onChange: [],
          checkSumValidation: 'error',
        },
        item1: {
          label: 'item1',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            fillRow: true,
            component: 'text-field',
          },
          onChange: [],
        },
        item2: {
          label: 'item2',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            fillRow: true,
            component: 'text-field',
          },
          onChange: [],
          validations: [{ name: 'conditional-required', rule: 'item1=1', message: null }],
        },
        sct: {
          label: 'Item-textField566',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            fillRow: true,
            component: 'text-field',
          },
          onChange: [],
          validations: [{ name: 'test', rule: "item1='SCT'", message: 'Stop STC w Krakowie' }],
        },
        item3: {
          memorable: false,
          content: 'item3',
          layout: {
            component: 'alert',
            props: { variant: 'outlined', type: 'warning', density: 'compact' },
          },
        },
        item3686Clone: {
          memorable: false,
          content: 'item3',
          layout: {
            component: 'alert',
            props: { variant: 'outlined', type: 'error', density: 'compact' },
          },
          label: 'item3686Clone',
        },
        validationMessages: {
          layout: {
            component: 'validation-messages-viewer',
            props: { variant: 'outlined', density: 'compact' },
          },
        },
      },
      required: ['item1'],
    },
  },
};

export const Table2: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        htmlDaneDost: {
          content: 'Dane dostawcy',
          layout: {
            component: 'static-content',
            tag: 'h3',
          },
        },
        ocrDopasowanie: {
          content:
            'Dostawca nie został dopasowany automatycznie. <br>\nNIP: {faktura.dostawcaNIP:Brak danych}, <br>Nazwa: {faktura.dostawcaNazwa: Brak danych}',
          layout: {
            component: 'static-content',
            tag: 'p',
            if: 'nata(tech.czyBrakDostawcy=true)',
          },
        },
        dostawca: {
          label: 'Wybierz dostawcę',
          layout: {
            component: 'dictionary',
            if: '',
            props: {
              clearable: true,
            },
          },
          source: {
            url: '/api/dictionaries?feature-id=dostawcy-rejestr&lm=nazwa&vm=id&customAttributes=nazwa%2C%7Bnazwa%7D%2Ckod%2C%7Bkod%7D%2Cnip%2C%7Bnip%7D%2Cadres%2C%7Badres%7D%2CkodPocztowy%2C%7BkodPocztowy%7D%2Cmiejscowosc%2C%7Bmiejscowosc%7D%2Ckraj%2C%7Bkraj%7D%2CnazwaWyswietlana%2C%7Bnazwa%7D%20-%20%7Bkod%7D%20-%20%7Bnip%7D%2CnumerKlienta%2C%7BnumerKlienta%7D %2CczyAktywny%2C%7BczyAktywny%7D&filter=czyAktywny%3D%3Dtrue',
            title: 'nazwaWyswietlana',
            value: 'id',
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
          onChange: {
            mode: 'action',
            code: 'callScript',
            params: {
              script: 'sprawdz_czy_duplikat',
            },
            body: {
              kodDostawcy: '{dostawca.kod}',
              numerFaktury: '{faktura.nrFaktury}',
            },
          },
          validations: [
            {
              name: 'conditional-required',
              rule: "rejestracja.decyzjaRejestracja.value!='dodajDostawce'",
            },
          ],
        },
        kod: {
          label: 'Kod dostawcy',
          layout: {
            component: 'data-viewer',
            if: 'nata(dostawca != null)',
          },
          type: 'text',
          valueMapping: '{dostawca.kod:Brak}',
        },
        numerKlienta: {
          label: 'Numer Klienta',
          layout: {
            component: 'data-viewer',
            if: 'nata(dostawca != null)',
          },
          type: 'text',
          valueMapping: '{dostawca.numerKlienta:Brak}',
        },
        nazwa: {
          label: 'Nazwa dostawcy',
          layout: {
            component: 'data-viewer',
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 6,
              xl: 6,
              xxl: 6,
            },
            if: 'nata(dostawca != null)',
          },
          valueMapping: '{dostawca.nazwa:Brak}',
        },
        nip: {
          label: 'NIP',
          layout: {
            component: 'data-viewer',
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 6,
              xl: 6,
              xxl: 6,
            },
            if: 'nata(dostawca != null)',
          },
          valueMapping: '{dostawca.nip:Brak}',
        },
        adres: {
          content:
            '{dostawca.adres:Brak danych} <br>{dostawca.kodPocztowy:Brak danych} {dostawca.miejscowosc:Brak danych}, {dostawca.kraj:Brak danych} <br><br>Saldo: {dostawca.saldo:Brak danych}',
          layout: {
            component: 'static-content',
            tag: 'p',
            if: 'nata(dostawca != null)',
          },
        },
        'divider-1': {
          layout: {
            component: 'divider',
          },
          thickness: 2,
          color: '#263238',
          opacity: '100',
        },
        htmlDaneFaktury: {
          content: 'Dane faktury',
          layout: {
            component: 'static-content',
            tag: 'h3',
          },
          label: '',
        },
        tech: {
          properties: {
            czyDuplikat: {
              label: 'Oznacz jako duplikat',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                },
                fillRow: true,
                component: 'switch',
              },
              mode: false,
            },
          },
        },
        faktura: {
          properties: {
            alertDuplikat: {
              content: 'Duplikat faktury',
              layout: {
                component: 'static-content',
                tag: 'v-alert',
                props: {
                  variant: 'outlined',
                  type: 'warning',
                  density: 'compact',
                },
                if: 'nata(tech.czyDuplikat=true)',
              },
            },
            nrReferencyjny: {
              label: 'Numer referencyjny',
              layout: {
                component: 'text-field',
                props: {
                  readonly: true,
                },
              },
            },
            nrFaktury: {
              label: 'Nr faktury',
              layout: {
                component: 'text-field',
              },
              onChange: {
                mode: 'action',
                code: 'callScript',
                params: {
                  script: 'sprawdz_czy_duplikat',
                },
                body: {
                  kodDostawcy: '{dostawca.kod}',
                  numerFaktury: '{faktura.nrFaktury}',
                },
              },
              validations: [
                {
                  name: 'conditional-required',
                  rule: "rejestracja.decyzjaRejestracja.value='zatwierdz'",
                  message: null,
                },
              ],
            },
            numerKsef: {
              label: 'Nr KSEF',
              layout: {
                component: 'text-field',
                if: 'nata($exists(faktura.numerKsef))',
              },
            },
            typDokumentu: {
              label: 'Typ dokumentu',
              layout: {
                component: 'dictionary',
                props: {
                  clearable: true,
                },
              },
              source: {
                url: '/api/dictionaries?feature-id=typy-dokumentow&lm=nazwa&vm=kod',
                title: 'label',
                value: 'id',
                lazy: true,
                singleOptionAutoSelect: true,
                returnObject: true,
              },
              validations: [
                {
                  name: 'conditional-required',
                  rule: "rejestracja.decyzjaRejestracja.value='zatwierdz'",
                  message: null,
                },
              ],
            },
            dataWystawienia: {
              label: 'Data wystawienia',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                component: 'date-picker',
              },
              formatInModel: 'YYYY-MM-DD',
            },
            dataPlatnosci: {
              label: 'Data płatności',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                component: 'date-picker',
              },
              formatInModel: 'YYYY-MM-DD',
            },
            dataWplywu: {
              label: 'Data wpływu',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                component: 'date-picker',
              },
              formatInModel: 'YYYY-MM-DD',
              validations: [
                {
                  name: 'conditional-required',
                  rule: "rejestracja.decyzjaRejestracja.value='zatwierdz'",
                  message: null,
                },
              ],
            },
            dataWpisuDoDa: {
              label: 'Data wpisu do DA',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                component: 'date-picker',
              },
              formatInModel: 'YYYY-MM-DD',
              defaultValue: null,
            },
            dataSprzedazy: {
              label: 'Data sprzedaży',
              layout: {
                component: 'date-picker',
              },
              formatInModel: 'YYYY-MM-DD',
              validations: [
                {
                  name: 'conditional-required',
                  rule: "rejestracja.decyzjaRejestracja.value='zatwierdz'",
                  message: null,
                },
              ],
            },
            waluta: {
              label: 'Waluta',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                component: 'dictionary',
              },
              source: {
                url: '/api/dictionaries?feature-id=waluty&lm=nazwa&vm=kod',
                title: 'label',
                value: 'id',
                lazy: true,
                singleOptionAutoSelect: true,
                returnObject: true,
              },
              validations: [
                {
                  name: 'conditional-required',
                  rule: "rejestracja.decyzjaRejestracja.value='zatwierdz'",
                  message: null,
                },
              ],
            },
            kurs: {
              label: 'Kurs',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                component: 'number-field',
                if: "nata(faktura.waluta.id!='PLN')",
                hide: false,
              },
              type: 'float',
              precision: '4',
              defaultValue: 1,
              precisionMin: '4',
            },
          },
        },
        'divider-2': {
          layout: {
            component: 'divider',
          },
          thickness: 2,
          color: '#263238',
          opacity: '100',
          label: 'divider-1520_cloned',
        },
        htmlPodsumowanie: {
          content: 'Podsumowanie - kwoty otrzymane',
          layout: {
            component: 'static-content',
            tag: 'h3',
          },
        },
        podsumowanie: {
          properties: {
            lPozycji: {
              label: 'Liczba pozycji',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 2,
                  xl: 2,
                  xxl: 2,
                },
                fillRow: true,
                component: 'number-field',
                props: {
                  readonly:
                    'nata($not(tech.czyPominacOcr=true or rejestracja.decyzjaOcr="rejestruj"))',
                },
              },
              type: 'int',
              expression: '',
              validations: [
                {
                  name: 'conditional-required',
                  rule: 'tech.czyPominacOcr',
                  message: null,
                },
              ],
            },
            kwotaNetto: {
              label: 'Kwota netto',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                },
                component: 'number-field',
                props: {
                  readonly: 'nata(faktura.numerKsef!=null)',
                },
              },
              type: 'float',
              precision: '2',
              precisionMin: '2',
              validations: [],
            },
            kwotaVat: {
              label: 'Kwota VAT',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                },
                component: 'number-field',
                props: {
                  readonly: 'nata(faktura.numerKsef!=null)',
                },
              },
              type: 'float',
              precision: '2',
              precisionMin: '2',
              validations: [],
            },
            kwotaBrutto: {
              label: 'Kwota brutto',
              layout: {
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                },
                component: 'number-field',
                props: {
                  readonly: 'nata(faktura.numerKsef!=null)',
                },
              },
              type: 'float',
              precision: '2',
              precisionMin: '2',
              validations: [],
            },
          },
          required: ['kwotaNetto', 'kwotaVat', 'kwotaBrutto'],
        },
        'divider-3': {
          layout: {
            component: 'divider',
          },
          thickness: 2,
          color: '#263238',
          opacity: '100',
          label: 'divider-2530_cloned',
        },
        htmladnotacje: {
          content: 'Adnotacje',
          layout: {
            component: 'static-content',
            tag: 'h3',
            if: 'nata($exists(faktura.numerKsef))',
          },
          label: 'htmlrejestracja688_cloned',
        },
        adnotacje: {
          content: '{adnotacje:Brak danych}',
          layout: {
            component: 'static-content',
            tag: 'p',
            if: 'nata($exists(faktura.numerKsef))',
          },
        },
        htmlrejestracja: {
          content: 'Rejestracja',
          layout: {
            component: 'static-content',
            tag: 'h3',
          },
          label: 'htmlPodsumowanie499_cloned',
        },
        rejestracja: {
          properties: {
            decyzjaRejestracja: {
              label: 'Decyzja',
              layout: {
                component: 'select',
                cols: {
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                fillRow: true,
              },
              source: {
                items: [
                  {
                    value: 'zatwierdz',
                    title: 'Zatwierdź',
                  },
                  {
                    value: 'anuluj',
                    title: 'Anuluj',
                  },
                  {
                    value: 'dodajDostawce',
                    title: 'Dodaj dostawcę',
                  },
                ],
                returnObject: true,
              },
              defaultValue: {
                value: 'zatwierdz',
                title: 'Zatwierdź',
              },
            },
            osobyWybraneDoOpisu: {
              label: 'Osoba opisująca merytorycznie',
              layout: {
                cols: {
                  xs: 6,
                  sm: 6,
                  md: 6,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                component: 'user-input',
                props: {
                  multiple: true,
                  maxSelection: 1,
                },
                if: '',
              },
              filter: {
                group: null,
              },
              source: {
                url: '/api/dictionaries?feature-id=uzytkownicy-przypisani-do-dostawcow&vm=uzytkownikId&customAttributes=username%2C%7BuzytkownikNazwa%7D%2CfirstName%2C%7BuzytkownikImie%7D%2ClastName%2C%7BuzytkownikNazwisko%7D%2Cemail%2C%7BuzytkownikEmail%7D%2Clabels%2C%7Betykiety%7D&filter=dostawcaId%3D%3D{dostawca.id}%3Brola%3D%3D%22opisujacy%22&sort=etykiety%2Casc&sort=uzytkownikNazwa%2Casc',
              },
              validations: [
                {
                  name: 'conditional-required',
                  rule: "rejestracja.decyzjaRejestracja.value='zatwierdz'",
                },
              ],
            },
            zapiszUstawienia: {
              label: '',
              layout: {
                cols: {
                  xs: 6,
                  sm: 6,
                  md: 6,
                  lg: 6,
                  xl: 6,
                  xxl: 6,
                },
                component: 'checkbox',
                props: {
                  multiple: false,
                },
              },
              source: {
                items: [
                  {
                    value: true,
                    title: 'Zapisz ustawienia osób do rejestru dostawców',
                  },
                ],
              },
            },
          },
          required: ['decyzjaRejestracja'],
        },
      },
    },
  },
};
