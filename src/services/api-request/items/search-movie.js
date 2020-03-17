import request from '../request';
import { baseUrl } from '../base-url';
import { logError } from '../../logger';

export default async function searchMovie(movieTitle) {
  const url = `${baseUrl.IMDB}/?r=json&s=${encodeURIComponent(movieTitle)}`;

  try {
    const response = await request({
      url,
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPID_API_HOST,
        'x-rapidapi-key': process.env.RAPID_API_KEY
      }
    });

    const { Search } = await response.json();

    return Search;
  } catch (e) {
    logError(e);
  }
}