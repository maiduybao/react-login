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

            <div>
                {loginError ?
                    <div className="alert">{loginError}</div> : null
                }
                <form className="pure-form pure-form-aligned" onSubmit={this.handleLoginSubmit}>
                    <fieldset>
                        <div className="pure-control-group">
                            <input id="email" name="email" type="text" placeholder="Email"
                                   value={credentials.email || ""} onChange={this.handleInputChange}/>
                            <i className="fa fa-envelope-o" aria-hidden="true"/>
                        </div>
                        <div className="pure-control-group">
                            <input id="password" name="password" type="password" placeholder="Password"
                                   value={credentials.password || ""} onChange={this.handleInputChange}/>
                            <i className="fa fa-key" aria-hidden="true"/>
                        </div>
                        <div className="pure-control-group">
                            <Button bsStyle="primary" type="submit" disabled={isLoginPending}>Login</Button>
                        </div>
                    </fieldset>
                </form>
            </div>
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
