import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import RestrictedRoute from "./components/RestrictedRoute";

import "./css/main.scss";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" render={() => (<Redirect to="/dashboard"/>)} exact/>
            <Route path="/login" component={Login}/>
            <RestrictedRoute path="/dashboard" authorize={["Client"]} component={Dashboard}/>
            <Route path="/404" component={PageNotFound}/>
            <Route render={() => (<Redirect to="/404"/>)}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("app")
);
