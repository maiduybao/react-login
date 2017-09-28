import React, {Component} from "react";
import "./error.scss";

class Error504 extends Component {
    render() {
        return (
            <div className="page-error">
                <div>The server is returning an unexpected networking error</div>
                <h1>
                    <i className="fa fa-clock-o page-error__warning-text" aria-hidden="true"/>
                    <span> 504 Gateway Timeout</span>
                </h1>
            </div>
        );
    }
}

export default Error504;