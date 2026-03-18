import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// This function merges Tailwind classes intelligently
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
