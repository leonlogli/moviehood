import { createSelector } from "reselect";
import { TMDB_IMAGE_BASE_URL } from "../../../api";

export const favoriteMoviesStateSelector = (state) =>
  state.firebase.profile.favoriteMovies;

export const favoriteMoviesSelector = createSelector(
  [favoriteMoviesStateSelector],
  (favoriteMoviesData) => {
    const data = Object.values(favoriteMoviesData || {}).map((movie) => ({
      ...movie,
      coverImage:
        movie.poster_path &&
        `${TMDB_IMAGE_BASE_URL.BACKDROP}${movie.backdrop_path}`,
      image:
        movie.poster_path &&
        `${TMDB_IMAGE_BASE_URL.POSTER}${movie.poster_path}`,
    }));

    return { favoritesMovies: data };
  }
);
