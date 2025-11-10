"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, CartesianGrid, PieChart, Pie, YAxis, Legend } from "recharts"
import {
  summaryCards,
  roomOccupancyData,
  bookingStatusData,
  barChartConfig,
  pieChartConfig,
} from "@pages/dashboard/DashboardData";

export function Dashboard() {
  return (
      <div className="h-full w-full grid grid-rows-[auto_1fr] gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card, i) => (
              <Card key={i} className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.desc}</p>
                </CardContent>
              </Card>
          ))}
        </div>


        <div className="grid gap-4 md:grid-cols-2 h-full">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Ocupación por Tipo de Habitación</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 mt-12">
              <ChartContainer config={barChartConfig}>
                <BarChart accessibilityLayer data={roomOccupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" className="text-base" />
                  <YAxis className="text-base" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend
                      formatter={(value) => {
                        const config = barChartConfig[value as keyof typeof barChartConfig]
                        return (
                            <span className="text-lg pr-6" style={{ color: config.color }}>
                              {config.label}
                              </span>
                        )
                      }}
                  />
                  <Bar dataKey="ocupadas" stackId="a" fill="var(--chart-3)" />
                  <Bar dataKey="reservadas" stackId="a" fill="var(--chart-2)" />
                  <Bar dataKey="disponibles" stackId="a" fill="var(--chart-1)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>


          <Card className="h-full flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Reservas por Estado</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer config={pieChartConfig} className="mx-auto px-0">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                      data={bookingStatusData}
                      dataKey="cantidad"
                      nameKey="estado"
                      label={({ payload, percent, ...props }) => {
                        const total = bookingStatusData.reduce((acc, item) => acc + item.cantidad, 0)
                        const percentage = Math.round((payload.cantidad / total) * 100)
                        return (
                            <text
                                cx={props.cx}
                                cy={props.cy}
                                x={props.x}
                                y={props.y}
                                textAnchor={props.textAnchor}
                                dominantBaseline={props.dominantBaseline}
                                fill={payload.fill}
                                className="text-base font-semibold"
                            >
                              {`${payload.estado} (${payload.cantidad}) - ${percentage}%`}
                            </text>
                        )
                      }}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}