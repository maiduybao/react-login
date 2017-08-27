"use strict";

import React, {Component} from "react";
import "../css/login.scss";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            credentials: {
                user: "",
                password: ""
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    /*
   componentWillUnmount() {

   }
   */


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
        alert("Login submitted: user=" + this.state.credentials.user);
        const errors = {summary: "some error"};
        this.setState({
            errors
        });
        event.preventDefault();
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
                            <input id="user" name="user" type="text" placeholder="Username"
                                   value={this.state.credentials.user || ""} onChange={this.handleInputChange}/>
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

export default Login;