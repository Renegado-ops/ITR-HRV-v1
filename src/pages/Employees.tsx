import React from 'react';
import { Employee } from '../types';

interface Props {
  employees: Employee[];
}

export const Employees: React.FC<Props> = ({ employees }) => {
  return (
    <div className="container">
      <h2>Lista de Empleados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Equipo</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>{emp.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
