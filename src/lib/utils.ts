import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getExperience(startDate: Date, endDate: Date) {

  const years = endDate.getFullYear() - startDate.getFullYear()
  const months = endDate.getMonth() - startDate.getMonth()
  return `${years} years${months > 0 ? ` and ${months} months` : ''}`
}

export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
  const parts = formatter.formatToParts(date)
  
  return `${parts[0].value} ${parts.at(-1)?.value}`
}
