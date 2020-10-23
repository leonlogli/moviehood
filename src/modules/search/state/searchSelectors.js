import { createSelector } from "reselect";
import { TMDB_IMAGE_BASE_URL } from "../../../api";

const searchResultStateSelector = (state) => state.search;

export const searchResultSelector = createSelector(
  [searchResultStateSelector],
  (searchResultData, favoriteMovieIds) => {
    const { loading, error, searchResult } = searchResultData;
    const {
      page,
      total_results: totalElements,
      total_pages: totalPages,
      results,
    } = searchResult;

    const data = results.map((movie) => ({
      ...movie,
      coverImage:
        movie.backdrop_path &&
        `${TMDB_IMAGE_BASE_URL.BACKDROP}${movie.backdrop_path}`,
      image:
        movie.poster_path &&
        `${TMDB_IMAGE_BASE_URL.POSTER}${movie.poster_path}`,
    }));

    return {
      loading,
      error,
      searchResult: data,
      totalElements,
      totalPages,
      page,
    };
  }
);
