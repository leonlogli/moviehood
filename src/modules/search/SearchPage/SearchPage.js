import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";

import { ProgressIndicator } from "../../../components";

import { MoviePreviewCard } from "../../movies";
import { useInfiniteScroll } from "../../../hooks";

import { searchMovies, searchResultSelector } from "../state";

import "./SearchPage.scss";

const SearchPage = () => {
  const location = useLocation();
  const { query } = queryString.parse(location.search);

  const dispatch = useDispatch();
  const { searchResult, page, hasMore } = useSelector(searchResultSelector);
  const loading = query && hasMore;

  const loadMoreMovies = () => {
    dispatch(searchMovies({ query, page: page + 1 }));
  };

  useEffect(() => {
    if (page === 0) {
      dispatch(searchMovies({ query, page: 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { loaderRef } = useInfiniteScroll({
    hasMore,
    onLoadMore: loadMoreMovies,
    initialLoad: false,
    unlock: page >= 1, // or searchResult.length >= 20
  });

  return (
    <div className="SearchPage container my-4">
      <h1 className="mb-3 mt-4 h3">Search results</h1>
      {!loading && searchResult.length === 0 && (
        <p>There are no movies that matched your query.</p>
      )}
      <div className="content d-flex flex-wrap justify-content-start">
        {searchResult.map((movie) => (
          <MoviePreviewCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <ProgressIndicator ref={loaderRef} />}
    </div>
  );
};

export { SearchPage };
export default SearchPage;
