import { db } from '../db';
import { STORES } from '../db/config';

export type LeaveStatus = 'pendiente' | 'aprobado' | 'rechazado';

export interface LeaveRequest {
  id?: number;
  employeeId: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
  updatedAt: string;
}

export const leaveService = {
  async create(leaveRequest: Omit<LeaveRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    return db.create(STORES.LEAVE_REQUESTS, {
      ...leaveRequest,
      status: 'pendiente',
      createdAt: now,
      updatedAt: now
    });
  },

  async getAll(): Promise<LeaveRequest[]> {
    return db.readAll(STORES.LEAVE_REQUESTS);
  },

  async getByEmployee(employeeId: number): Promise<LeaveRequest[]> {
    return db.queryByIndex(STORES.LEAVE_REQUESTS, 'employeeId', employeeId);
  },

  async getPending(): Promise<LeaveRequest[]> {
    return db.queryByIndex(STORES.LEAVE_REQUESTS, 'status', 'pendiente');
  },

  async updateStatus(id: number, status: LeaveStatus): Promise<void> {
    const request = await db.read<LeaveRequest>(STORES.LEAVE_REQUESTS, id);
    if (request) {
      return db.update(STORES.LEAVE_REQUESTS, id, {
        ...request,
        status,
        updatedAt: new Date().toISOString()
      });
    }
  }
};