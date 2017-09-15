import React, {Component} from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import RegisterLink from "./RegisterLink";


import "../../css/login.scss";

class LoginPage extends Component {
    render() {
        return (
            <div className="container">
                <LoginForm history={this.props.history} location={this.props.location}/>
                <RegisterLink/>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default LoginPage;