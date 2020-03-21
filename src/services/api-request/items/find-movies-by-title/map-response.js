/**
 * Map response from API for internal usage
 * 
 * @param {Object} response 
 * 
 * @return {Array<Object>}
 */
export default function mapResponse(response) {
  return response.map(item => {
    const { imdbID, Title, Poster, Year } = item;

    return {
      id: imdbID,
      title: Title,
      posterURL: Poster,
      year: Year
    };
  });
}
