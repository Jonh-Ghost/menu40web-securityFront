import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessModel } from '../../models/business.model';
import { BusinessFilter } from '../../models/filter/business.filter';
import { environment } from 'src/environments/environment';
import { ResponseObjectModel } from '../../models/response/response.-object.model';
import { ResponseListModel } from '../../models/response/response-list.model';



@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta un usuario
   * @param id 
   * @returns 
   */
   get(id: number): Observable<ResponseObjectModel<BusinessModel>> {
    const endpoint = `${environment.urlApiBackend}business/${id}`;
    return this.httpClient.get<ResponseObjectModel<BusinessModel>>(endpoint);
  }


  /**
   * Consume api, consulta negocios con filtros
   * @param name  
   * @returns 
   */
   getByFilter(businessModel?: BusinessFilter): Observable<ResponseListModel<BusinessModel>> {
    const endpoint = `${environment.urlApiBackend}business`;

    let httpParams = new HttpParams();

    if (businessModel?.page) {
      httpParams = httpParams.set('page', `${businessModel?.page}`);
    }

    if (businessModel?.size) {
      httpParams = httpParams.set('size', `${businessModel?.size}`);
    }
    
    return this.httpClient.get<ResponseListModel<BusinessModel>>(endpoint, {params: httpParams});
  }

  /**
   * Consume api para crear un negocio en la plataforma
   * @param business 
   * @returns 
   */
  create(business: BusinessModel): Observable<ResponseObjectModel<BusinessModel>> {
    const endpoint = `${environment.urlApiBackend}business`;
    return this.httpClient.post<ResponseObjectModel<BusinessModel>>(endpoint, business);
  }

  /**
   * Consume api para actualizar un negocio
   * @param id 
   * @param business 
   * @returns 
   */
  update(id: number, business: BusinessModel): Observable<ResponseObjectModel<BusinessModel>> {
    const endpoint = `${environment.urlApiBackend}business/${id}`;
    return this.httpClient.put<ResponseObjectModel<BusinessModel>>(endpoint, business);
  }

  /**
   * Consume api para eliminar un usuario
   * @param id 
   * @returns 
   */
  delete(id: Number): Observable<any> {
    const endpoint = `${environment.urlApiBackend}business/${id}`;
    return this.httpClient.delete(endpoint);
  }

}
