import {Component} from "react";
import PropTypes from "prop-types";
import intersection from "lodash/intersection";

class RoleAwareComponent extends Component {
    constructor(props) {
        super(props);
        this.authorize = [];
    }

    isAuthorized() {
        const principleStr = sessionStorage.getItem("principle");
        if (principleStr) {
            const authorizedUser = JSON.parse(principleStr);
            return intersection(this.props.authorize, authorizedUser.roles).length !== 0;
        }

        return false;
    }

    shouldBeVisible() {
        return this.isAuthorized();
    }
}

RoleAwareComponent.propTypes = {
    authorize: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};

export default RoleAwareComponent;