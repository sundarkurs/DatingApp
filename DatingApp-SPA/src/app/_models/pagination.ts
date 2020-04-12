export class Pagination {
    public currentPage: number;
    public itemsPerPage: number;
    public totalItems: number;
    public totalPages: number;

    constructor(){
      this.currentPage = 1;
      this.itemsPerPage = 5;
    }
  }

