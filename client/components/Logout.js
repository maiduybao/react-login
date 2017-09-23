import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {ACCESS_TOKEN} from "./common/constants";


class Logout extends Component {

    componentWillMount() {
        sessionStorage.removeItem(ACCESS_TOKEN);
    }

    render() {
        return <Redirect to="/login"/>;
    }
}

export default Logout;