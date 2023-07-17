import { Injectable } from '@angular/core';

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
          fetch(url,{method: 'GET',headers: this.getHeaders()})
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
          method: 'DELETE',headers: this.getHeaders()
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
}
