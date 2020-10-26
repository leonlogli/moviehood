import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import { movieDetailsReducer } from "./movieDetails";
import { moviesReducer } from "./movies";
import { searchReducer } from "./search";

export const rootReducer = combineReducers({
  movieDetails: movieDetailsReducer,
  movies: moviesReducer,
  firebase: firebaseReducer,
  search: searchReducer,
});

export default rootReducer;
