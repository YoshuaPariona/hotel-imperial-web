import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

const COLORS = ['#4F46E5', '#06B6D4', '#FACC15', '#F97316', '#10B981', '#EC4899'];

interface CalidadChartProps {
  incidentTypeStats: Record<string, number>;
}

const renderCustomizedLabel = ({ name, percent, value }: PieLabelRenderProps) => {
  if (typeof percent === 'number') {
    return `${name} (${value}) - ${(percent * 100).toFixed(0)}%`;
  }
  return name;
};

const CalidadChart: React.FC<CalidadChartProps> = ({ incidentTypeStats }) => {
  const incidentData = Object.entries(incidentTypeStats).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* === Incidencias === */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Incidencias por Tipo</h2>
        <ResponsiveContainer width="100%" height={550}>
          <PieChart>
            <Pie
              data={incidentData}
              cx="50%"
              cy="50%"
              outerRadius={200}
              dataKey="value"
              nameKey="name"
              labelLine={true}
              label={renderCustomizedLabel}
            >
              {incidentData.map((_, i) => (
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

export default CalidadChart;
