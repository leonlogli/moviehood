import {
  GET_MOVIE_DETAILS_FAILURE,
  GET_MOVIE_DETAILS_REQUEST,
  GET_MOVIE_DETAILS_SUCCESS,
} from "./movieDetailsActions";

const initialState = {
  loading: false,
  error: null,
  movieDetails: {},
};

const movieDetailsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIE_DETAILS_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case GET_MOVIE_DETAILS_SUCCESS: {
      const movieDetails = { ...state.movieDetails };
      movieDetails[payload.id] = payload;

      return { ...state, movieDetails, loading: false, error: null };
    }
    case GET_MOVIE_DETAILS_FAILURE: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};

export { movieDetailsReducer };
export default movieDetailsReducer;
