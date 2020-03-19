import request from '../../request';
import { baseUrl } from '../../base-url';
import mapResponse from './map-response';
import { logError } from '../../../logger';

export default async function findMoviesByTitle(movieTitle, page = 1) {
  const url = `${baseUrl.IMDB}/?r=json&page=${page}&s=${encodeURIComponent(movieTitle)}`;

  try {
    const { Search } = await request({
      url,
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPID_API_HOST,
        'x-rapidapi-key': process.env.RAPID_API_KEY
      }
    });

    return mapResponse(Search);
  } catch (e) {
    logError(e);
  }
}