/**
 * Map response from API for internal usage
 *
 * @param {Object} response
 *
 * @return {Array.<Object>}
 */
export default function mapResponse (response) {
  const { Search, totalResults: foundMoviesCount } = response;

  if (!Search) return [];

  const list = Search.map(item => {
    const {
      imdbID: id,
      Title: title,
      Poster: posterURL,
      Year: year
    } = item;

    return {
      id,
      title,
      posterURL,
      year
    };
  });

  return {
    list,
    foundMoviesCount
  };
}
