import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RestrictedRoute from "./components/RestrictedRoute";

import "./css/main.scss";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/login" component={Login} exact={true}/>
            <Route path="/index" component={Login} exact={true}/>
            <RestrictedRoute path="/dashboard" authorize={["Client"]} exact={true} component={Dashboard}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("app")
);
