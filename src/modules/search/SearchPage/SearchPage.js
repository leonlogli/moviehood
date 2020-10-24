/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import useInfiniteScroll from "react-infinite-scroll-hook";
import queryString from "query-string";

import { tmdbApi } from "../../../api";
import { ProgressIndicator } from "../../../components";

import { MovieCard, formatMovie } from "../../movies";
import { useInfiniteScroll } from "../../../hooks";

import "./SearchPage.scss";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState({});
  const location = useLocation();

  const { query } = queryString.parse(location.search);
  const movies = searchResult.results || [];

  const hasMore = searchResult.page
    ? searchResult.page < searchResult.total_results
    : true;

  const loading = query && hasMore;

  const loadMoreMovies = () => {
    const { page = 0, results = [] } = searchResult;
    tmdbApi
      .searchMovies({ query, page: page + 1 })
      .then(({ data }) => {
        setSearchResult({
          ...data,
          query,
          results: [...results, ...data.results.map(formatMovie)],
        });
      })
      .catch((e) => {
        console.log(e);
        setSearchResult({});
      });
  };

  useEffect(() => {
    setSearchResult({});
  }, [query]);

  const { loaderRef } = useInfiniteScroll({
    hasMore,
    onLoadMore: loadMoreMovies,
  });

  return (
    <div className="SearchPage container my-4">
      <h1 className="mb-3 mt-4 h3">Search results</h1>
      {!loading && movies.length === 0 && (
        <p>There are no movies that matched your query.</p>
      )}
      <div className="content d-flex flex-wrap justify-content-start">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <ProgressIndicator ref={loaderRef} />}
    </div>
  );
};

export { SearchPage };
export default SearchPage;
