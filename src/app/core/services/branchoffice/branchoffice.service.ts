import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchofficeModel } from '../../models/branchoffice.model';
import { environment } from 'src/environments/environment';
import { BranchofficeFilter } from '../../models/filter/branchoffice.filter';


@Injectable({
  providedIn: 'root'
})
export class BranchofficeService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta un de sucursal
   * @param id 
   * @returns 
   */
   get(id: number): Observable<any> {
    const endpoint = `${environment.urlApiBackend}branchoffice/${id}`;
    return this.httpClient.get(endpoint);
  }

   getByFilter(branchofficeFilter: BranchofficeFilter ): Observable<any> {
    const endpoint = `${environment.urlApiBackend}branchoffice`;

    let httpParams = new HttpParams();

    if (branchofficeFilter.name) {
      httpParams = httpParams.append('name', branchofficeFilter.name);
    }

    if (branchofficeFilter.nameManager) {
      httpParams = httpParams.append('nameManager', branchofficeFilter.nameManager);
    }

    if (branchofficeFilter.phone) {
      httpParams = httpParams.append('phone', branchofficeFilter.phone);
    }

    if (branchofficeFilter.email) {
      httpParams = httpParams.append('email', branchofficeFilter.email);
    }

    if (branchofficeFilter.active) {
      httpParams = httpParams.append('active', branchofficeFilter.active);
    }

    if (branchofficeFilter.idBusiness) {
      httpParams = httpParams.append('idBusiness', branchofficeFilter.idBusiness);
    }

    return this.httpClient.get(endpoint, {params: httpParams});
  }


  /**
   * Consume api para crear una sucursal en la plataforma
   * @param branchoffice 
   * @returns 
   */
  create(branchoffice: BranchofficeModel): Observable<any> {
    const endpoint = `${environment.urlApiBackend}branchoffice`;
    return this.httpClient.post(endpoint, branchoffice);
  }

  /**
   * Consume api para actualizar una sucursal
   * @param id 
   * @param branchoffice 
   * @returns 
   */
  update(id: number, branchoffice: BranchofficeModel): Observable<any> {
    const endpoint = `${environment.urlApiBackend}branchoffice/${id}`;
    return this.httpClient.put(endpoint, branchoffice);
  }

  /**
   * Consume api para eliminar una sucursal
   * @param id 
   * @returns 
   */
  delete(id: Number): Observable<any> {
    const endpoint = `${environment.urlApiBackend}branchoffice/${id}`;
    return this.httpClient.delete(endpoint);
  }

}