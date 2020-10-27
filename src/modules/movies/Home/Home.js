import React from "react";
import { useSelector } from "react-redux";

import CollectionMovies from "../CollectionMovies";
import { SearchForm } from "../../search";

import { dailyCoverMovieSelector } from "../state";
import { profileSelector } from "../../auth";

import bg from "../../../assets/images/cover.jpg";
import "./Home.scss";

export default function Home() {
  const dailyCoverMovie = useSelector(dailyCoverMovieSelector);
  const { displayName } = useSelector(profileSelector);

  const bannerImage = dailyCoverMovie?.coverImage || bg;
  const userName = displayName?.substring(0, displayName.indexOf(" "));

  return (
    <div className="Home">
      <div className="hero position-relative">
        <img src={bannerImage} alt="Banner" />
        <div className="overlay" />
        <div className="introBox col-sm-6 col-md-6 col-xs-12 position-absolute">
          <h1>{userName ? "Hi " + userName : "Welcome"}.</h1>
          <div>
            All your favorite movies in one place. Millions of movies to
            discover.
            <SearchForm open className="mt-4" />
          </div>
        </div>
      </div>
      <CollectionMovies />
    </div>
  );
}

export { Home };
