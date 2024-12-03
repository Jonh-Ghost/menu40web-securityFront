import { BaseCatModel } from "./base-cat.model";
import { BusinessModel } from "./business.model";

export interface LandingPageModel{

	id?: Number;
    name?: String;
	typeBusiness?: BusinessModel;
	baseCat?: BaseCatModel;
    
}