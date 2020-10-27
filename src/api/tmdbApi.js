import apiClient from "./apiClient";

export const movieCollections = {
  popular: "Popular",
  top_rated: "Top rated",
  now_playing: "Now playing",
  upcoming: "Upcoming",
};

export const TRAILER_BASE_LINK = "https://www.youtube.com/watch?v=";

export const TMDB_IMAGE_BASE_URL = {
  PROFILE: "https://image.tmdb.org/t/p/w185",
  POSTER: "https://image.tmdb.org/t/p/w780",
  BACKDROP: "https://image.tmdb.org/t/p/w1280",
  original: "https://image.tmdb.org/t/p/original",
};

/**
 * Get movies from tmdb.
 *
 * @param {Object} options - options.
 * @param {string} [options.collection="popular"] - movie collection.
 * @param {number} [options.page=1] - page number.
 */
const getMovies = (options) => {
  const { collection = "popular", page = 1 } = options;

  return apiClient
    .get(`/movie/${collection}`, { params: { page } })
    .then((res) => {
      res.data.collection = collection;

      return res;
    });
};

/**
 * Get predefined collections movies
 */
const getCollectionMovies = () => {
  return Promise.all(
    Object.keys(movieCollections).map((collection) =>
      getMovies({ collection })
        .then((res) => res.data)
        .catch((e) => {
          console.log(e);
          return {};
        })
    )
  );
};

/**
 * Get single movie with additional data (credits, videos).
 * @param {string | number} id - id.
 */
const getMovie = (id) => {
  return apiClient.get(`/movie/${id}`, {
    params: { append_to_response: "videos,credits" },
  });
};

/**
 * Search movies.
 *
 * @param {Object} options - options.
 * @param {string} options.query - search query.
 * @param {number} options.page - page number.
 */
const searchMovies = (options) => {
  const { query, page = 1 } = options;

  return apiClient.get(`/search/movie`, { params: { query, page } });
};

export const tmdbApi = {
  getMovies,
  searchMovies,
  getMovie,
  getCollectionMovies,
};
export default tmdbApi;
