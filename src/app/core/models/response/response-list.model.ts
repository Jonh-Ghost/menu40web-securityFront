import { MetadataModel } from "./response.-object.model";

export interface ResponseListModel<T> {
  code: number;
  message: string;
  data: Array<T>;
  metadata: MetadataModel;
}