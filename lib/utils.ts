import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Slugify function to create SEO-friendly URLs
export const slugify = (str: string) => {
  str.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
};

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

export const timeSincePost = (postDate: Date): string => {
  // currentDate: Date,
  const currentDate = new Date();
  const diffMs = currentDate.getTime() - postDate.getTime(); // difference in milliseconds
  const diffSeconds = diffMs / 1000;
  const diffMinutes = diffSeconds / 60;
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;

  if (diffSeconds < 60) {
    return "Just now";
  } else if (diffMinutes < 60) {
    const minutes = Math.floor(diffMinutes);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    const hours = Math.floor(diffHours);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diffDays <= 5) {
    const days = Math.floor(diffDays);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    // Format as YYYY-MM-DD
    return postDate.toISOString().split("T")[0];
  }
};
