import React, {Component} from "react";
import PropTypes from "prop-types";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                email: "",
                password: ""
            }
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
        this.props.doLogin(this.state.credentials);
    }

    render() {
        const {credentials} = this.state;
        const {isLoginPending, loginError} = this.props;
        return (
            <form id="form-login" onSubmit={this.handleLoginSubmit}>
                <h2 className="page-login__header">Please sign in</h2>
                {loginError ?
                    <div className="alert-danger page-login__alert">
                        <i className="fa fa-exclamation-circle" aria-hidden="true"/> {loginError}
                    </div> : null
                }
                <label htmlFor="email" className="sr-only">Email address</label>
                <input type="email" id="email" name="email" className="form-control page-login__form-control"
                            placeholder="Email address" required minLength="3"
                            onChange={this.handleInputChange} value={credentials.email || ""}
                            title="Enter your email"/>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" id="password" name="password"
                               className="form-control page-login__form-control" placeholder="Password"
                               required onChange={this.handleInputChange} value={credentials.password || ""}
                               minLength="6" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                               title="Enter a password consisting of 6-12 characters with uppercase, lowercase, and number"
                               autoComplete="false"/>
                <button type="submit" className="btn-primary btn-lg btn-block" disabled={isLoginPending}>Sign in</button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    isLoginPending: PropTypes.bool.isRequired,
    loginError: PropTypes.string,
    doLogin: PropTypes.func
};

export default LoginForm;
