export type VueDragable<T> = {
  added?: ElementAadded<T>
  removed?: ElementRemoved<T>
  moved?: ElementMoved<T>
}

export type ElementAadded<T> = {
  newIndex: number
  element: T
}
export type ElementRemoved<T> = {
  oldIndex: number
  element: T
}
export type ElementMoved<T> = {
  newIndex: number
  oldIndex: number
  element: T
}
