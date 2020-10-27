import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";

import MoviePageHeader from "../MoviePageHeader";
import { ProgressIndicator } from "../../../components";
import { getMovieDetails, movieDetailsSelector } from "../state";

import bg from "../../../assets/images/cover.jpg";
import "./MoviePage.scss";
import { Helmet } from "react-helmet";

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

  if (loading || !movie) return <ProgressIndicator className="h-100" />;

  return (
    <div
      className="MoviePage container-fluid py-4 py-md-5"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${cover})`,
      }}
    >
      <Helmet>
        <title>{movie.title + " - MovieHood"}</title>
      </Helmet>
      <div className="container">
        <MoviePageHeader movie={movie} className="overlay pb-4" />
        {!!movie?.video && (
          <div className="row overlay">
            <div className="col-12 pb-2 mt-1">
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
