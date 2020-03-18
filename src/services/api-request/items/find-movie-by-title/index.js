import request from '../../request';
import { baseUrl } from '../../base-url';
import mapResponse from './map-response';
import { logError } from '../../../logger';

const cache = {};

export default async function findMovieByTitle(movieTitle) {
  if (cache[movieTitle]) return cache[movieTitle];

  const url = `${baseUrl.IMDB}/?r=json&s=${encodeURIComponent(movieTitle)}`;

  try {
    const { Search } = await request({
      url,
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPID_API_HOST,
        'x-rapidapi-key': process.env.RAPID_API_KEY
      }
    });

    const normalizedResponse = mapResponse(Search);

    cache[movieTitle] = normalizedResponse;

    return normalizedResponse;
  } catch (e) {
    logError(e);
  }
}