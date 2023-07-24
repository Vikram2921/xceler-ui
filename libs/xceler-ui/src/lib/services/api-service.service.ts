import {Injectable} from '@angular/core';
import {UrlModel} from "../models/screen-model";
import {Resolver} from "../models/resolver";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return headers;
  }

  static get(url: string) {
    return new Promise((resolve, reject) => {
      fetch(this.reRoute(url), {method: 'GET', headers: this.getHeaders()})
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      fetch(this.reRoute(url), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: this.getHeaders()
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static patch(url: string, data: any) {
    return new Promise((resolve, reject) => {
      fetch(this.reRoute(url), {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: this.getHeaders()
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static delete(url: string) {
    return new Promise((resolve, reject) => {
      fetch(this.reRoute(url), {
        method: 'DELETE', headers: this.getHeaders()
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static put(url: string, data: any) {
    return new Promise((resolve, reject) => {
      fetch(this.reRoute(url), {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: this.getHeaders()
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static decideUrlCallItself(urlModel: UrlModel, environment?: { [key: string]: any }, customInputs?: {
    [key: string]: any
  }) {
    let url = Resolver.getModifiedUrl(urlModel.url, environment, customInputs)
    if (urlModel.method.toUpperCase() === 'GET') {
      return ApiService.get(url)
    } else if (urlModel.method.toUpperCase() === 'POST') {
      return ApiService.post(url, urlModel.data)
    } else if (urlModel.method.toUpperCase() === 'PATCH') {
      return ApiService.patch(url, urlModel.data)
    } else if (urlModel.method.toUpperCase() === 'DELETE') {
      return ApiService.delete(url)
    } else if (urlModel.method.toUpperCase() === 'PUT') {
      return ApiService.put(url, urlModel.data)
    } else {
      return ApiService.get(url)
    }
  }

  private static reRoute(route:string):string {
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
    return route;
  }
}
