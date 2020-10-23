import { tmdbApi } from "../../../api";

/* Action types */

export const GET_MOVIE_DETAILS_REQUEST = "GET_MOVIE_DETAILS_REQUEST";
export const GET_MOVIE_DETAILS_FAILURE = "GET_MOVIE_DETAILS_FAILURE";
export const GET_MOVIE_DETAILS_SUCCESS = "GET_MOVIE_DETAILS_SUCCESS";

/* Actions */

const getMovieDetailsRequest = () => ({
  type: GET_MOVIE_DETAILS_REQUEST,
});

const getMovieDetailsSuccess = (movie) => ({
  type: GET_MOVIE_DETAILS_SUCCESS,
  payload: movie,
});

const getMovieDetailsFailure = (error) => ({
  type: GET_MOVIE_DETAILS_FAILURE,
  error,
});

export function getMovieDetails(id) {
  return (dispatch) => {
    dispatch(getMovieDetailsRequest());

    tmdbApi
      .getMovie(id)
      .then((res) => {
        dispatch(getMovieDetailsSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getMovieDetailsFailure(error?.response?.data));
      });
  };
}
