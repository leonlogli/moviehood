import {
  SEARCH_MOVIES_FAILURE,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
} from "./searchActions";

const initialState = {
  loading: false,
  error: null,
  searchResult: {},
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_MOVIES_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case SEARCH_MOVIES_SUCCESS: {
      const { results, query, page } = payload;
      const reset = state.searchResult.query !== query || page === 1;

      const data = reset
        ? results
        : [...state.searchResult.results, ...results];
      const searchResult = { ...payload, results: data };

      return { ...state, searchResult, loading: false, error: null };
    }
    case SEARCH_MOVIES_FAILURE: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};

export { searchReducer };
export default searchReducer;
