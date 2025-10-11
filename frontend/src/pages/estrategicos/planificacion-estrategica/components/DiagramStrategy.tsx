// src/views/estratégicos/planificacion-estrategica/components/DiagramStrategy.tsx
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import { fetchRoomTypeStats, fetchReservationStats } from '../components/DatosConnection';
import type { RoomTypeStat, ReservationStatusStats } from '../types/dashboardTypes';

const COLORS = ['#D97706', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6'];

const renderCustomizedLabel = ({ name, percent, value }: PieLabelRenderProps) => {
  if (typeof percent === 'number') {
    return `${name || ''} (${value}) - ${(percent * 100).toFixed(0)}%`;
  }
  return name || '';
};

// Datos mock para pruebas
const mockRoomTypeStats: RoomTypeStat[] = [
  { id: 1, category: 'STANDARD', bedSize: 'SINGLE', bedQuantity: 1, description: 'Habitación estándar con cama individual', total: 20, occupied: 8, reserved: 5 },
  { id: 2, category: 'MATRIMONIAL', bedSize: 'DOUBLE', bedQuantity: 1, description: 'Habitación matrimonial con cama doble', total: 15, occupied: 10, reserved: 3 },
];

const mockReservationStats: ReservationStatusStats = {
  CONFIRMADO: 12,
  PENDIENTE: 5,
  COMPLETADO: 8,
  CANCELADO: 2,
};

const DiagramStrategy = () => {
  const [roomTypeStats, setRoomTypeStats] = useState<RoomTypeStat[]>(mockRoomTypeStats);
  const [reservationStats, setReservationStats] = useState<ReservationStatusStats>(mockReservationStats);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false); // Cambia a true para usar datos mock

  useEffect(() => {
    const loadStats = async () => {
      if (!useMockData) {
        setLoading(true);
        try {
          const [roomStats, reservationStats] = await Promise.all([
            fetchRoomTypeStats(),
            fetchReservationStats(),
          ]);
          setRoomTypeStats(roomStats);
          setReservationStats(reservationStats);
        } catch (error) {
          console.error('Error loading data:', error);
          // Si falla, usamos los datos mock
          setRoomTypeStats(mockRoomTypeStats);
          setReservationStats(mockReservationStats);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    loadStats();
  }, [useMockData]);

  const roomTypeData = roomTypeStats.map((stat) => ({
    name: stat.category || 'Desconocido',
    total: stat.total,
    ocupadas: stat.occupied,
    reservadas: stat.reserved,
    disponibles: stat.total - (stat.occupied + stat.reserved),
  }));

  const reservationData = Object.entries(reservationStats).map(([status, count]) => ({
    name: status.replace('_', ' ') || 'Desconocido',
    value: count || 0,
  }));

  if (loading) return <div className="text-white">Cargando...</div>;
  if (roomTypeData.length === 0) return <div className="text-white">No hay datos de ocupación disponibles</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Ocupación por tipo de habitación */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Ocupación por Tipo de Habitación
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={roomTypeData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis allowDecimals={false} stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: '#D97706',
                color: 'white',
                borderRadius: '8px',
              }}
            />
            <Legend
              wrapperStyle={{
                color: 'white',
              }}
            />
            <Bar dataKey="ocupadas" fill="#D97706" name="Ocupadas" />
            <Bar dataKey="reservadas" fill="#F59E0B" name="Reservadas" />
            <Bar dataKey="disponibles" fill="#10B981" name="Disponibles" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Reservas por estado */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-white">Reservas por Estado</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={reservationData}
              cx="50%"
              cy="50%"
              outerRadius={130}
              dataKey="value"
              nameKey="name"
              labelLine={true}
              label={renderCustomizedLabel}
            >
              {reservationData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: '#D97706',
                color: 'white',
                borderRadius: '8px',
              }}
            />
            <Legend
              wrapperStyle={{
                color: 'white',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiagramStrategy;
