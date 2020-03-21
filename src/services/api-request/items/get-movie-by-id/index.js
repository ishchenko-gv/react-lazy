import request from '../../request';
import { baseUrl } from '../../base-url';
import mapResponse from './map-response';
import { logError } from '../../../logger';

/**
 * Fetch movie data by it's id
 *
 * @param {String} movieId
 *
 * @typedef {Object} Rating
 *  @prop {String} source
 *  @prop {String} value
 *
 * @typedef {Object} Movie
 *  @prop {String} title
 *  @prop {String} year
 *  @prop {String} released
 *  @prop {String} genre
 *  @prop {String} director
 *  @prop {String} actors
 *  @prop {String} plot
 *  @prop {String} country
 *  @prop {String} posterURL
 *  @prop {Array<Rating>} ratings
 *
 * @return {Movie}
 */
export default async function getMovieById(movieId) {
  const url = `${baseUrl.IMDB_RAPID_API}/?r=json&i=${movieId}`;

  try {
    const response = await request({
      url,
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPID_API_HOST,
        'x-rapidapi-key': process.env.RAPID_API_KEY
      }
    });

    return mapResponse(response);
  } catch (e) {
    logError(e);
  }
}
