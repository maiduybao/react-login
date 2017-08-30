import React, {Component} from "react";
import lodash from "lodash";

class RoleAwareComponent extends Component {
    constructor(props) {
        super(props);
        this.authorize = [];
    }

    shouldBeVisible() {
        const authorizedUser = JSON.parse(sessionStorage.getItem("principle"));
        if (authorizedUser) {
            return lodash.intersection(this.props.authorize, authorizedUser.role).length === 0;
        }
        return false;
    }
}

export default RoleAwareComponent;