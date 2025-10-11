import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToCustomFormat = (dateString: string | any) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const dayNumber = date.getDate();
  const suffix =
    dayNumber === 1 || dayNumber === 21 || dayNumber === 31
      ? "st"
      : dayNumber === 2 || dayNumber === 22
      ? "nd"
      : dayNumber === 3 || dayNumber === 23
      ? "rd"
      : "th";
  const dayWithSuffix = `${dayNumber}${suffix}`;
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const period = Number(hours) >= 12 ? "PM" : "AM";
  const hour12 = Number(hours) % 12 || 12; // Convert to 12-hour format, with 12 instead of 0
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" }); // Get day of the week
  const shortDayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }); // Get day of the week
  const monthOfYear = date.toLocaleDateString("en-US", { month: "long" }); // Get full month name
  const shortMonthOfYear = date.toLocaleDateString("en-US", { month: "short" }); // Get full month name

  return {
    day,
    month,
    year,
    hour12,
    minutes,
    seconds,
    period,
    dayOfWeek,
    shortDayOfWeek,
    shortMonthOfYear,
    monthOfYear,
    dayWithSuffix,
  };
};
