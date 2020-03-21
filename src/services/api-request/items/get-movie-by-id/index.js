import request from '../../request';
import { baseUrl } from '../../base-url';
import { logError } from '../../../logger';
import mapResponse from './map-response';

/**
 * Fetch movie data by it's id
 * 
 * @param {String} movieId 
 * 
 * @return {Object}
 *  @prop {String} title
 *  @prop {String} year
 *  @prop {String} released
 *  @prop {String} genre
 *  @prop {String} director
 *  @prop {String} actors
 *  @prop {String} plot
 *  @prop {String} country
 *  @prop {String} posterURL
 *  @prop {Array<Object>} ratings
 */
export default async function getMovieById(movieId) {
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

    return mapResponse(response);
  } catch (e) {
    logError(e);
  }
}