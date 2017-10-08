import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import intersection from "lodash/intersection";
import {ACCESS_TOKEN} from "./constants";
import jwtDecode from "jwt-decode";

const logger = console;

class RestrictedRoute extends Route {

    static isLogin() {
        const token = sessionStorage.getItem(ACCESS_TOKEN);
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
                sessionStorage.removeItem(ACCESS_TOKEN);
            }
        }
        return false;
    }

    isAuthorized() {
        const token = sessionStorage.getItem(ACCESS_TOKEN);
        try {
            const tokenData = jwtDecode(token);
            const {user} = tokenData;
            if (user) {
                const {roles} = user;
                return intersection(this.props.authorize, roles).length !== 0;
            }
        } catch (error) {
            logger.error(error);
            sessionStorage.removeItem(ACCESS_TOKEN);
        }
        return false;
    }

    render() {
        const {component: AuthorizedComponent, ...rest} = this.props;
        if (RestrictedRoute.isLogin()) {
            if (this.isAuthorized()) {
                return <AuthorizedComponent {...rest} />;
            }
            return <Redirect to="/403"/>;
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
