import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import "./css/main.scss";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/login" component={Login} exact={true}/>
            <Route path="/index" component={Login} exact={true}/>
            <Route path="/dashboard" exact={true} render={(props) =>
                <Dashboard {...props} authorize={["Client"]}/>
            }/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("app")
);
