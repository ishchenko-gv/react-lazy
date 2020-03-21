/**
 * Perform HTTP request
 *
 * @param {Object} opts
 *  @prop {String} url Requested resource URL
 *  @prop {String} [method=GET] HTTP method
 *  @prop {Object|string} body
 *  @prop {Object} headers
 *  @prop {String(json | blob | text)} [responseType=json]
 *
 * @return {Promise<Object|string|null>}
 */
export default async function request(opts) {
  const {
    url,
    method = 'GET',
    body,
    headers,
    responseType = 'json'
  } = opts;

  const response = await fetch(url, {
    method,
    body,
    headers
  });

  switch (responseType) {
    case 'json':
      return await response.json();
    case 'blob':
      return await response.blob();
    case 'text':
      return await response.text();
    default:
      return null;
  }
}
