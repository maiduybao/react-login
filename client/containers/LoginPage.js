import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import login from "../actions/login";
import LoginForm from "../components/login/LoginForm";
import RegisterLink from "../components/login/RegisterLink";
import "../css/login.scss";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
    }

    doLogin(credentials) {
        this.props.login(credentials)
            .then((isSuccess) => {
                if (isSuccess) {
                    const {from} = this.props.location.state || {from: {pathname: "/dashboard"}};
                    this.props.history.push(from);
                }
            });
    }

    render() {
        return (
            <div className="container">
                <div className="page-login">
                    <LoginForm doLogin={this.doLogin}
                               loginError={this.props.loginError}
                               isLoginPending={this.props.isLoginPending}/>
                    <RegisterLink/>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    isLoginPending: PropTypes.bool.isRequired,
    loginError: PropTypes.string
};


const mapStateToProps = (state) => ({
    isLoginPending: state.login.isLoginPending,
    isLoginSuccess: state.login.isLoginSuccess,
    loginError: state.login.loginError
});

export default withRouter(connect(mapStateToProps, {login})(LoginPage));