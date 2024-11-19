import { db } from '../db';
import { STORES } from '../db/config';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
}

export const employeeService = {
  async create(employee: Employee): Promise<number> {
    return db.create(STORES.EMPLOYEES, employee);
  },

  async getAll(): Promise<Employee[]> {
    return db.readAll(STORES.EMPLOYEES);
  },

  async getById(id: number): Promise<Employee | undefined> {
    return db.read(STORES.EMPLOYEES, id);
  },

  async update(id: number, employee: Employee): Promise<void> {
    return db.update(STORES.EMPLOYEES, id, employee);
  },

  async delete(id: number): Promise<void> {
    return db.delete(STORES.EMPLOYEES, id);
  }
};