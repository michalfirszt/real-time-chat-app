import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/home/Home";
import Login from "./views/login/Login";

const Routes = () => {
    let isLoggedIn = sessionStorage.getItem("apiToken");

    return isLoggedIn ? (
        <Switch>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    ) : (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
}

export default Routes;
