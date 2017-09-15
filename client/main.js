import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import Dashboard from "./components/Dashboard";
import {Error403, Error404, Error500, Error503, Error504} from "./components/errors";
import RestrictedRoute from "./components/RestrictedRoute";
import Logout from "./components/Logout";

import store from "./store";

import "./css/main.scss";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" render={() => <Redirect to="/dashboard"/>} exact/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/logout" component={Logout}/>
                <RestrictedRoute path="/dashboard" authorize={["Client"]} component={Dashboard}/>
                <Route path="/403" component={Error403}/>
                <Route path="/404" component={Error404}/>
                <Route path="/500" component={Error500}/>
                <Route path="/503" component={Error503}/>
                <Route path="/504" component={Error504}/>
                <Route render={() => <Redirect to="/404"/>}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("app")
);
