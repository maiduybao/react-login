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
        console.log("RestrictedRoute", this.props);
        if (RestrictedRoute.isLogin()) {
            if (this.isAuthorized()) {
                if (Component) {
                    return (
                        <div>
                            <Component {...rest} />
                            {this.props.children}
                        </div>
                    )
                }
                return (
                    <div>
                        {this.props.children}
                    </div>
                );
            } else {
                return (<Redirect to="/unauthorized"/>);
            }
        }
        return (<Redirect to="/login"/>);

    }

}

RestrictedRoute.propTypes = {
    authorize: PropTypes.array.isRequired
};


export default RestrictedRoute;
