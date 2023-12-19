export interface SliceResponse {
  content: any[];
  numberOfElements: number;
  first: boolean;
  last: boolean;
  number: number;
  size: number;
}

export function mapSliceTotalElements(response: SliceResponse): number {
  if (response.first && !response.last) {
    return response.numberOfElements + 1;
  }

  if (response.first && response.last) {
    return response.numberOfElements;
  }

  if (response.last) {
    return response.number * response.size + response.numberOfElements;
  }

  if (!response.first && !response.last) {
    return response.number * response.size + response.numberOfElements + 1;
  }

  return 0;
}
