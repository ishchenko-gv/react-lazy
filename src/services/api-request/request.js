const responseTypes = {
  JSON: 'json',
  BLOB: 'blob',
  TEXT: 'text'
};

/**
 * Perform HTTP request
 *
 * @param {Object} opts
 *  @prop {String} url Requested resourse URL
 *  @prop {String} method HTTP method
 *  @prop {Object|string} body
 *  @prop {Object} headers
 *  @prop {String(json | blob | text)} [responseType=json]
 *
 * @return {Promise}
 */
export default async function request(opts) {
  const {
    url,
    method = 'GET',
    body,
    headers,
    responseType = responseTypes.JSON
  } = opts;

  const response = await fetch(url, {
    method,
    body,
    headers
  });

  switch (responseType) {
    case responseTypes.JSON:
      return await response.json();
    case responseTypes.BLOB:
      return await response.blob();
    case responseTypes.TEXT:
      return await response.text();
  }
}
