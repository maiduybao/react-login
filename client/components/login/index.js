import React, {Component} from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";


import "../../css/login.scss";

class Login extends Component {
    render() {
        return (
            <div className="container">
                <LoginForm history={this.props.history} location={this.props.location}/>
            </div>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default Login;