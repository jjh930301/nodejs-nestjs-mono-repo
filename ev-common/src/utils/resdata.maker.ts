import { ResDataMeta, type Data } from './resdata.meter.maker';
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
