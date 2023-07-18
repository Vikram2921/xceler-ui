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
      fetch(url, {method: 'GET', headers: this.getHeaders()})
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      fetch(url, {
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
      fetch(url, {
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
      fetch(url, {
        method: 'DELETE', headers: this.getHeaders()
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static put(url: string, data: any) {
    return new Promise((resolve, reject) => {
      fetch(url, {
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
}
