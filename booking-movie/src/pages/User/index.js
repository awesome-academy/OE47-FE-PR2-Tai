import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "./Home";
import MoviePage from "./Movie";

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
            </Switch>
        </>
    );
}

export default UserPage;
