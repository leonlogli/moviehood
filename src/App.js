import React from "react";
import { Layout } from "./layouts";
import { Switch, Route } from "react-router-dom";

import { Login, PrivateRoute, Register } from "./modules/auth";
import { Home } from "./modules/movies";
import { MoviePage } from "./modules/movieDetails";
import { FavoriteMovies } from "./modules/favorites";
import { SearchPage } from "./modules/search";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <PrivateRoute exact path="/favorites">
          <FavoriteMovies />
        </PrivateRoute>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Layout>
  );
};

export default App;
