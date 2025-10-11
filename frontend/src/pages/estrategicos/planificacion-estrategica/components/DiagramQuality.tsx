// src/views/estratégicos/planificacion-estrategica/components/DiagramQuality.tsx
import React, { useEffect, useState } from 'react';
import { fetchIncidentStats } from '../components/DatosConnection';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import type { IncidentTypeStats } from '../types/dashboardTypes';

const COLORS = ['#D97706', '#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6'];

const renderCustomizedLabel = ({ name, percent, value }: PieLabelRenderProps) => {
  if (typeof percent === 'number') {
    return `${name || ''} (${value}) - ${(percent * 100).toFixed(0)}%`;
  }
  return name || '';
};

// Datos mock para pruebas
const mockIncidentStats: IncidentTypeStats = {
  MANTENIMIENTO: 12,
  LIMPIEZA: 8,
  RUIDO: 5,
  DETERIORO_MOBILIARIO: 7,
  FUGA_AGUA: 3,
  ELECTRICIDAD: 4,
};

const DiagramQuality = () => {
  const [incidentStats, setIncidentStats] = useState<IncidentTypeStats>(mockIncidentStats);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false); // Cambia a true para usar datos mock

  useEffect(() => {
    const loadIncidentStats = async () => {
      if (!useMockData) {
        setLoading(true);
        try {
          const stats = await fetchIncidentStats();
          setIncidentStats(stats);
        } catch (error) {
          console.error('Error loading incident stats:', error);
          // Si falla, usamos los datos mock
          setIncidentStats(mockIncidentStats);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    loadIncidentStats();
  }, [useMockData]);

  const incidentData = Object.entries(incidentStats).map(([type, count]) => ({
    name: type.replace('_', ' ') || 'Desconocido',
    value: count || 0,
  }));

  if (loading) return <div className="text-white">Cargando...</div>;
  if (incidentData.length === 0) return <div className="text-white">No hay datos de incidentes disponibles</div>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Incidencias por Tipo</h2>
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
  );
};

export default DiagramQuality;
