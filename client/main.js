import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./components/Login";
import "./css/main.scss";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
        </div>
    </BrowserRouter>,
    document.getElementById("app")
);
