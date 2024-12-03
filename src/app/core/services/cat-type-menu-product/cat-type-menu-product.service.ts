import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseCatModel } from '../../models/base-cat.model';
import { ResponseListModel } from '../../models/response/response-list.model';


@Injectable({
  providedIn: 'root'
})
export class CatTypeMenuProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getByFilter(): Observable<ResponseListModel<BaseCatModel>> { 
    const endpoint = `${environment.urlApiBackend}cat-type-menu-product`;
    return this.httpClient.get<ResponseListModel<BaseCatModel>>(endpoint);
  }

}
