import React from "react";
import {withRouter} from "react-router-dom";
import "./error.scss";

const Error404 = () => (
    <div className="page-error">
        <div>The page you are looking for can&#39;t be found</div>
        <h1>
            <i className="fa fa-frown-o page-error__danger-text" aria-hidden="true"/>
            <span> 404 Not Found</span>
        </h1>
    </div>
);

export default withRouter(Error404);