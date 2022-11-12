import cloneDeep from "lodash.clonedeep";

export class Store<T> {
  private prevStore: T;
  private store: T;

  constructor(initialState: T) {
    this.prevStore = initialState;
    this.store = initialState;
  }

  getStore(): T {
    return this.store;
  }

  setStore(newState: T): void {
    this.prevStore = cloneDeep(this.store);
    this.store = newState;
  }

  getStoreValue<K extends keyof T>(key: K): T[K] {
    return this.store[key];
  }

  setStoreValue<K extends keyof T>(key: K, value: T[K]): void {
    this.prevStore[key] = cloneDeep(this.store[key]);
    this.store[key] = value;
  }

  getPrevValue<K extends keyof T>(key: K): T[K] {
    return this.store[key];
  }
}
