import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { environment } from 'src/environments/environment';
import { ProductFilter } from '../../models/filter/product.filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClient: HttpClient ) { }

  /**
   * Consulta un usuario
   * @param id
   * @returns
   */
  get(id: number): Observable<any>{
    const endpoint=`${environment.urlApiBackend}product/${id}`;
    return this.httpClient.get(endpoint);
  }
  getByFilter(productFilter: ProductFilter): Observable<any> {
    const endpoint = `${environment.urlApiBackend}product`;

    let httpParams = new HttpParams();

    if (productFilter?.name) {
      httpParams = httpParams.append('name', productFilter?.name);
    }

    if (productFilter?.speciality) {
      httpParams = httpParams.append('speciality', productFilter?.speciality);
    }

    if (productFilter?.price) {
      httpParams = httpParams.append('price', productFilter?.price);
    }

    if (productFilter?.status) {
      httpParams = httpParams.append('status', productFilter?.status);
    }

    if (productFilter?.typeProduct) {
      httpParams = httpParams.append('typeProduct', productFilter?.typeProduct);
    }

    if (productFilter?.idBusiness) {

      httpParams = httpParams.append('idBusiness', productFilter.idBusiness);

    }

    return this.httpClient.get(endpoint, {params: httpParams});
  }
  /**
   * Consume api para crear un usuario en la plataforma
   * @param product
   * @returns
   */
  create(product: ProductModel): Observable<any> {
    const endpoint = `${environment.urlApiBackend}product`;
    return this.httpClient.post(endpoint, product);
  }
  /**
   * Consume api para actualizar un usuario
   * @param id
   * @param product
   * @returns
   */
  update(id: number, product: ProductModel): Observable<any> {
    const endpoint = `${environment.urlApiBackend}product/${id}`;
    return this.httpClient.put(endpoint, product);
  }

  /**
   * Consume api para eliminar un usuario
   * @param id
   * @returns
   */
  delete(id: number): Observable<any> {
    const endpoint = `${environment.urlApiBackend}product/${id}`;
    return this.httpClient.delete(endpoint);
  }
}
