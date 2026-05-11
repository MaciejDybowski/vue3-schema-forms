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

export const TableOne: Story = {
  args: {
    formModel: {},
    schema: {
      "type": "object",
      "properties": {
        "grupaUprawyRokPoprzedni": {
          "layout": {
            "component": "fields-group",
            "schema": {
              "type": "object",
              "properties": {
                "duplicated-section-facc8401-1": {
                  "layout": {
                    "component": "duplicated-section",
                    "schema": {
                      "type": "object",
                      "properties": {
                        "uprawyRokPoprzedni": {
                          "layout": {
                            "component": "table-internal"
                          },
                          "source": {
                            "headers": [
                              {
                                "title": "Grupa odmian",
                                "type": "COLLECTION",
                                "editable": [
                                  {
                                    "label": "Grupa odmian",
                                    "key": "grupaOdmian",
                                    "valueMapping": "grupaOdmian:source:label:id:true",
                                    "type": "SELECT",
                                    "source": [
                                      {
                                        "id": "1",
                                        "label": "I"
                                      },
                                      {
                                        "id": "2",
                                        "label": "II"
                                      },
                                      {
                                        "id": "3",
                                        "label": "III"
                                      },
                                      {
                                        "id": "4",
                                        "label": "IV"
                                      },
                                      {
                                        "id": "5",
                                        "label": "V"
                                      }
                                    ]
                                  }
                                ],
                                "color": "",
                                "key": "grupaOdmian-collection",
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "150px",
                                  "width": "150px",
                                  "maxWidth": "150px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                }
                              },
                              {
                                "title": "Rok zbioru",
                                "type": "COLLECTION",
                                "editable": [
                                  {
                                    "key": "rokZbioru",
                                    "label": "Rok zbioru",
                                    "valueMapping": "rokZbioru",
                                    "type": "YEAR"
                                  }
                                ],
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "250px",
                                  "width": "250px",
                                  "maxWidth": "250px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                },
                                "key": "rokZbioru-collection",
                                "valueMapping": ""
                              },
                              {
                                "title": "Województwo",
                                "type": "COLLECTION",
                                "key": "wojewodztwo-collection",
                                "editable": [
                                  {
                                    "label": "Województwo",
                                    "key": "wojewodztwo",
                                    "valueMapping": "wojewodztwo:/api/dictionaries?feature-id=wojewodztwa&lm=nazwa&vm=symbol:label:id:true",
                                    "type": "DICTIONARY",
                                    "onChange": {
                                      "mode": "change-model",
                                      "variables": [
                                        {
                                          "path": "powiat",
                                          "value": null
                                        },
                                        {
                                          "path": "gmina",
                                          "value": null
                                        },
                                        {
                                          "path": "obrebEwidencyjny",
                                          "value": null
                                        }
                                      ]
                                    }
                                  }
                                ],
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "300px",
                                  "width": "300px",
                                  "maxWidth": "300px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                }
                              },
                              {
                                "title": "Powiat",
                                "type": "COLLECTION",
                                "key": "powiat-collection",
                                "editable": [
                                  {
                                    "key": "powiat",
                                    "label": "Powiat",
                                    "valueMapping": "powiat:/api/dictionaries?feature-id=powiaty&lm=nazwa&vm=symbol&filter=symbol%3D%3D{uprawyRokPoprzedni[].wojewodztwo.id}*:label:id:true",
                                    "type": "DICTIONARY",
                                    "onChange": {
                                      "mode": "change-model",
                                      "variables": [
                                        {
                                          "path": "gmina",
                                          "value": null
                                        },
                                        {
                                          "path": "obrebEwidencyjny",
                                          "value": null
                                        }
                                      ]
                                    }
                                  }
                                ],
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "250px",
                                  "width": "250px",
                                  "maxWidth": "250px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                }
                              },
                              {
                                "title": "Gmina",
                                "type": "COLLECTION",
                                "key": "gmina-collection",
                                "editable": [
                                  {
                                    "label": "Gmina",
                                    "key": "gmina",
                                    "valueMapping": "gmina:/api/dictionaries?feature-id=gminy&lm=nazwa&vm=symbol&customAttributes=rodzajNazwa,%7BrodzajNazwa%7D&filter=symbol%3D%3D{uprawyRokPoprzedni[].powiat.id}*:label:id:true:rodzajNazwa",
                                    "type": "DICTIONARY",
                                    "onChange": {
                                      "mode": "change-model",
                                      "variables": [
                                        {
                                          "path": "obrebEwidencyjny",
                                          "value": null
                                        }
                                      ]
                                    }
                                  }
                                ],
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "250px",
                                  "width": "250px",
                                  "maxWidth": "250px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                }
                              },
                              {
                                "title": "Obręb ewidencyjny",
                                "type": "COLLECTION",
                                "editable": [
                                  {
                                    "label": "Obręb ewidencyjny",
                                    "key": "obrebEwidencyjny",
                                    "valueMapping": "obrebEwidencyjny:/api/dictionaries?feature-id=miejscowosci&lm=nazwa&vm=symbol&filter=gminaPelnySymbol%3D%3D{uprawyRokPoprzedni[].gmina.id}*:label:id:true",
                                    "type": "DICTIONARY",
                                    "onChange": {
                                      "mode": "change-model"
                                    }
                                  }
                                ],
                                "key": "obrebEwidencyjny-collection",
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "250px",
                                  "width": "250px",
                                  "maxWidth": "250px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                }
                              },
                              {
                                "title": "Nr działki ewiden.",
                                "type": "COLLECTION",
                                "editable": [
                                  {
                                    "key": "numerDzialki",
                                    "valueMapping": "numerDzialki",
                                    "type": "TEXT"
                                  }
                                ],
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "150px",
                                  "width": "150px",
                                  "maxWidth": "250px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                },
                                "key": "numerDzialki-collection"
                              },
                              {
                                "title": "Identyfikator działki ewiden.",
                                "type": "COLLECTION",
                                "editable": [
                                  {
                                    "key": "identyfikatorDzialki",
                                    "valueMapping": "identyfikatorDzialki",
                                    "type": "TEXT"
                                  }
                                ],
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "150px",
                                  "width": "150px",
                                  "maxWidth": "250px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                },
                                "key": "identyfikatorDzialki-collection"
                              },
                              {
                                "title": "Pow. uprawy na działce ewiden (ha)",
                                "type": "COLLECTION",
                                "editable": [
                                  {
                                    "type": "NUMBER",
                                    "title": "Pow. uprawy na działce ewiden (ha)",
                                    "key": "powierzchniaUprawy",
                                    "valueMapping": "powierzchniaUprawy:0:NUMBER:4"
                                  }
                                ],
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "250px",
                                  "width": "250px",
                                  "maxWidth": "250px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                },
                                "key": "powierzchniaUprawy-collection"
                              },
                              {
                                "title": "Uwagi",
                                "type": "COLLECTION",
                                "editable": [
                                  {
                                    "key": "uwagi",
                                    "valueMapping": "uwagi",
                                    "type": "TEXT"
                                  }
                                ],
                                "properties": {
                                  "sortable": false,
                                  "minWidth": "150px",
                                  "width": "250px",
                                  "maxWidth": "250px",
                                  "cellProps": {
                                    "style": "padding-top: 8px; padding-bottom: 8px"
                                  }
                                },
                                "key": "uwagi-collection"
                              },
                              {
                                "title": "Akcje",
                                "key": "actions",
                                "actions": [
                                  {
                                    "title": "Duplikuj",
                                    "icon": "mdi-content-copy",
                                    "mode": "internal",
                                    "config": {
                                      "code": "duplicate"
                                    }
                                  },
                                  {
                                    "title": "Usuń",
                                    "icon": "mdi-delete-outline",
                                    "mode": "internal",
                                    "config": {
                                      "code": "delete"
                                    }
                                  }
                                ]
                              }
                            ],
                            "buttons": [
                              {
                                "label": "Dodaj miejsce uprawy",
                                "btnProps": {
                                  "color": "primary",
                                  "rounded": true
                                },
                                "mode": "internal",
                                "config": {
                                  "code": "add"
                                }
                              }
                            ]
                          },
                          "actions": {},
                          "onChange": [
                            {
                              "type": "onChange",
                              "mode": "change-model",
                              "variables": [
                                {
                                  "path": "tech.wymagajSprawdzeniaFormularza",
                                  "value": true,
                                  "if": "selectTypDecyzji.value!='odmowa'"
                                }
                              ]
                            }
                          ]
                        }
                      }
                    },
                    "options": {
                      "addBtnText": "Add element",
                      "showDivider": false,
                      "ordinalNumberInModel": false,
                      "showFirstInitRow": true
                    }
                  },
                  "editable": true,
                  "showElements": true,
                  "onChange": []
                }
              }
            },
            "hide": "nata(zakladkiInformacja!='uprawyRokPoprzedni')",
            "options": {
              "showDivider": false,
              "addBtnText": "Add"
            },
            "if": ""
          }
        },
        "grupaUmowyRokBiezacy": {
          "layout": {
            "component": "fields-group",
            "schema": {
              "type": "object",
              "properties": {
                "umowyRokBiezacy": {
                  "layout": {
                    "component": "table-internal"
                  },
                  "source": {
                    "data": "",
                    "headers": [
                      {
                        "title": "Nabywca surowca",
                        "key": "nabywcaSurowca-collection",
                        "type": "COLLECTION",
                        "editable": [
                          {
                            "label": "Nabywca surowca",
                            "key": "nabywcaSurowca",
                            "valueMapping": "nabywcaSurowca:/api/dictionaries?feature-id=rejestr-nabywcy-tytoniu&lm=nazwa&vm=dataId&customAttributes=adres,%7Badres%7D,nip,%7Bnip%7D,regon,%7Bregon%7D&filter=aktywny%3D%3Dtrue:label:id:true:adres:nip:regon",
                            "type": "DICTIONARY"
                          }
                        ],
                        "properties": {
                          "sortable": false,
                          "minWidth": "300px",
                          "width": "300px",
                          "maxWidth": "300px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        }
                      },
                      {
                        "title": "Nazwa nabywcy",
                        "key": "nazwaNabywcy",
                        "valueMapping": "{nabywcaSurowca.label:-}",
                        "type": "TEXT",
                        "properties": {
                          "sortable": false,
                          "minWidth": "300px",
                          "width": "300px",
                          "maxWidth": "300px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        }
                      },
                      {
                        "title": "Adres nabywcy",
                        "type": "TEXT",
                        "key": "adresNabywcy",
                        "valueMapping": "{nabywcaSurowca.adres:-}",
                        "properties": {
                          "sortable": false,
                          "minWidth": "300px",
                          "width": "300px",
                          "maxWidth": "300px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        }
                      },
                      {
                        "title": "NIP nabywcy",
                        "key": "nipNabywcy",
                        "valueMapping": "{nabywcaSurowca.nip:-}",
                        "type": "TEXT"
                      },
                      {
                        "title": "REGON nabywcy",
                        "key": "regonNabywcy",
                        "valueMapping": "{nabywcaSurowca.regon:-}",
                        "type": "TEXT"
                      },
                      {
                        "title": "Nr umowy",
                        "key": "numerUmowy-collection",
                        "valueMapping": "",
                        "type": "COLLECTION",
                        "editable": [
                          {
                            "key": "numerUmowy",
                            "label": "Numer umowy",
                            "valueMapping": "numerUmowy",
                            "type": "TEXT"
                          }
                        ],
                        "properties": {
                          "sortable": false,
                          "minWidth": "250px",
                          "width": "250px",
                          "maxWidth": "250px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        }
                      },
                      {
                        "title": "Data zawarcia umowy",
                        "key": "dataZawarciaUmowy-collection",
                        "type": "COLLECTION",
                        "editable": [
                          {
                            "key": "dataZawarciaUmowy",
                            "valueMapping": "dataZawarciaUmowy",
                            "type": "DATE"
                          }
                        ],
                        "properties": {
                          "sortable": false,
                          "minWidth": "250px",
                          "width": "250px",
                          "maxWidth": "250px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        }
                      },
                      {
                        "title": "Grupa odmian",
                        "key": "grupaOdmian-collection",
                        "type": "COLLECTION",
                        "editable": [
                          {
                            "label": "Grupa odmian",
                            "key": "grupaOdmian",
                            "valueMapping": "grupaOdmian:source:label:id:true",
                            "type": "SELECT",
                            "source": [
                              {
                                "id": "1",
                                "label": "I"
                              },
                              {
                                "id": "2",
                                "label": "II"
                              },
                              {
                                "id": "3",
                                "label": "III"
                              },
                              {
                                "id": "4",
                                "label": "IV"
                              },
                              {
                                "id": "5",
                                "label": "V"
                              }
                            ]
                          }
                        ],
                        "properties": {
                          "sortable": false,
                          "minWidth": "250px",
                          "width": "250px",
                          "maxWidth": "250px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        }
                      },
                      {
                        "title": "Rok zbioru",
                        "key": "rokZbioru",
                        "type": "COLLECTION",
                        "editable": [
                          {
                            "key": "rokZbioru",
                            "label": "Rok zbioru",
                            "valueMapping": "rokZbioru",
                            "type": "NUMBER"
                          }
                        ],
                        "properties": {
                          "sortable": false,
                          "minWidth": "250px",
                          "width": "250px",
                          "maxWidth": "250px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        }
                      },
                      {
                        "title": "Masa surowca (kg)",
                        "properties": {
                          "sortable": false,
                          "minWidth": "250px",
                          "width": "250px",
                          "maxWidth": "250px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        },
                        "key": "masaSurowca-collection",
                        "type": "COLLECTION",
                        "editable": [
                          {
                            "key": "masaSurowca",
                            "label": "Masa surowca (kg)",
                            "valueMapping": "masaSurowca:0:NUMBER:3",
                            "type": "NUMBER"
                          }
                        ]
                      },
                      {
                        "title": "Uwagi",
                        "properties": {
                          "sortable": false,
                          "minWidth": "250px",
                          "width": "250px",
                          "maxWidth": "250px",
                          "cellProps": {
                            "style": "padding-top: 8px; padding-bottom: 8px"
                          }
                        },
                        "key": "uwagi-collection",
                        "type": "COLLECTION",
                        "editable": [
                          {
                            "key": "uwagi",
                            "label": "Uwagi",
                            "valueMapping": "uwagi",
                            "type": "TEXT"
                          }
                        ]
                      },
                      {
                        "title": "Akcje",
                        "key": "actions",
                        "actions": [
                          {
                            "title": "Duplikuj",
                            "icon": "mdi-content-copy",
                            "mode": "internal",
                            "config": {
                              "code": "duplicate"
                            }
                          },
                          {
                            "title": "Usuń",
                            "icon": "mdi-delete-outline",
                            "mode": "internal",
                            "config": {
                              "code": "delete"
                            }
                          }
                        ]
                      }
                    ],
                    "buttons": [
                      {
                        "label": "Dodaj umowę",
                        "btnProps": {
                          "color": "primary",
                          "rounded": true
                        },
                        "mode": "internal",
                        "config": {
                          "code": "add"
                        }
                      }
                    ]
                  },
                  "actions": {},
                  "onChange": [
                    {
                      "type": "onChange",
                      "mode": "change-model",
                      "variables": [
                        {
                          "path": "tech.wymagajSprawdzeniaFormularza",
                          "value": true,
                          "if": "selectTypDecyzji.value!='odmowa'"
                        }
                      ]
                    }
                  ],
                  "label": "uprawyRokPoprzedni475Clone"
                }
              }
            },
            "options": {
              "showDivider": false,
              "addBtnText": "Add"
            },
            "if": "",
            "hide": "nata(zakladkiInformacja!='umowyRokBiezacy')"
          }
        }
      }
    }
  },
};
