import React from "react";
import { Route } from "react-router-dom";

function UserLayout({ component: Component, ...props }) {
    return (
        <Route
            {...props}
            render={(routerProps) => (
                <>
                    <Component {...routerProps} />
                </>
            )}
        />
    );
}
export default UserLayout;
