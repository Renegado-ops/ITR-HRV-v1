import { Employee, LeaveRequest } from '../types';

export const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Aaron Garcia',
    email: 'aaron@company.com',
    role: 'User',
    team: 'Support',
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    email: 'carlos@company.com',
    role: 'User',
    team: 'Accounting',
  },
  {
    id: '3',
    name: 'Sarah Connor',
    email: 'sarah@company.com',
    role: 'Manager',
    team: 'Accounting',
  },
];

export const initialRequests: LeaveRequest[] = [
  {
    id: '101',
    employeeName: 'Carlos Mendoza',
    type: 'PTO',
    dates: '2026-09-25',
    status: 'Pending',
  },
  {
    id: '102',
    employeeName: 'Sarah Connor',
    type: 'Vacation',
    dates: '2026-10-01 to 2026-10-05',
    status: 'Pending',
  },
];
