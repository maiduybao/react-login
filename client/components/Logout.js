import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class Logout extends Component {

    componentWillMount() {
        sessionStorage.removeItem("principle");
        sessionStorage.removeItem("access_token");
    }

    render() {
        return <Redirect to="/login"/>;
    }
}

export default Logout;