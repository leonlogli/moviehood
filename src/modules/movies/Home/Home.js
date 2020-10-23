import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";

import CollectionMovies from "../CollectionMovies";
import { upcomingMovieSelector } from "../state";
import { profileSelector } from "../../auth";
import { SearchForm } from "../../search";

export default function Home() {
  const upcomingMovie = useSelector(upcomingMovieSelector);
  const { displayName } = useSelector(profileSelector);

  const bannerImage = upcomingMovie?.coverImage;
  const userName = displayName?.substring(0, displayName.indexOf(" "));

  return (
    <div className="Home">
      <div class="hero position-relative">
        <img src={bannerImage} ra alt="Banner" />
        <div className="overlay" />
        <div class="introBox col-sm-6 col-md-6 col-xs-12 position-absolute">
          <h1>{userName ? "Hi " + userName : "Welcome"}.</h1>
          <p>
            Millions of movies, TV shows and people to discover. Explore now.
            <SearchForm open className="mt-4" />
          </p>
        </div>
      </div>
      <CollectionMovies />
    </div>
  );
}

export { Home };
