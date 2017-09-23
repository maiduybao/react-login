import React, {Component} from "react";
import "../../css/errors.scss";


class Error504 extends Component {
    render() {
        return (
            <div className="error-container">
                <div>The server is returning an unexpected networking error</div>
                <h1>
                    <i className="fa fa-clock-o" aria-hidden="true"/>
                    <span> 504 Gateway Timeout</span>
                </h1>
            </div>
        );
    }
}

export default Error504;