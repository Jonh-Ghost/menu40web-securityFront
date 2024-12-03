import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GuardService } from '../../components/_auth/guardService.service';
import { AdminModel } from '../../models/admin.model';
import { OwnerModel } from '../../models/owner.model';
import { ResponseObjectModel } from '../../models/response/response.-object.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  subject$ = new BehaviorSubject<boolean>(true);

  constructor(
    private httpClient: HttpClient
  ) { }

  getSesion(data: any): Observable<boolean> {
    console.log(`Datos en el servicio ${JSON.stringify(data)}`);
    return this.subject$;
  }

  loginOwner(owner: OwnerModel): Observable<ResponseObjectModel<OwnerModel>> {
    console.log(`Datos en el servicio ${JSON.stringify(owner)}`);
    const endpoint = `${environment.urlApiBackend}sesion/owner`;
    return this.httpClient.post<ResponseObjectModel<OwnerModel>>(endpoint, owner);
  }

  loginAdmin(admin: AdminModel): Observable<ResponseObjectModel<AdminModel>> {
    console.log(`Datos en el servicio ${JSON.stringify(admin)}`);
    const endpoint = `${environment.urlApiBackend}sesion/admin`;
    return this.httpClient.post<ResponseObjectModel<AdminModel>>(endpoint, admin);
  }

}
