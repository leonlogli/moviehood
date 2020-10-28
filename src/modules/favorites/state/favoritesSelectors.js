import { createSelector } from "reselect";
import { formatMovie } from "../../movies";

export const favoriteMoviesStateSelector = (state) =>
  state.firebase.profile.favoriteMovies;

export const favoriteMoviesSelector = createSelector(
  [favoriteMoviesStateSelector],
  (favoriteMoviesData) => {
    const data =
      favoriteMoviesData &&
      Object.values(favoriteMoviesData)
        .map(formatMovie)
        .sort((a, b) => new Date(b.favoriteAt) - new Date(a.favoriteAt));

    return { favoritesMovies: data };
  }
);
