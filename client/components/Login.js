import React, {Component} from "react";
import request from "superagent";
import "../css/login.scss";

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
        alert("handleLoginSubmit");
        event.preventDefault();
        request
            .post("//localhost:3000/api/authenticate")
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
                } else {
                    alert(response.json());
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

export default Login;