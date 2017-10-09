import React from "react";
import {withRouter} from "react-router-dom";
import "./error.scss";

const Error403 = () => (
    <div className="page-error">
        <div>You do not have access permissions for that</div>
        <h1>
            <i className="fa fa-ban page-error__danger-text" aria-hidden="true"/>
            <span> 403 Forbidden</span>
        </h1>
    </div>
);

export default withRouter(Error403);