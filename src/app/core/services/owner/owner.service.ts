import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnerModel } from '../../models/owner.model';
import { environment } from 'src/environments/environment';
import { ResponseObjectModel } from '../../models/response/response.-object.model';
import { ResponseListModel } from '../../models/response/response-list.model';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta un propietario
   * @param id 
   * @returns 
   */
   get(id: number): Observable<ResponseObjectModel<OwnerModel>> {
    const endpoint = `${environment.urlApiBackend}owners/${id}`;
    return this.httpClient.get<ResponseObjectModel<OwnerModel>>(endpoint);
  }


  /**
   * Consume api, consulta propietarios con filtros
   * @param name  
   * @returns 
   */
   getByFilter(name: string | undefined): Observable<ResponseListModel<OwnerModel>> {
    const endpoint = `${environment.urlApiBackend}owners`;

    let httpParams = new HttpParams();

    if (name) {
      httpParams = httpParams.append('name', name);
    }

    return this.httpClient.get<ResponseListModel<OwnerModel>>(endpoint, {params: httpParams});
  }

  /**
   * Consume api para crear un owner en la plataforma
   * @param owner 
   * @returns 
   */
  create(owner: OwnerModel): Observable<ResponseObjectModel<OwnerModel>> {
    const endpoint = `${environment.urlApiBackend}owners`;
    return this.httpClient.post<ResponseObjectModel<OwnerModel>>(endpoint, owner);
  }

  /**
   * Consume api para actualizar un propietario
   * @param id 
   * @param owner 
   * @returns 
   */
  update(id: number, owner: OwnerModel): Observable<ResponseObjectModel<OwnerModel>> {
    const endpoint = `${environment.urlApiBackend}owners/${id}`;
    return this.httpClient.put<ResponseObjectModel<OwnerModel>>(endpoint, owner);
  }

  /**
   * Consume api para eliminar un propietario
   * @param id 
   * @returns 
   */
  delete(id: Number): Observable<any> {
    const endpoint = `${environment.urlApiBackend}owners/${id}`;
    return this.httpClient.delete(endpoint);
  }

}
