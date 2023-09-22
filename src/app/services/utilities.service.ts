import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  setLocalStorage(name: string, value: any) {
    if (this.getLocalStorage(name)) {
      this.removeLocalStorage(name);
    }
    localStorage.setItem(name, value);
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
