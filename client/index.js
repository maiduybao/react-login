import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import Root from "./components/Root";
import store from "./store";
import "./styles.scss";

render(
    <Router>
        <Root store={store}/>
    </Router>,
    document.getElementById("app-root")
);
