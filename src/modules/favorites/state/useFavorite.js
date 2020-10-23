import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { favoriteMoviesStateSelector } from "../state";

export default function useFavorite(movie) {
  const firebase = useFirebase();
  const favoriteMoviesData = useSelector(favoriteMoviesStateSelector);

  function toggleFavorites() {
    const data = { ...favoriteMoviesData };

    if (movie.isFavorite) {
      data[movie.id] = movie;
    } else {
      delete data[movie.id];
    }

    return firebase.updateProfile({ favoriteMovies: data });
  }

  return { toggleFavorites };
}

export { useFavorite };
