import { BaseCatModel } from "./base-cat.model";
import { OwnerModel } from "./owner.model";

export interface BusinessModel {
  id?: Number;
  name?: String;
  description?: String;
  typeBusiness?: BaseCatModel;
  idOwner?: OwnerModel;
}