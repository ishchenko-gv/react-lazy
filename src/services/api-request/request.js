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
 * @return {Promise.<Object|string|null>}
 */
export default async function request (opts) {
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

  if (response.Response === 'False') throw new Error(response.Error);

  let result;

  switch (responseType) {
    case 'json':
      result = await response.json();
      break;
    case 'blob':
      result = await response.blob();
      break;
    case 'text':
      result = await response.text();
      break;
    default:
      result = null;
  }

  return result;
}
