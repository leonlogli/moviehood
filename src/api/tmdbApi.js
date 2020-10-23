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
 * @param {Object} options - options.
 * @param {string} options.collection - movie collection.
 * @param {number} options.page - page number.
 */
const getMovies = (options) => {
  const { collection = "popular", page = 1 } = options;

  return apiClient.get(`/movie/${collection}`, { params: { page } });
};

/**
 * Get predefined collections movies
 */
const getCollectionMovies = () => {
  return Promise.all(
    Object.keys(movieCollections).map((collection) =>
      getMovies({ collection })
        .then((res) => {
          console.log(res.data);
          return { ...res.data, collection };
        })
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
 * Get a list of similar movies to the specified one
 * @param {Object} options - options.
 * @param {string} options.id - movie id.
 * @param {number} options.page - page number.
 */
const getSimilarMovies = (options) => {
  const { id, page = 1 } = options;

  return apiClient.get(`/movie/${id}/similar`, { params: { page } });
};

/**
 * Search movies.
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
  getSimilarMovies,
};
export default tmdbApi;
