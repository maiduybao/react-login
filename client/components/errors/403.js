import React, {Component} from "react";
import "../../css/errors.scss";


class Error403 extends Component {
    render() {
        return (
            <div className="not-found-container">
                <div>You do not have access permissions for that</div>
                <h1>
                    <i className="fa fa-ban" aria-hidden="true"/>
                    <span> 403 Forbidden</span>
                </h1>
            </div>
        );
    }
}

export default Error403;