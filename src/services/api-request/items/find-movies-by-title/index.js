import request from '../../request';
import { baseUrl } from '../../base-url';
import normalizeResponse from './normalize-response';
import { logError } from '../../../logger';

/**
 * Find movies by it's title
 *
 * @param {String} movieTitle
 * @param {Number} page
 *
 * @typedef {Object} Movie
 *  @prop {String} id
 *  @prop {String} title
 *  @prop {String} posterURL
 *  @prop {String} year
 *
 * @return {Promise.<Movie[]>}
 */
export default async function findMoviesByTitle (movieTitle, page = 1) {
  const url = `${baseUrl.IMDB_RAPID_API}/?r=json&page=${page}&s=${encodeURIComponent(movieTitle)}`;

  try {
    const response = await request({
      url,
      headers: {
        'x-rapidapi-host': process.env.RAPID_API_HOST,
        'x-rapidapi-key': process.env.RAPID_API_KEY
      }
    });

    return normalizeResponse(response);
  } catch (e) {
    logError(e);
  }
}
