import { differenceInHours, parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

export function formatUtcToLocal(
  utcDateString,
  timeZone,
  pattern = "yyyy-MM-dd HH:mm:ssXXX",
) {
  try {
    const zone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = toZonedTime(utcDateString, zone);
    return format(zonedDate, pattern, { timeZone: zone });
  } catch (error) {
    console.error("Error formatting date:", error);
    return utcDateString;
  }
}

export function getTimeLeftUntil(utcEndTime) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const deadlineUTC = parseISO(utcEndTime);
  const deadlineInUserTZ = toZonedTime(deadlineUTC, userTimeZone);
  const now = toZonedTime(new Date(), userTimeZone);

  const totalSeconds = Math.max(
    0,
    Math.floor((deadlineInUserTZ.getTime() - now.getTime()) / 1000),
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds, totalSeconds };
}

export function getHoursUntil(utcTime) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const futureDate = toZonedTime(parseISO(utcTime), userTimeZone);

  const now = toZonedTime(new Date(), userTimeZone);

  const hoursUntil = differenceInHours(futureDate, now);

  return hoursUntil;
}
