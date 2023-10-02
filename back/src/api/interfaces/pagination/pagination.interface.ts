import { Model } from 'sequelize-typescript';

export interface pagination {
  pageNumber: number;
  limit: number;
  offset: number;
}

export type paginationResults<T> = T & {
  totalPages: number;
  prevPageUrl: string;
  nextPageUrl: string;
};

export interface results {
  count: number;
  rows: Model[];
}
