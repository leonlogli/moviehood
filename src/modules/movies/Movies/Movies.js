import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { movieCollections } from "../../../api";
import { ProgressIndicator } from "../../../components";

import { MovieCard } from "..";
import { useBeforeUnload, useInfiniteScroll } from "../../../hooks";
import { moviesSelector, getMovies } from "../state";

import "./Movies.scss";

const Movies = () => {
  const location = useLocation();
  const collection = location.pathname.substring(8);
  const isValidCollection = Object.keys(movieCollections).includes(collection);

  const dispatch = useDispatch();
  const { movies, page, hasMore, collection: filter } = useSelector(
    moviesSelector
  );

  const loadMoreMovies = () => {
    dispatch(getMovies({ collection, page: page + 1 }));
  };

  useBeforeUnload(() => {
    dispatch(getMovies({ collection, page: 1 }));
  });

  useEffect(() => {
    if (filter !== collection) {
      dispatch(getMovies({ collection, page: 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {hasMore && <ProgressIndicator ref={loaderRef} />}
    </div>
  );
};

export { Movies };
export default Movies;
