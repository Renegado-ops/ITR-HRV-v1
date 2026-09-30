import React, { useState } from 'react';
import { LeaveRequest } from '../types';

interface Props {
  requests: LeaveRequest[];
  setRequests: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
}

export const Requests: React.FC<Props> = ({ requests, setRequests }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('PTO');
  const [dates, setDates] = useState('');

  const handleStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dates) return;
    const newReq: LeaveRequest = {
      id: Date.now().toString(),
      employeeName: name,
      type,
      dates,
      status: 'Pending',
    };
    setRequests([...requests, newReq]);
    setName('');
    setDates('');
  };

  return (
    <div className="container">
      <h2>Gestión de Solicitudes</h2>

      <div className="card">
        <h3>Crear Nueva Solicitud</h3>
        <form
          onSubmit={handleCreate}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
        >
          <input
            type="text"
            placeholder="Nombre Empleado"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="PTO">PTO</option>
            <option value="Vacation">Vacación</option>
            <option value="Sick Leave">Enfermedad</option>
          </select>
          <input
            type="text"
            placeholder="Fechas (ej: 2026-10-01)"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Tipo</th>
            <th>Fechas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.employeeName}</td>
              <td>{r.type}</td>
              <td>{r.dates}</td>
              <td>
                <b>{r.status}</b>
              </td>
              <td>
                {r.status === 'Pending' && (
                  <>
                    <button
                      className="btn-action"
                      onClick={() => handleStatus(r.id, 'Approved')}
                    >
                      Aprobar
                    </button>
                    <button
                      className="btn-action"
                      onClick={() => handleStatus(r.id, 'Rejected')}
                    >
                      Rechazar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
