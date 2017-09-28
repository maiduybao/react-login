import React, {Component} from "react";
import "./error.scss";

class Error404 extends Component {
    render() {
        return (
            <div className="page-error">
                <div>The page you are looking for can&#39;t be found</div>
                <h1>
                    <i className="fa fa-frown-o page-error__danger-text" aria-hidden="true"/>
                    <span> 404 Not Found</span>
                </h1>
            </div>
        );
    }
}

export default Error404;