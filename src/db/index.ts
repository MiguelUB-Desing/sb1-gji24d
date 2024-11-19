import { DB_NAME, DB_VERSION, STORES, schema } from './config';

class Database {
  private db: IDBDatabase | null = null;

  async connect(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Crear stores si no existen
        if (!db.objectStoreNames.contains(STORES.USERS)) {
          db.createObjectStore(STORES.USERS, schema.users);
        }
        if (!db.objectStoreNames.contains(STORES.EMPLOYEES)) {
          const employeeStore = db.createObjectStore(STORES.EMPLOYEES, schema.employees);
          employeeStore.createIndex('email', 'email', { unique: true });
        }
        if (!db.objectStoreNames.contains(STORES.LEAVE_REQUESTS)) {
          const leaveStore = db.createObjectStore(STORES.LEAVE_REQUESTS, schema.leaveRequests);
          leaveStore.createIndex('employeeId', 'employeeId', { unique: false });
          leaveStore.createIndex('status', 'status', { unique: false });
        }
        if (!db.objectStoreNames.contains(STORES.TIME_RECORDS)) {
          const timeStore = db.createObjectStore(STORES.TIME_RECORDS, schema.timeRecords);
          timeStore.createIndex('employeeId', 'employeeId', { unique: false });
          timeStore.createIndex('date', 'date', { unique: false });
        }
      };
    });
  }

  async getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    if (!this.db) {
      await this.connect();
    }
    const transaction = this.db!.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Operaciones genéricas CRUD
  async create<T>(storeName: string, data: T): Promise<number> {
    const store = await this.getStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add(data);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async read<T>(storeName: string, id: number): Promise<T | undefined> {
    const store = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async readAll<T>(storeName: string): Promise<T[]> {
    const store = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async update<T>(storeName: string, id: number, data: T): Promise<void> {
    const store = await this.getStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put({ ...data, id });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: number): Promise<void> {
    const store = await this.getStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Métodos específicos para consultas
  async queryByIndex<T>(
    storeName: string,
    indexName: string,
    value: any
  ): Promise<T[]> {
    const store = await this.getStore(storeName);
    const index = store.index(indexName);
    return new Promise((resolve, reject) => {
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new Database();