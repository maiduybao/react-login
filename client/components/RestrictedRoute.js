import React, {Component} from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import intersection from "lodash/intersection";

class RestrictedRoute extends Route {

    static isLogin() {
        const token = sessionStorage.getItem("access_token");
        return token !== null;
    }

    isAuthorized() {
        const principleStr = sessionStorage.getItem("principle");
        if (principleStr) {
            const authorizedUser = JSON.parse(principleStr);
            return intersection(this.props.authorize, authorizedUser.roles).length !== 0;
        }
        return false;
    }

    render() {
        const {component: Component, ...rest} = this.props;
        if (RestrictedRoute.isLogin()) {
            if (this.isAuthorized()) {
                return (<Component {...rest} />);
            } else {
                return (<Redirect to="/unauthorized"/>);
            }
        }
        return (<Redirect to={
            {
                pathname: "/login",
                state: {from: rest.location}
            }
        }/>);

    }

}

RestrictedRoute.propTypes = {
    authorize: PropTypes.array.isRequired
};


export default RestrictedRoute;
