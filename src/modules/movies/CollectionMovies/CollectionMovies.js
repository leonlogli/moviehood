import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ProgressIndicator, ScrollView } from "../../../components";
import MovieCard from "../MovieCard";
import { collectionMoviesSelector, getCollectionMovies } from "../state";

import "./CollectionMovies.scss";

const CollectionMovies = () => {
  const dispatch = useDispatch();

  const { error, loading, collectionMovies } = useSelector(
    collectionMoviesSelector
  );
  const hasCollectionMovies = collectionMovies && collectionMovies.length > 0;

  useEffect(() => {
    if (!hasCollectionMovies) {
      dispatch(getCollectionMovies());
    }
  }, [dispatch, hasCollectionMovies]);

  if (error) return <div>Oups !!! something ent wrong</div>;

  if (loading || !hasCollectionMovies) return <ProgressIndicator />;

  return (
    <div className="CollectionMovies">
      {collectionMovies.map((moviesData) => (
        <div className="CollectionRow" key={moviesData.collectionName}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-3 mt-4">{moviesData.collectionName}</h1>
            <Link className="view-all" to={"/movies/" + moviesData.collection}>
              View all
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>
          <ScrollView>
            {moviesData.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ScrollView>
        </div>
      ))}
    </div>
  );
};

export { CollectionMovies };
export default CollectionMovies;
