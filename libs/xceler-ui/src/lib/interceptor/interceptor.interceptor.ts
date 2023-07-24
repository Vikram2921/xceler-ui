import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url);
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + accessToken,
        })
      });
    }
    if(window.location.origin.includes('localhost')) {
      request = this.reRoute(request);
    }
    return next.handle(request);
  }

  private reRoute(request:HttpRequest<any>):HttpRequest<any> {
    let route = request.url;
    if(route.includes("//localhost/")) {
      let json:{[key:string]:any} = {
        'ctrm-api':'http://localhost:8080',
        'api-iam':'http://localhost:8082',
        'api-bm':'http://localhost:8083',
        'api-inventory':'http://localhost:8086',
        'integration-service':'http://localhost:8084',
        'approval-workflow':'http://localhost:8085'
      }
      let url = route.replace("http://localhost/","");
      let split = url.split("/");
      if(Object.keys(json).includes(split[1])) {
        route = json[split[1]]+url;
      } else {
        route = "http://localhost:8080"+url;
      }
    }
    return request.clone({'url': route})
  }
}
