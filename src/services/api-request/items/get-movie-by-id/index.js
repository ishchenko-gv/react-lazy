import request from '../../request';
import { baseUrl } from '../../base-url';
import { logError } from '../../../logger';
import mapResponse from './map-response';

const cache = {};

export default async function getMovieById(movieId) {
  if (cache[movieId]) return cache[movieId];

  const url = `${baseUrl.IMDB}/?r=json&i=${movieId}`;

  try {
    const response = await request({
      url,
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPID_API_HOST,
        'x-rapidapi-key': process.env.RAPID_API_KEY
      }
    });

    const normalizedResponse = mapResponse(response);

    cache[movieId] = normalizedResponse;

    return normalizedResponse;
  } catch (e) {
    logError(e);
  }
}