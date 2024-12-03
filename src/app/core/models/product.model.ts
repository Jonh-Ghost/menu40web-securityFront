import { FileModel } from "./file.model";
import { BusinessModel } from "./business.model";
import { BaseCatModel } from "./base-cat.model";

export interface ProductModel
{
  id?: number;
  name?: string;
  speciality?: string;
  description?: string;
  price?: number;
  urlImage?: string;
  idBusiness?: BusinessModel;
  status?: number;
  typeProduct?: BaseCatModel;
  files?: Array<FileModel>;
  userCreatedAt?: string;
}

