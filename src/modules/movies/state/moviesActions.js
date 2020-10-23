import { tmdbApi } from "../../../api";

/* Action types */

export const GET_MOVIES_REQUEST = "GET_MOVIES_REQUEST";
export const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";

export const GET_COLLECTION_MOVIES_REQUEST = "GET_COLLECTION_MOVIES_REQUEST";
export const GET_COLLECTION_MOVIES_FAILURE = "GET_COLLECTION_MOVIES_FAILURE";
export const GET_COLLECTION_MOVIES_SUCCESS = "GET_COLLECTION_MOVIES_SUCCESS";

/* Actions */

const getMoviesRequest = () => ({
  type: GET_MOVIES_REQUEST,
});

const getMoviesSuccess = (movies) => ({
  type: GET_MOVIES_SUCCESS,
  payload: movies,
});

const getMoviesFailure = (error) => ({
  type: GET_MOVIES_FAILURE,
  error,
});

export function getMovies(options) {
  return (dispatch) => {
    dispatch(getMoviesRequest());

    tmdbApi
      .getMovies(options)
      .then((res) => {
        dispatch(getMoviesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getMoviesFailure(error?.response?.data));
      });
  };
}

const getCollectionMoviesRequest = () => ({
  type: GET_COLLECTION_MOVIES_REQUEST,
});

const getCollectionMoviesSuccess = (movies) => ({
  type: GET_COLLECTION_MOVIES_SUCCESS,
  payload: movies,
});

const getCollectionMoviesFailure = (error) => ({
  type: GET_COLLECTION_MOVIES_FAILURE,
  error,
});

export function getCollectionMovies() {
  return (dispatch) => {
    dispatch(getCollectionMoviesRequest());

    tmdbApi
      .getCollectionMovies()
      .then((res) => {
        console.log(res);
        dispatch(getCollectionMoviesSuccess(res));
      })
      .catch((error) => {
        dispatch(getCollectionMoviesFailure(error?.response?.data));
      });
  };
}
