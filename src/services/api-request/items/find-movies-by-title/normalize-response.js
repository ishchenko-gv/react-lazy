/**
 * Map response from API for internal usage
 *
 * @param {Array} response
 *
 * @return {Array.<Object>|null}
 */
export default function mapResponse(response) {
  if (!response) return null;

  return response.map(item => {
    const {
      imdbID,
      Title,
      Poster,
      Year
    } = item;

    return {
      id: imdbID,
      title: Title,
      posterURL: Poster,
      year: Year
    };
  });
}
