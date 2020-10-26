import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import noImg from "../../../assets/images/no-image.jpg";
import { FavoriteIcon } from "../../favorites";
import "./MoviePreviewCard.scss";

const MoviePreviewCard = ({ movie, className = "" }) => {
  const { id, title, coverImage, vote_average, vote_count } = movie;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/movies/${id}`);
  };

  return (
    <div className={"MoviePreviewCard " + className} onClick={handleClick}>
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

export { MoviePreviewCard };
export default MoviePreviewCard;
