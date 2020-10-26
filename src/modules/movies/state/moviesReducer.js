import {
  GET_COLLECTION_MOVIES_FAILURE,
  GET_COLLECTION_MOVIES_REQUEST,
  GET_COLLECTION_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
} from "./moviesActions";

const initialState = {
  loading: false,
  error: null,
  movies: {},
  moviesByCollection: {},
};

const moviesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIES_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case GET_MOVIES_SUCCESS: {
      const { results, collection, page } = payload;
      const reset = state.movies.collection !== collection || page === 1;

      const data = reset ? results : [...state.movies.results, ...results];
      const movies = { ...payload, results: data };

      return { ...state, movies, loading: false, error: null };
    }
    case GET_MOVIES_FAILURE: {
      return { ...state, loading: false, error: payload };
    }

    case GET_COLLECTION_MOVIES_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case GET_COLLECTION_MOVIES_SUCCESS: {
      const moviesByCollection = { ...state.moviesByCollection };

      payload.forEach((collectionMovies) => {
        if (collectionMovies) {
          moviesByCollection[collectionMovies.collection] = collectionMovies;
        }
      });
      return { ...state, moviesByCollection, loading: false, error: null };
    }
    case GET_COLLECTION_MOVIES_FAILURE: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};

export { moviesReducer };
export default moviesReducer;
