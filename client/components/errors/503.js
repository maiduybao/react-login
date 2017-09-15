import React, {Component} from "react";
import "../../css/errors.scss";


class Error503 extends Component {
    render() {
        return (
            <div className="not-found-container">
                <div>The server is returning an unexpected temporary error</div>
                <h1>
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                    <span> 503 Service Unavailable</span>
                </h1>
            </div>
        );
    }
}

export default Error503;