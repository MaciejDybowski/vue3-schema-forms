export interface EventHandlerDefinition {
  mode:  "action" | "request"
  url: string,
  method: "GET" | "POST" | "DELETE",
  body?: Record<string, string|boolean|object|number>
}