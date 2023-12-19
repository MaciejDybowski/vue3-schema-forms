export class Pagination {
  _state: PaginationState;
  constructor(itemPerPage = 20) {
    this._state = {
      page: 0,
      totalElements: 0,
      itemsPerPage: itemPerPage,
    };
  }
  nextPage() {
    if (this.isNextPage()) this._state.page++;
  }
  isNextPage() {
    return this._state.page + 1 < Math.ceil(this._state.totalElements / this._state.itemsPerPage);
  }
  setTotalElements(val: number) {
    this._state.totalElements = val;
  }
  resetPage() {
    this._state.page = 0;
  }
  getPage() {
    return this._state.page;
  }
  getItemsPerPage() {
    return this._state.itemsPerPage;
  }
  totalPages() {
    return Math.ceil(this._state.totalElements / this._state.itemsPerPage);
  }
  previousPage() {
    if (this.isPreviousPage()) this._state.page--;
  }
  isPreviousPage() {
    return this._state.page > 0;
  }
}

type PaginationState = {
  page: number;
  totalElements: number;
  itemsPerPage: number;
};
