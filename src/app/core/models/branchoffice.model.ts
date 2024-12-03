import { BusinessModel } from "./business.model";

export interface BranchofficeModel{
    id?: number,
    business?: BusinessModel,
    name: string,
    nameManager: string,
    address: string,
    phone: number,
    email: string,
    active: number,
    publicPath: string,
    urlQr: string,
    urlActive: string
}