import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  // isNotNull<T>(value: T): boolean {
  //   return value !== null;
  // }

  // isNotUndefined<T>(value: T): boolean {
  //   return value !== undefined;
  // }

  // isNotNullOrUndefined<T>(value: T): boolean {
  //   return this.isNotUndefined(value) && this.isNotNull(value);
  // }

  // isPopulatedArray<T>(array: T[]): boolean {
  //   return (
  //     this.isNotNullOrUndefined(array) &&
  //     Array.isArray(array) &&
  //     array.length > 0
  //   );
  // }

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
