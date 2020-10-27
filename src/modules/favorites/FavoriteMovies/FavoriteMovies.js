import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import { ProgressIndicator } from "../../../components";
import { MovieCard } from "../../movies";
import { favoriteMoviesSelector } from "../state";

import "./FavoriteMovies.scss";

const FavoriteMovies = () => {
  const { favoritesMovies } = useSelector(favoriteMoviesSelector);

  if (!favoritesMovies) return <ProgressIndicator />;

  return (
    <div className="FavoriteMovies container my-4">
      <Helmet>
        <title>Favorite movies - MovieHood</title>
      </Helmet>
      <h1 className="mb-3 mt-4 h3">Your favorite movies</h1>
      {favoritesMovies.length === 0 && (
        <p>You have not any favorite movie saved yet</p>
      )}
      <div className="content d-flex flex-wrap justify-content-start">
        {favoritesMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export { FavoriteMovies };
export default FavoriteMovies;
