import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  setLocalStorage<T>(key: string, value: T) {
    if (this.getLocalStorage(key)) {
      this.removeLocalStorage(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage(name: string) {
    return localStorage.getItem(name);
  }

  removeLocalStorage(name: string) {
    localStorage.removeItem(name);
  }

  clearAllLocalStorage() {
    localStorage.clear();
  }
}
