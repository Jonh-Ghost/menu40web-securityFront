import { BusinessModel } from "./business.model";
import { BaseCatModel } from "./base-cat.model";
import { FileModel } from "./file.model";

export interface MenuModel {
    id?: number;
    files?: Array<FileModel>;
	status?: number;
    idBranchOffice?: BusinessModel;
    typeMenu?: BaseCatModel;
}