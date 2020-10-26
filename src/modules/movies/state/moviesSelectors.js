import { createSelector } from "reselect";
import { TMDB_IMAGE_BASE_URL, movieCollections } from "../../../api";

const moviesStateSelector = (state) => state.movies;

export const formatMovie = (movie) => ({
  ...movie,
  coverImage:
    movie.backdrop_path &&
    `${TMDB_IMAGE_BASE_URL.BACKDROP}${movie.backdrop_path}`,
  image:
    movie.poster_path && `${TMDB_IMAGE_BASE_URL.POSTER}${movie.poster_path}`,
});

export const moviesSelector = createSelector(
  [moviesStateSelector],
  (moviesData) => {
    const { loading, error, movies } = moviesData;
    const {
      page = 0,
      collection,
      total_results: totalElements,
      total_pages: totalPages,
      results,
    } = movies;

    const data = results?.map(formatMovie) || [];
    const hasMore = page ? page < totalElements : true;

    return {
      loading,
      error,
      movies: data,
      totalElements,
      totalPages,
      page,
      collection,
      hasMore,
    };
  }
);

export const collectionMoviesSelector = createSelector(
  [moviesStateSelector],
  (moviesData) => {
    const { loading, error, moviesByCollection } = moviesData;

    const data = Object.values(moviesByCollection).map((collectionMovies) => {
      const {
        total_results: totalElements,
        total_pages: totalPages,
        results,
        collection,
      } = collectionMovies;

      const data = results.map(formatMovie);

      return {
        movies: data,
        totalElements,
        totalPages,
        collection,
        collectionName: movieCollections[collection],
      };
    });

    return { loading, error, collectionMovies: data };
  }
);

export const upcomingMovieSelector = createSelector(
  [moviesStateSelector],
  (moviesData) => {
    const { moviesByCollection } = moviesData;
    const { results = [] } = moviesByCollection["upcoming"] || {};

    return results[19] && formatMovie(results[19]);
  }
);
