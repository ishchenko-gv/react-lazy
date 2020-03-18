/**
 * Perform HTTP request
 * 
 * @param {Object} opts 
 *  @prop {String} url Requested resourse URL
 *  @prop {String} method HTTP method
 *  @prop {Object|string} body
 *  @prop {Object} headers
 * 
 * @return {Promise}
 */
export default async function request (opts) {
  const {
    url,
    method = 'GET',
    body,
    headers
  } = opts;

  const response = await fetch(url, {
    method,
    body,
    headers
  });

  return await response.json();
}