"use strict";

import React, {Component} from "react";
import "../css/login.scss";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: {
                name: "",
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
        const user = this.state.user;
        user[name] = value;
        this.setState({
            user
        });
    }

    handleLoginSubmit(event) {
        alert("Login submitted: name=" + this.state.user.name);
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
                            <input id="name" name="name" type="text" placeholder="Username"
                                   value={this.state.user.name || ""} onChange={this.handleInputChange}/>
                        </div>
                        <div className="pure-control-group">
                            <input id="password" name="password" type="password" placeholder="Password"
                                   value={this.state.user.password || ""} onChange={this.handleInputChange}/>
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