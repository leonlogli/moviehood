import React from "react";
import { Switch, Route } from "react-router-dom";
import ScrollMemory from "react-router-scroll-memory";

import { Layout } from "./layouts";
import { Login, PrivateRoute, Register } from "./modules/auth";
import { Home, Movies } from "./modules/movies";
import { MoviePage } from "./modules/movieDetails";
import { FavoriteMovies } from "./modules/favorites";
import { SearchPage } from "./modules/search";
import { movieCollections } from "./api";

const App = () => {
  return (
    <Layout>
      <ScrollMemory elementID="Layout" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchPage} />
        {Object.keys(movieCollections).map((collection) => (
          <Route
            key={collection}
            path={`/movies/${collection}`}
            component={Movies}
          />
        ))}
        <Route path="/movies/:id" component={MoviePage} />
        <PrivateRoute exact path="/favorites">
          <FavoriteMovies />
        </PrivateRoute>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/favorites">
          <FavoriteMovies />
        </PrivateRoute>
      </Switch>
    </Layout>
  );
};

export default App;
