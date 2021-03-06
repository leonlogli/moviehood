import { tmdbApi } from "../../../api";

/* Action types */

export const SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST";
export const SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE";
export const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS";

/* Actions */

const searchMoviesRequest = () => ({
  type: SEARCH_MOVIES_REQUEST,
});

const searchMoviesSuccess = (movies) => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload: movies,
});

const searchMoviesFailure = (error) => ({
  type: SEARCH_MOVIES_FAILURE,
  error,
});

/**
 * Search movies.
 *
 * @param {Object} options - options.
 * @param {string} options.query - search query.
 * @param {number} options.page - page number.
 */
export function searchMovies(options) {
  return (dispatch) => {
    dispatch(searchMoviesRequest());

    tmdbApi
      .searchMovies(options)
      .then((res) => {
        res.data.query = options.query;
        dispatch(searchMoviesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(searchMoviesFailure(error?.response?.data));
      });
  };
}
