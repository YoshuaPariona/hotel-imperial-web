

import { DollarSign, User, CalendarDays, Users } from "lucide-react"
import type { ChartConfig } from "@/components/ui/chart"
import * as React from "react";


export interface SummaryCardItem {
  title: string
  value: string
  desc: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}


export const summaryCards: SummaryCardItem[] = [
  {
    title: "Ingresos Totales",
    value: "$2,550",
    desc: "Ingresos totales de todas las reservas",
    icon: DollarSign,
  },
  {
    title: "Tasa de Ocupación",
    value: "16.7%",
    desc: "Habitaciones actualmente ocupadas",
    icon: User,
  },
  {
    title: "Reservas Totales",
    value: "+3",
    desc: "Total de reservas realizadas",
    icon: CalendarDays,
  },
  {
    title: "Huéspedes Totales",
    value: "+3",
    desc: "Total de huéspedes registrados",
    icon: Users,
  },
]


export interface RoomOccupancyItem {
  name: string
  disponibles: number
  ocupadas: number
  reservadas: number
}


export const roomOccupancyData: RoomOccupancyItem[] = [
  { name: "STANDARD", disponibles: 7, ocupadas: 5, reservadas: 8 },
  { name: "MATRIMONIAL", disponibles: 2, ocupadas: 10, reservadas: 3 },
]


export const barChartConfig = {
  ocupadas: { label: "Ocupadas", color: "var(--chart-3)" },
  reservadas: { label: "Reservadas", color: "var(--chart-2)" },
  disponibles: { label: "Disponibles", color: "var(--chart-1)" },
} satisfies ChartConfig


export interface BookingStatusItem {
  estado: string
  cantidad: number
  fill: string
}


export const bookingStatusData: BookingStatusItem[] = [
  { estado: "PENDIENTE", cantidad: 5, fill: "var(--chart-1)" },
  { estado: "CONFIRMADO", cantidad: 12, fill: "var(--chart-2)" },
  { estado: "COMPLETADO", cantidad: 8, fill: "var(--chart-3)" },
  { estado: "CANCELADO", cantidad: 2, fill: "var(--destructive)" },
]


export const pieChartConfig = {
  CONFIRMADO: { label: "CONFIRMADO", color: "var(--chart-1)" },
  PENDIENTE: { label: "PENDIENTE", color: "var(--chart-2)" },
  COMPLETADO: { label: "COMPLETADO", color: "var(--chart-3)" },
  CANCELADO: { label: "CANCELADO", color: "var(--destructive)" },
} satisfies ChartConfig