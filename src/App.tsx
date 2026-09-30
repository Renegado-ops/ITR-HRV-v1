import React, { useState } from 'react';

// Tipos actualizados para incluir los días
interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  vacacionesRestantes: number;
  vacacionesTomadas: number;
  sickLeave: number;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  dates: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

// Datos iniciales con los contadores de días agregados
const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Aaron Garcia',
    email: 'aaron@company.com',
    role: 'User',
    team: 'Support',
    vacacionesRestantes: 14,
    vacacionesTomadas: 0,
    sickLeave: 2,
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    email: 'carlos@company.com',
    role: 'User',
    team: 'Accounting',
    vacacionesRestantes: 5,
    vacacionesTomadas: 9,
    sickLeave: 0,
  },
  {
    id: '3',
    name: 'Sarah Connor',
    email: 'sarah@company.com',
    role: 'Manager',
    team: 'Accounting',
    vacacionesRestantes: 10,
    vacacionesTomadas: 4,
    sickLeave: 1,
  },
];

const initialRequests: LeaveRequest[] = [
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

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'requests' | 'employees'
  >('dashboard');
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [employees] = useState<Employee[]>(initialEmployees);

  // Campos para nueva solicitud
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

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Barra de navegación superior */}
      <div
        style={{
          backgroundColor: '#0088cc',
          padding: '12px 20px',
          color: 'white',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        <h3 style={{ margin: 0, marginRight: '20px' }}>ITR HRV v1.0</h3>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{ padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          style={{ padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Solicitudes
        </button>
        <button
          onClick={() => setActiveTab('employees')}
          style={{ padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Empleados
        </button>
      </div>

      {/* Contenedor Principal Dividido (Barra Lateral Izquierda + Contenido Derecho) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          minHeight: 'calc(100vh - 50px)',
        }}
      >
        {/* === BARRA LATERAL IZQUIERDA (Contadores Cuadrados) === */}
        <div
          style={{
            width: '280px',
            backgroundColor: '#e0e0e0',
            padding: '20px',
            borderRight: '2px solid #ccc',
            minHeight: '100%',
          }}
        >
          <h3
            style={{
              marginTop: 0,
              borderBottom: '1px solid #999',
              paddingBottom: '10px',
            }}
          >
            Saldos de Personal
          </h3>

          {employees.map((emp) => (
            <div
              key={emp.id}
              style={{
                backgroundColor: 'white',
                border: '2px solid #999',
                padding: '15px',
                marginBottom: '15px',
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', color: '#0088cc' }}>
                {emp.name}
              </h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <div>
                  <strong>Días Restantes:</strong> {emp.vacacionesRestantes}
                </div>
                <div>
                  <strong>Vacaciones Tomadas:</strong> {emp.vacacionesTomadas}
                </div>
                <div>
                  <strong>Sick Leave:</strong> {emp.sickLeave}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === CONTENIDO PRINCIPAL DERECHO === */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Pestaña: Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h2>Dashboard Básico</h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div
                  style={{
                    background: 'white',
                    border: '1px solid #ccc',
                    padding: '15px',
                    flex: 1,
                  }}
                >
                  <h3>Solicitudes Pendientes</h3>
                  <p
                    style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      margin: '10px 0 0 0',
                    }}
                  >
                    {pendingCount}
                  </p>
                </div>
                <div
                  style={{
                    background: 'white',
                    border: '1px solid #ccc',
                    padding: '15px',
                    flex: 1,
                  }}
                >
                  <h3>Personal Activo</h3>
                  <p
                    style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      margin: '10px 0 0 0',
                    }}
                  >
                    {employees.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pestaña: Solicitudes */}
          {activeTab === 'requests' && (
            <div>
              <h2>Gestión de Solicitudes</h2>
              <div
                style={{
                  background: 'white',
                  border: '1px solid #ccc',
                  padding: '15px',
                  marginBottom: '15px',
                }}
              >
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
                    style={{ padding: '6px' }}
                  />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{ padding: '6px' }}
                  >
                    <option value="PTO">PTO</option>
                    <option value="Vacation">Vacación</option>
                    <option value="Sick Leave">Enfermedad</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Fechas (ej: 2026-10-01)"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    style={{ padding: '6px' }}
                  />
                  <button
                    type="submit"
                    style={{ padding: '6px 15px', cursor: 'pointer' }}
                  >
                    Agregar
                  </button>
                </form>
              </div>

              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  background: 'white',
                }}
              >
                <thead>
                  <tr style={{ background: '#eee' }}>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Empleado
                    </th>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Tipo
                    </th>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Fechas
                    </th>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Estado
                    </th>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id}>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        {r.employeeName}
                      </td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        {r.type}
                      </td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        {r.dates}
                      </td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        <b>{r.status}</b>
                      </td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        {r.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleStatus(r.id, 'Approved')}
                              style={{ marginRight: '5px', cursor: 'pointer' }}
                            >
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleStatus(r.id, 'Rejected')}
                              style={{ cursor: 'pointer' }}
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
          )}

          {/* Pestaña: Empleados */}
          {activeTab === 'employees' && (
            <div>
              <h2>Lista de Empleados</h2>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  background: 'white',
                }}
              >
                <thead>
                  <tr style={{ background: '#eee' }}>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Nombre
                    </th>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Correo
                    </th>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Rol
                    </th>
                    <th
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Equipo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        {emp.name}
                      </td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        {emp.email}
                      </td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        {emp.role}
                      </td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                        {emp.team}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
