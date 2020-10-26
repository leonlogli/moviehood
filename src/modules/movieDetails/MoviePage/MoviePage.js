import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";

import MoviePageHeader from "../MoviePageHeader";

import { getMovieDetails, movieDetailsSelector } from "../state";
import { ProgressIndicator } from "../../../components";

import bg from "./bg.jpg";
import "./MoviePage.scss";

export default function MoviePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { error, loading, movieDetails } = useSelector(movieDetailsSelector);
  const movie = movieDetails[id];
  const cover = movie?.coverImage || bg;

  useEffect(() => {
    if (!movie) {
      dispatch(getMovieDetails(id));
    }
  }, [dispatch, id, movie]);

  if (error) return <div>Oups !!! something ent wrong</div>;

  if (loading || !movie) return <ProgressIndicator />;

  return (
    <div
      className="MoviePage container-fluid py-4 py-md-5"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${cover})`,
      }}
    >
      <div className="container">
        <MoviePageHeader movie={movie} className="overlay" />
        {!!movie?.video && (
          <div className="row overlay">
            <div className="col-12  pt-4 pb-2 mt-1">
              <h5>Watch the trailer</h5>
            </div>
            <div className="col-12 pb-4">
              <ReactPlayer width="100%" url={movie.video} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { MoviePage };
