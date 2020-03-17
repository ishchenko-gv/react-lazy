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
export default function request (opts) {
  const {
    url,
    method = 'GET',
    body,
    headers
  } = opts;

  return fetch(url, {
    method,
    body,
    headers
  })
}