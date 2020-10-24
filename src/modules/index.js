import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import { movieDetailsReducer } from "./movieDetails";
import { moviesReducer } from "./movies";

export const rootReducer = combineReducers({
  movieDetails: movieDetailsReducer,
  movies: moviesReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
