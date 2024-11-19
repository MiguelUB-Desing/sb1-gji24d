import { db } from '../db';
import { STORES } from '../db/config';

export interface TimeRecord {
  id?: number;
  employeeId: number;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  createdAt: string;
}

export const timeRecordService = {
  async create(record: Omit<TimeRecord, 'id' | 'createdAt'>): Promise<number> {
    return db.create(STORES.TIME_RECORDS, {
      ...record,
      createdAt: new Date().toISOString()
    });
  },

  async getAll(): Promise<TimeRecord[]> {
    return db.readAll(STORES.TIME_RECORDS);
  },

  async getByEmployee(employeeId: number): Promise<TimeRecord[]> {
    return db.queryByIndex(STORES.TIME_RECORDS, 'employeeId', employeeId);
  },

  async getByDate(date: string): Promise<TimeRecord[]> {
    return db.queryByIndex(STORES.TIME_RECORDS, 'date', date);
  },

  async update(id: number, record: TimeRecord): Promise<void> {
    return db.update(STORES.TIME_RECORDS, id, record);
  },

  async delete(id: number): Promise<void> {
    return db.delete(STORES.TIME_RECORDS, id);
  }
};