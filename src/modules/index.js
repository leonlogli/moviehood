import { combineReducers } from "redux";

import { movieDetailsReducer } from "./movieDetails";
import { searchReducer } from "./search";
import { moviesReducer } from "./movies";
import { firebaseReducer } from "react-redux-firebase";

export const rootReducer = combineReducers({
  movieDetails: movieDetailsReducer,
  movies: moviesReducer,
  search: searchReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
