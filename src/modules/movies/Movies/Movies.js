import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { movieCollections, tmdbApi } from "../../../api";
import { ProgressIndicator } from "../../../components";

import { MoviePreviewCard, formatMovie } from "..";
import { useInfiniteScroll } from "../../../hooks";

import "./Movies.scss";

const Movies = () => {
  const [searchResult, setSearchResult] = useState({});
  const location = useLocation();
  const collection = location.pathname.substring(8);

  const movies = searchResult.results || [];
  const isValidCollection = Object.keys(movieCollections).includes(collection);

  const hasMore = searchResult.page
    ? searchResult.page < searchResult.total_results
    : true;

  const loadMoreMovies = () => {
    const { page = 0, results = [] } = searchResult;
    tmdbApi
      .getMovies({ collection, page: page + 1 })
      .then(({ data }) => {
        setSearchResult({
          ...data,
          collection,
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
  }, [collection]);

  const { loaderRef } = useInfiniteScroll({
    hasMore,
    onLoadMore: loadMoreMovies,
  });

  if (!isValidCollection) {
    return <p className="py-4">Sorry, this page cannot be found!</p>;
  }

  return (
    <div className="Movies container my-4">
      <h1 className="mb-3 mt-4 h3">
        {movieCollections[collection] + " movies"}
      </h1>
      {movies.length === 0 && <p>No movie found.</p>}
      <div className="content d-flex flex-wrap justify-content-start">
        {movies.map((movie) => (
          <MoviePreviewCard key={movie.id} movie={movie} />
        ))}
      </div>
      {hasMore && <ProgressIndicator ref={loaderRef} />}
    </div>
  );
};

export { Movies };
export default Movies;
