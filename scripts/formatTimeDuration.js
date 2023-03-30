export function formatTimeDuration() {
  const time = Date.now();

  const hrs = new Date(time).getHours();
  const mins = new Date(time).getMinutes();
  const secs = new Date(time).getSeconds();

  return [hrs, mins, secs];
}
