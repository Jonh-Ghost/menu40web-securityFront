export interface ResponseObjectModel<T> {
  code: number;
  message: string;
  data: T;
  metadata: MetadataModel
}

export interface MetadataModel {
  pagination: PaginationModel
  sort: SortModel;
}

export interface PaginationModel {
  page: number;
  size: number;
  total: number;
}

export interface SortModel {
  type: string;
  field: string;
}