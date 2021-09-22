import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Cinema from "./Cinema";
import Home from "./Home";
import MoviePage from "./Movie";
import MovieDetails from "./MovieDetail";
import NewsPage from "./New";
import NewsDetailPage from "./NewDetail";

function UserPage() {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${match.url}`} component={Home} />
                <Route
                    exact
                    path={`${match.url}movies/:state`}
                    component={MoviePage}
                />
                <Route
                    exact
                    path={`${match.url}movies/detail/:slug`}
                    component={MovieDetails}
                />
                <Route
                    exact
                    path={`${match.url}cineplexs`}
                    component={Cinema}
                />
                <Route exact path={`${match.url}news`} component={NewsPage} />
                <Route
                    exact
                    path={`${match.url}news/detail/:id`}
                    component={NewsDetailPage}
                />
            </Switch>
        </>
    );
}

export default UserPage;
