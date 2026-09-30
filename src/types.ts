export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  dates: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
