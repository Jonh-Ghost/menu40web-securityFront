import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuModel } from '../../models/menu.model';
import { environment } from 'src/environments/environment';
import { MenuFilter } from '../../models/filter/menu.filter';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Consulta menu
   * @param id 
   * @returns 
   */
   get(id: number): Observable<any> {
    const endpoint = `${environment.urlApiBackend}menu/${id}`;
    return this.httpClient.get(endpoint);
  }

  /**
   * Consume api, consulta menu con filtros
   * @param code  
   * @returns 
   */
   getByFilter(menuFilter: MenuFilter): Observable<any> {

    const endpoint = `${environment.urlApiBackend}menu`;
    
    let httpParams = new HttpParams();

    if (menuFilter?.code) {
      httpParams = httpParams.append('code', menuFilter?.code);
    }

    if (menuFilter?.status) {
      httpParams = httpParams.append('status', menuFilter?.status);
    }

    if (menuFilter?.typeMenu) {

      httpParams = httpParams.append('typeMenu', menuFilter?.typeMenu);
      
    }

    if (menuFilter?.idBranchOffice) {

      httpParams = httpParams.append('idBranchOffice', menuFilter?.idBranchOffice);

    }

    return this.httpClient.get(endpoint, {params: httpParams});
  }

  /**
   * Consume api para crear un menu en la plataforma
   * @param menu 
   * @returns 
   */
   create(menu: MenuModel): Observable<any> {
    const endpoint = `${environment.urlApiBackend}menu`;
    return this.httpClient.post(endpoint, menu);
  }

  /**
   * Consume api para actualizar un menú
   * @param id 
   * @param menu 
   * @returns 
   */
   update(id: number, menu: MenuModel): Observable<any> {
    const endpoint = `${environment.urlApiBackend}menu/${id}`;
    return this.httpClient.put(endpoint, menu);
  }

  /**
   * Consume api para eliminar un menu
   * @param id 
   * @returns 
   */
   delete(id: number): Observable<any> {
    const endpoint = `${environment.urlApiBackend}menu/${id}`;
    return this.httpClient.delete(endpoint);
  }
  
}
