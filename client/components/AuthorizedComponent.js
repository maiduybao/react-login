import {Component} from "react";
import PropTypes from "prop-types";
import intersection from "lodash/intersection";

class AuthorizedComponent extends Component {

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

    componentWillMount() {
        if (AuthorizedComponent.isLogin()) {
            if (!this.isAuthorized()) {
                // redirect to unauthorized
                this.props.history.push("/unauthorized");
            }
        } else {
            // redirect to login
            this.props.history.push("/login");
        }
    }
}

AuthorizedComponent.propTypes = {
    authorize: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};


export default AuthorizedComponent;

