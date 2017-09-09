import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import RestrictedRoute from "./components/RestrictedRoute";
import store from "./store";

import "./css/main.scss";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" render={() => (<Redirect to="/dashboard"/>)} exact/>
                <Route path="/login" component={Login}/>
                <RestrictedRoute path="/dashboard" authorize={["Client"]} component={Dashboard}/>
                <Route path="/404" component={PageNotFound}/>
                <Route render={() => (<Redirect to="/404"/>)}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("app")
);
