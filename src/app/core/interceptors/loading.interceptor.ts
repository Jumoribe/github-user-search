import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{

  constructor(
    private _loadingService: LoadingService
  ){}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap((result) => {
        if (result instanceof HttpResponse){
          this._loadingService.removeRequestUrlLoading(request.url);
        } else {
          this._loadingService.addRequestUrlLoading(request.url);
        }
      }),
      catchError((error: any) => {
        this._loadingService.removeRequestUrlLoading(request.url)
        return throwError(error);
      })
    );
  }

}
