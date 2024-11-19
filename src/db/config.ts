export const DB_NAME = 'sistemarhh';
export const DB_VERSION = 1;

export const STORES = {
  USERS: 'users',
  EMPLOYEES: 'employees',
  LEAVE_REQUESTS: 'leaveRequests',
  TIME_RECORDS: 'timeRecords'
} as const;

export const schema = {
  users: { keyPath: 'id', autoIncrement: true },
  employees: { keyPath: 'id', autoIncrement: true },
  leaveRequests: { keyPath: 'id', autoIncrement: true },
  timeRecords: { keyPath: 'id', autoIncrement: true }
};