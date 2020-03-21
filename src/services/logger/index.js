export function logError (e) {
  if (process.env.NODE_ENV === 'development') console.error(e);
}