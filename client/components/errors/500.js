import React, {Component} from "react";
import "../../css/errors.scss";


class Error500 extends Component {
    render() {
        return (
            <div className="error-container">
                <div>The server is returning an internal error</div>
                <h1>
                    <i className="fa fa-fire" aria-hidden="true"/>
                    <span> 500 Internal Server Error</span>
                </h1>
            </div>
        );
    }
}

export default Error500;