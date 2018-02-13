import React from "react";
import PropTypes from "prop-types";
import {Provider} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import {Error403, Error404, Error500, Error503, Error504} from "./errors/index";
import RestrictedRoute from "./RestrictedRoute";
import LoginPage from "../containers/LoginPage";

const Root = ({store}) => (
    <Provider store={store}>
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
                    <Route component={Error404}/>
            </Switch>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;