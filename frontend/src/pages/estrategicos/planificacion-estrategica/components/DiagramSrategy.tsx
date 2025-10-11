import React from 'react';
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
import type { RoomTypeStat } from './DatosConnection';

const COLORS = ['#4F46E5', '#06B6D4', '#FACC15', '#F97316', '#10B981', '#EC4899'];

interface EstrategicaChartsProps {
  roomTypeStats: Array<RoomTypeStat & { occupied: number; reserved: number }>;
  reservationStatusStats: Record<string, number>;
}

const renderCustomizedLabel = ({ name, percent, value }: PieLabelRenderProps) => {
  if (typeof percent === 'number') {
    return `${name} (${value}) - ${(percent * 100).toFixed(0)}%`;
  }
  return name;
};

const EstrategicaCharts: React.FC<EstrategicaChartsProps> = ({ roomTypeStats, reservationStatusStats }) => {
  const roomTypeData = roomTypeStats.map((stat) => ({
    name: stat.category,
    total: stat.total,
    ocupadas: stat.occupied,
    reservadas: stat.reserved,
    disponibles: stat.total - (stat.occupied + stat.reserved),
  }));

  const reservationData = Object.entries(reservationStatusStats).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* === Ocupación por tipo de habitación === */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Ocupación por Tipo de Habitación
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={roomTypeData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ocupadas" fill="#4F46E5" name="Ocupadas" />
            <Bar dataKey="reservadas" fill="#06B6D4" name="Reservadas" />
            <Bar dataKey="disponibles" fill="#10B981" name="Disponibles" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* === Reservas === */}
      <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Reservas por Estado</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={reservationData}
              cx="50%"
              cy="50%"
              outerRadius={130}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {reservationData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EstrategicaCharts;
