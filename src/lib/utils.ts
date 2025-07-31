import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

export function getColorByValue(value: number, min: number, max: number): string {
  const normalized = (value - min) / (max - min)
  if (normalized < 0.33) return '#f9a825' // Orange for low values
  if (normalized < 0.66) return '#66cc99' // Green for medium values
  return '#0099cc' // Blue for high values
}

export function interpolateColor(value: number, min: number, max: number): string {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)))
  
  // Color gradient from light to dark teal
  const r = Math.round(102 + (0 - 102) * normalized)
  const g = Math.round(204 + (153 - 204) * normalized)
  const b = Math.round(204 + (204 - 204) * normalized)
  
  return `rgb(${r}, ${g}, ${b})`
}