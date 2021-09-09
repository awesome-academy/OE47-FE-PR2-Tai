import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "./Home";

function UserPage() {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${match.url}`} component={Home} />
            </Switch>
        </>
    );
}

export default UserPage;
