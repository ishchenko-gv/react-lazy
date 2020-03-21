/**
 * Map response from API for internal usage
 *
 * @param {Object} response
 *
 * @return {Object}
 */
export default function mapResponse(response) {
  const {
    Title,
    Year,
    Released,
    Genre,
    Director,
    Actors,
    Plot,
    Country,
    Poster,
    Ratings
  } = response;

  const ratings = Ratings.map(rating => ({
    source: rating.Source,
    value: rating.Value
  }));

  return {
    title: Title,
    year: Year,
    released: Released,
    genre: Genre,
    director: Director,
    actors: Actors,
    plot: Plot,
    country: Country,
    posterURL: Poster,
    ratings
  };
}
