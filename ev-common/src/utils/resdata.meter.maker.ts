export type Data = {
  page: number;
  size: number;
  totalCount: number;
  lastPageNum: number;
  sortElement: string;
  sortType: string;
};
export type ResDataMeta = {
  paging: null | {
    page: number;
    size: number;
    total_count: number;
    last_page_num: number;
    sort_element: string;
    sort_type: string;
  };
  search: null | Data;
};
export class ResDataMetaMaker {
  resDataMeta: ResDataMeta = {
    paging: null,
    search: null,
  };
  constructor() {}
  setPagingData(data: Data) {
    this.resDataMeta.paging = {
      // pageNum: data.pageNum,
      // itemsPerPage: data.itemsPerPage,
      // totalCount: data.totalCount,
      // lastPageNum: Math.floor(data.lastPageNum),
      // sortElement: data.sortElement,
      // sortType: data.sortType,
      page: data.page,
      size: data.size,
      total_count: data.totalCount,
      last_page_num: Math.floor(data.lastPageNum),
      sort_element: data.sortElement,
      sort_type: data.sortType,
    };
  }
  setSearchData(data: Data) {
    this.resDataMeta.search = data;
  }

  getMeta() {
    return this.resDataMeta;
  }

  getMetaPaging() {
    return this.resDataMeta.paging;
  }

  getMetaSearch() {
    return this.resDataMeta.search;
  }
}
