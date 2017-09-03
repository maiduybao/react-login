import {Component} from "react";
import PropTypes from "prop-types";
import intersection from "lodash/intersection";

class AuthorizedComponent extends Component {
    componentWillMount() {
        // check if user data available
        const authorizedUser = JSON.parse(sessionStorage.getItem("principle"));
        console.log("authorizedUser", authorizedUser);
        if (!authorizedUser) {
            // redirect to login if not
            this.props.history.push("/login");
        } else if (intersection(this.props.authorize, authorizedUser.roles).length === 0) {
            this.props.history.push("/unauthorized");
        }

    }
}

AuthorizedComponent.propTypes = {
    authorize: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};


export default AuthorizedComponent;

