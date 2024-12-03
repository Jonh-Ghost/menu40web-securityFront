import {
    HttpErrorResponse,HttpEvent,HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../../services/authService/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService,
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    console.log(req);
    const token = this.tokenService.getToken();
    localStorage.setItem('Token', JSON.stringify(token));
    //console.log(token);
    if (token != null) {
      intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    //console.log(intReq);
    return next.handle(intReq);

  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}];

















//  constructor(private userAuthService: UserAuthService,
//    private router:Router) {}
//
//  intercept(
//    req: HttpRequest<any>,
//    next: HttpHandler
//  ): Observable<HttpEvent<any>> {
//    if (req.headers.get('No-Auth') === 'True') {
//      return next.handle(req.clone());
//    }
//
//    const token = this.userAuthService.getToken();
//
//    req = this.addToken(req, token);
//
//    return next.handle(req).pipe(
//        catchError(
//            (err:HttpErrorResponse) => {
//                console.log(err.status);
//                if(err.status === 401) {
//                    this.router.navigate(['/login']);
//                } else if(err.status === 403) {
//                    this.router.navigate(['/forbidden']);
//                }
//                return throwError("Some thing is wrong");
//            }
//        )
//    );
//  }
//
//
//  private addToken(request:HttpRequest<any>, token:string) {
//      return request.clone(
//          {
//              setHeaders: {
//                  Authorization : `Bearer ${token}`
//              }
//          }
//      );
//  }

