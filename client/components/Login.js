'use strict';
import React, {Component} from 'react';
import '../css/login.scss';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <h2>Login to Your Account</h2>
                <form className="pure-form pure-form-aligned">
                    <fieldset>
                        <div className="pure-control-group">
                            <input id="name" type="text" placeholder="Username" required/>
                        </div>
                        <div className="pure-control-group">
                            <input id="password" type="password" placeholder="Password" required/>
                        </div>
                        <div className="pure-control-group">
                            <button type="submit" name="login" className="pure-button pure-button-primary">Login</button>
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