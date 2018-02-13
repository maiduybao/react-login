import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import intersection from "lodash/intersection";
import {ACCESS_TOKEN} from "../constants";
import jwtDecode from "jwt-decode";

const logger = console;
const storage = localStorage;

class RestrictedRoute extends Route {

    static isAuthenticated() {
        const token = storage.getItem(ACCESS_TOKEN);
        if (token !== null) {
            try {
                const tokenData = jwtDecode(token);
                // expired in second
                let {exp} = tokenData;
                exp *= 1000;
                const now = new Date();
                if (exp > now.getTime()) {
                    return true;
                }
            } catch (error) {
                logger.error(error);
                storage.removeItem(ACCESS_TOKEN);
            }
        }
        return false;
    }

    isAuthorized() {
        const token = storage.getItem(ACCESS_TOKEN);
        try {
            const tokenData = jwtDecode(token);
            const {user} = tokenData;
            if (user) {
                const {roles} = user;
                return intersection(this.props.authorize, roles).length !== 0;
            }
        } catch (error) {
            logger.error(error);
            storage.removeItem(ACCESS_TOKEN);
        }
        return false;
    }

    render() {
        const {component: AuthorizedComponent, ...rest} = this.props;
        if (RestrictedRoute.isAuthenticated()) {
            if (this.isAuthorized()) {
                return <AuthorizedComponent {...rest} />;
            }
            return <Redirect to={
                {
                    pathname: "/403",
                    state: {from: rest.location}
                }
            }/>;
        }

        return <Redirect to={
            {
                pathname: "/login",
                state: {from: rest.location}
            }
        }/>;

    }

}

RestrictedRoute.propTypes = {
    authorize: PropTypes.array.isRequired
};

export default RestrictedRoute;
