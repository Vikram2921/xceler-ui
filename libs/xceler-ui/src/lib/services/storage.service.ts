import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string) {
    return localStorage.getItem(key);
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static key(index: number) {
    return localStorage.key(index);
  }

  static get isLocalStorageSupported() {
    return !!window.localStorage;
  }

  static get isSessionStorageSupported() {
    return !!window.sessionStorage;
  }

  static get isCookieStorageSupported() {
    return !!window.navigator.cookieEnabled;
  }

  static get isWebStorageSupported() {
    return this.isLocalStorageSupported || this.isSessionStorageSupported;
  }

  static get isStorageSupported() {
    return this.isWebStorageSupported || this.isCookieStorageSupported;
  }

  static get isSupported() {
    return this.isStorageSupported;
  }
}
