import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {ACCESS_TOKEN} from "../constants";


class Logout extends Component {

    componentWillMount() {
        localStorage.removeItem(ACCESS_TOKEN);
    }

    render() {
        return <Redirect to="/login"/>;
    }
}

export default Logout;