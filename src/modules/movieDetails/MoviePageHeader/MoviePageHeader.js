import React from "react";
import { Image } from "react-bootstrap";
import { ScrollView } from "../../../components";
import { FavoriteIcon } from "../../favorites";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import avatar from "./avatar.png";
import noImg from "../../../assets/images/no-image.jpg";

import "./MoviePageHeader.scss";

export const MoviePageHeader = ({ className, movie, ...other }) => {
  return (
    <div {...other} className={"MoviePageHeader row " + className || ""}>
      <div className="col-md-4 mt-3">
        <img
          src={movie.image || noImg}
          alt={movie.title}
          className="movieImg"
        />
      </div>
      <div className="deatailsPane col-md-8 pt-3">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <h4>{movie.title}</h4>
            <div className="d-flex align-content-center infobox">
              <span>{movie.release_date}</span>
              <span className="info">
                {movie.genres.map((g) => g.name).join(", ")}
              </span>
              <span className="info">{movie.duration}</span>
            </div>
          </div>
          <FavoriteIcon movie={movie} />
        </div>
        <span className="rating d-inline-block bg-primary">
          <FontAwesomeIcon icon={faStar} />
          {movie.vote_average + "/10 (" + movie.vote_count + ")"}
        </span>
        <p>{movie.overview}</p>
        <h5 className="pb-2">Cast</h5>

        <ScrollView>
          {movie.cast.map((author) => (
            <div key={author.id} className="cast bg-dark">
              <Image src={author.image || avatar} thumbnail />
              <p className="m-0 px-2 pt-2">{author.name}</p>
              <p className="m-0 px-2 pb-2">{author.character}</p>
            </div>
          ))}
        </ScrollView>
      </div>
    </div>
  );
};

export default MoviePageHeader;
