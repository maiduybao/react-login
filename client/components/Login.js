import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import login from "../actions/login"
import "../css/login.scss";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            credentials: {
                email: "",
                password: ""
            },
            isLoading: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const credentials = this.state.credentials;
        credentials[name] = value;
        this.setState({
            credentials
        });
    }

    handleLoginSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.credentials)
            .then(redirect => {
                if (redirect) {
                    const {from} = this.props.location.state || {from: {pathname: "/dashboard"}};
                    this.props.history.push(from);
                }
            });
    }

    render() {
        let {loginError} = this.props;
        return (
            <div className="container">
                <h2>Login to Your Account</h2>
                {loginError ?
                    <p className="alert">{loginError}</p> : null
                }
                <LoginForm email={this.state.credentials.email} password={this.state.credentials.password}
                           onChange={this.handleInputChange} onSubmit={this.handleLoginSubmit}/>
                <div className="pure-form-message-inline">
                    <a href="#">Register</a> - <a href="#">Forgot Password</a>
                </div>
            </div>

        );
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
};

// stateless component
function LoginForm(props) {
    return (
        <form className="pure-form pure-form-aligned" onSubmit={props.onSubmit}>
            <fieldset>
                <div className="pure-control-group">
                    <input id="email" name="email" type="text" placeholder="Email"
                           value={props.email || ""} onChange={props.onChange}/>
                </div>
                <div className="pure-control-group">
                    <input id="password" name="password" type="password" placeholder="Password"
                           value={props.password || ""} onChange={props.onChange}/>
                </div>
                <div className="pure-control-group">
                    <button type="submit" name="login" className="pure-button pure-button-primary">Login</button>
                </div>
            </fieldset>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.login.isLoginPending,
        isLoginSuccess: state.login.isLoginSuccess,
        loginError: state.login.loginError
    };
};


export default connect(mapStateToProps, {login})(Login);