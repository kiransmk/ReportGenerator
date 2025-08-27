export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function getNextMonth(month: number, year: number) {
  const next = month + 1;
  if (next > 12) return [next - 12, year + 1];
  else return [next, year];
}

export function getPrevMonth(month: number, year: number) {
  const prev = month - 1;
  if (prev < 1) return [12 - prev, year - 1];
  else return [prev, year];
}

export function getMonthString(monthNumber: number) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthNumber -= 1;
  if (monthNumber >= 0 && monthNumber < 12) {
    return months[monthNumber];
  } else {
    return "Invalid Month";
  }
}

export function getMonthYearString(monthNumber: number, year: number) {
  return getMonthString(monthNumber) + " " + year;
}

export function getDateMonthYearString(
  date: number,
  monthNumber: number,
  year: number
) {
  return date + " " + getMonthString(monthNumber) + ", " + year;
}

const inSec = 1;
const inMin = inSec * 60;
const inHrs = inMin * 60;
const inDays = inHrs * 24;

export function timeSince(dt: number = 1695823233968): string {
  const d = new Date(dt);
  const now = Date.now();
  const diff = now - d.valueOf();
  const diffSec = Math.floor(diff / 1000);

  if (diffSec >= inDays) {
    const days = Math.floor(diffSec / inDays);
    return days + " days";
  } else if (diffSec >= inHrs) {
    const hrs = Math.floor(diffSec / inHrs);
    return hrs + " hours";
  } else if (diffSec >= inMin) {
    const min = Math.floor(diffSec / inMin);
    return min + " min";
  } else {
    return diffSec + " seconds";
  }
}
