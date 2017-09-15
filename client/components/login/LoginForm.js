import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import login from "../../actions/login";
import {Button} from "react-bootstrap";


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {},
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
        this.props.login(this.state.credentials)
        .then((redirect) => {
            if (redirect) {
                const {from} = this.props.location.state || {from: {pathname: "/dashboard"}};
                this.props.history.push(from);
            }
        });
    }

    render() {
        const {credentials} = this.state;
        const {isLoginPending, loginError} = this.props;
        return (
            <form className="form-signin" onSubmit={this.handleLoginSubmit}>
                <h2 className="form-signin-heading">Please sign in</h2>
                {loginError ?
                    <div className="alert-danger">{loginError}</div> : null
                }
                <label htmlFor="email" className="sr-only">Email address</label>
                <input type="email" id="email" name="email" className="form-control"
                       placeholder="Email address" required="true" minLength="3"
                       autoFocus onChange={this.handleInputChange} value={credentials.email || ""}/>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                       required="true" onChange={this.handleInputChange} value={credentials.password || ""}
                       minLength="6" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                       title="Enter a password consisting of 6-12 characters with uppercase, lowercase, and number"
                       autoComplete="false"/>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <Button type="submit" disabled={isLoginPending} block={true} bsSize="large"
                        bsStyle="primary">Sign in
                </Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    login: PropTypes.func,
    isLoginPending: PropTypes.bool,
    isLoginSuccess: PropTypes.bool,
    loginError: PropTypes.string
};

const mapStateToProps = (state) => ({
    isLoginPending: state.login.isLoginPending,
    isLoginSuccess: state.login.isLoginSuccess,
    loginError: state.login.loginError
});

export default connect(mapStateToProps, {login})(LoginForm);
