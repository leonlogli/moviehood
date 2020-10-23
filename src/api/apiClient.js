import axios from "axios";

const apiClient = axios.create({
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: "en-US",
  },
});

export { apiClient };

export default apiClient;
