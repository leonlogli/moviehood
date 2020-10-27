import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import noImg from "../../../assets/images/no-image.jpg";
import { FavoriteIcon } from "../../favorites";
import "./MovieCard.scss";

const MovieCard = ({ movie, className = "" }) => {
  const { id, title, image, vote_average, release_date } = movie;
  const history = useHistory();

  const date = new Date(release_date).toLocaleString(undefined, {
    month: "short",
    year: "numeric",
    day: "numeric",
  });

  const handleClick = () => {
    history.push(`/movies/${id}`);
  };

  return (
    <div className={"MovieCard " + className} onClick={handleClick}>
      <div className="innerBox">
        <img src={image || noImg} alt="movie" />
        <div className="textBox">
          <div className="flex-grow-1">
            <h2>{title}</h2>
            <span className="subTitle">
              {date}
              <FontAwesomeIcon className="star" icon={faStar} />
              {vote_average / 2}
            </span>
          </div>
          <FavoriteIcon movie={movie} />
        </div>
      </div>
    </div>
  );
};

export { MovieCard };
export default MovieCard;
