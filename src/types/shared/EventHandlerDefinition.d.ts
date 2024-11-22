export interface EventHandlerDefinition {
  mode:  "action" | "request" | "change-model"
  url: string,
  method: "GET" | "POST" | "DELETE",
  body?: Record<string, string|boolean|object|number>
  params?: Record<string, string|boolean|object|number>
  code?: string
  script?:string
  variables?: Array<EventVariable>
}

export interface EventVariable {
  path: string
  value: string
}