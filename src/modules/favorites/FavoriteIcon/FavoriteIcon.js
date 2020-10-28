import React from "react";
import { useSelector } from "react-redux";
import { useFirebase, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutlined } from "@fortawesome/free-regular-svg-icons";
import { favoriteMoviesStateSelector } from "../../favorites";

import "./FavoriteIcon.scss";
import { authSelector } from "../../auth";

const FavoriteIcon = ({ movie, ...other }) => {
  const history = useHistory();
  const auth = useSelector(authSelector);
  const firebase = useFirebase();
  const favoriteMoviesData = useSelector(favoriteMoviesStateSelector);

  const data = { ...favoriteMoviesData };
  const isFavorite = !!data[movie.id];

  const toggleFavorites = (event) => {
    if (event.currentTarget.className?.includes("FavoriteIcon")) {
      event.stopPropagation();

      if (isEmpty(auth)) {
        history.push("/login");
      } else {
        if (!isFavorite) {
          movie.favoriteAt = new Date();
          data[movie.id] = movie;
        } else {
          delete data[movie.id];
        }
      }

      firebase.updateProfile({ favoriteMovies: data });
    }
  };

  return (
    <span {...other} className="FavoriteIcon" onClick={toggleFavorites}>
      <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartOutlined} />
    </span>
  );
};

export { FavoriteIcon };
export default FavoriteIcon;
