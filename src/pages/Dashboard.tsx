import React from 'react';
import { LeaveRequest } from '../types';

interface Props {
  requests: LeaveRequest[];
}

export const Dashboard: React.FC<Props> = ({ requests }) => {
  const pendingCount = requests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="container">
      <h2>Dashboard Básico</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className="card" style={{ flex: 1 }}>
          <h3>Solicitudes Pendientes</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{pendingCount}</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h3>Personal Activo</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>3</p>
        </div>
      </div>
    </div>
  );
};
