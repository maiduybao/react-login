import React, {Component} from "react";
import "./error.scss";

class Error403 extends Component {
    render() {
        return (
            <div className="page-error">
                <div>You do not have access permissions for that</div>
                <h1>
                    <i className="fa fa-ban page-error__danger-text" aria-hidden="true"/>
                    <span> 403 Forbidden</span>
                </h1>
            </div>
        );
    }
}

export default Error403;