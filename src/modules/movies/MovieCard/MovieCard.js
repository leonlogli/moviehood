import React from "react";
import { useHistory } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FavoriteIcon } from "../../favorites";

import "./MovieCard.scss";
import noImg from "../../../assets/images/no-image.jpg";

const MovieCard = ({ movie, className = "" }) => {
  const { id, title, coverImage, vote_average, vote_count } = movie;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/movies/${id}`);
  };

  return (
    <div className={"MovieCard " + className} onClick={handleClick}>
      <img src={coverImage || noImg} alt="movie" />
      <div className="textBox">
        <h2>{title}</h2>
        <span>
          <FontAwesomeIcon icon={faStar} />
          {vote_average + "/10 (" + vote_count + ")"}
        </span>
      </div>
      <FavoriteIcon movie={movie} />
    </div>
  );
};

export { MovieCard };
export default MovieCard;
