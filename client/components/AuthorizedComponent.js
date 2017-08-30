import React, {Component} from "react";
import PropTypes from "prop-types";
import lodash from "lodash";

class AuthorizedComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // check if user data available
        const authorizedUser = JSON.parse(sessionStorage.getItem("principle"));
        if (!authorizedUser) {
            // redirect to login if not
            this.props.history.push("/login");
        } else if (lodash.intersection(this.props.authorize, authorizedUser.role).length === 0) {
            this.props.history.push('/not-authorized');
        }

    }
}

AuthorizedComponent.propTypes = {
    authorize: PropTypes.array.isRequired
};


export default AuthorizedComponent;

