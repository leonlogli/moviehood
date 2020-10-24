import { createSelector } from "reselect";
import { TMDB_IMAGE_BASE_URL, TRAILER_BASE_LINK } from "../../../api";

const movieDetailsStateSelector = (state) => state.movieDetails;

const formatDuration = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? "0" + m : m;
  return `${h}h ${m}m`;
};

export const movieDetailsSelector = createSelector(
  [movieDetailsStateSelector],
  (movieDetailsData) => {
    const { loading, error, movieDetails } = movieDetailsData;

    Object.values(movieDetails).forEach((movie) => {
      movie.coverImage =
        movie.backdrop_path &&
        `${TMDB_IMAGE_BASE_URL.BACKDROP}${movie.backdrop_path}`;
      movie.image =
        movie.poster_path &&
        `${TMDB_IMAGE_BASE_URL.POSTER}${movie.poster_path}`;
      movie.duration = formatDuration(movie.runtime);
      movie.cast = movie.credits.cast
        .map((cast) => ({
          ...cast,
          image:
            cast.profile_path &&
            `${TMDB_IMAGE_BASE_URL.PROFILE}/${cast.profile_path}`,
        }))
        .sort((a, b) => (a.image === null) - (b.image === null));
      movie.video =
        movie.videos.results.length &&
        `${TRAILER_BASE_LINK}${movie.videos.results[0].key}`;
    });

    return { loading, error, movieDetails };
  }
);
