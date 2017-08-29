import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import "./css/main.scss";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/login" component={Login} exact={true}/>
            <Route path="/index" component={Login} exact={true}/>
            <Route authorize={["admin"]} component={Dashboard} path="/dashboard" exact={true}/>
        </div>
    </BrowserRouter>,
    document.getElementById("app")
);
