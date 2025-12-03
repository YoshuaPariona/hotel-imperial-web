// Doble de tamaño aplicado principalmente a ChartContainer y RadarChart
import { FC, useEffect, useState } from "react";
import { api } from "@lib/axios";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@components/ui/chart";

interface IncidentTypeCount {
  type: string;
  count: number;
}

const renderCustomizedLabel = (props: any) => {
  const { x, y, value } = props;
  return (
      <text
          x={x}
          y={y}
          textAnchor="middle"
          fill="hsl(33, 90%, 35%)"
          fontSize={16} // aumentado
          fontWeight={600}
          dy={-12}
      >
        {value}
      </text>
  );
};

export const Quality: FC = () => {
  const [chartData, setChartData] = useState<IncidentTypeCount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get("/incidents/types/count");
        setChartData(res.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("No se pudieron cargar los datos. Reintentando...");
        setTimeout(fetchCounts, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const chartConfig: ChartConfig = {
    count: {
      label: "Incidentes",
      color: "hsl(33, 90%, 55%)",
    },
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
          <div className="rounded-lg border bg-background p-2 shadow-sm">
            <p className="text-sm font-medium">
              {payload[0].payload.type}: {payload[0].value}
            </p>
          </div>
      );
    }
    return null;
  };

  return (
      <div className="p-6">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Tipos de Incidentes</CardTitle>
            <CardDescription>
              Total de incidentes agrupados por tipo
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            {isLoading ? (
                <div className="flex h-[600px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">Cargando datos...</p>
                </div>
            ) : error ? (
                <div className="flex h-[600px] items-center justify-center">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
            ) : chartData.length === 0 ? (
                <div className="flex h-[600px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
                </div>
            ) : (
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[560px] w-full" // duplicado
                >
                  <RadarChart
                      data={chartData}
                      width={600} // duplicado
                      height={560} // duplicado
                      cx="50%"
                      cy="50%"
                      outerRadius="90%"
                  >
                    <PolarGrid gridType="polygon" />
                    <PolarAngleAxis dataKey="type" tick={{ fontSize: 16 }} />
                    <ChartTooltip content={<CustomTooltip />} />
                    <Radar
                        dataKey="count"
                        stroke="hsl(33, 90%, 55%)"
                        fill="hsl(33, 90%, 55%)"
                        fillOpacity={0.6}
                        dot={{ r: 6, fill: "hsl(33, 90%, 55%)" }}
                        label={renderCustomizedLabel}
                    />
                  </RadarChart>
                </ChartContainer>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tendencia estable <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Datos en tiempo real
            </div>
          </CardFooter>
        </Card>
      </div>
  );
};
