// Example utility function to convert time to UTC based on timezone
export const convertToUTC = (time, timezone) => {
  return new Date(time).toLocaleString("en-US", { timeZone: timezone });
};
