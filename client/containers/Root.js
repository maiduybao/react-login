import React from "react";
import PropTypes from "prop-types";
import {Provider} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import Login from "../components/login";
import Logout from "../components/Logout";
import Dashboard from "../components/Dashboard";
import {Error403, Error404, Error500, Error503, Error504} from "../components/errors";
import RestrictedRoute from "../components/RestrictedRoute";

const Root = ({store}) => (
    <Provider store={store}>
            <Switch>
                    <Route path="/" render={() => <Redirect to="/dashboard"/>} exact/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <RestrictedRoute path="/dashboard" authorize={["Client"]} component={Dashboard}/>
                    <Route path="/403" component={Error403}/>
                    <Route path="/404" component={Error404}/>
                    <Route path="/500" component={Error500}/>
                    <Route path="/503" component={Error503}/>
                    <Route path="/504" component={Error504}/>
                    <Route render={() => <Redirect to="/404"/>}/>
            </Switch>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;