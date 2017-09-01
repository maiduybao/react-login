import React, {Component} from "react";
import PropTypes from "prop-types";
import request from "superagent";
import "../css/login.scss";

const API_URI = "https://localhost:8443/api";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            credentials: {
                email: "",
                password: ""
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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
        request
            .post(API_URI + "/authenticate")
            .send({
                email: this.state.credentials.email,
                password: this.state.credentials.password
            })
            .set("Accept", "application/json")
            .end((error, response) => {
                if (error) {
                    const errors = {summary: error.message};
                    this.setState({
                        errors
                    });
                } else if (response.body.success === false) {
                    const errors = {summary: response.body.message};
                    this.setState({
                        errors
                    });
                } else {
                    const {token, user} = response.body.payload;
                    sessionStorage.setItem("access_token", token);
                    sessionStorage.setItem("principle", JSON.stringify(user));
                    this.props.history.push("/dashboard");
                }

            });
    }

    render() {
        return (
            <div className="container">
                <h2>Login to Your Account</h2>
                {this.state.errors.summary ?
                    <p className="alert">{this.state.errors.summary}</p> : null
                }
                <form className="pure-form pure-form-aligned" onSubmit={(event) => this.handleLoginSubmit(event)}>
                    <fieldset>
                        <div className="pure-control-group">
                            <input id="email" name="email" type="text" placeholder="Email"
                                   value={this.state.credentials.email || ""} onChange={this.handleInputChange}/>
                        </div>
                        <div className="pure-control-group">
                            <input id="password" name="password" type="password" placeholder="Password"
                                   value={this.state.credentials.password || ""} onChange={this.handleInputChange}/>
                        </div>
                        <div className="pure-control-group">
                            <button type="submit" name="login" className="pure-button pure-button-primary">Login
                            </button>
                        </div>
                    </fieldset>
                </form>
                <div className="pure-form-message-inline">
                    <a href="#">Register</a> - <a href="#">Forgot Password</a>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired
};

export default Login;