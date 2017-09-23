import React, {Component} from "react";
import "../../css/errors.scss";


class Error404 extends Component {
    render() {
        return (
            <div className="error-container">
                <div>The page you are looking for can not be found</div>
                <h1>
                    <i className="fa fa-frown-o" aria-hidden="true"/>
                    <span> 404 Not Found</span>
                </h1>
            </div>
        );
    }
}

export default Error404;