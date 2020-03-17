export function logError (e) {
  if (process.NODE_ENV === 'development') console.error(e);
}