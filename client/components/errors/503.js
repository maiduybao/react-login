import React from "react";
import "./error.scss";

const Error503 = () => (
    <div className="page-error">
        <div>The server is returning an unexpected temporary error</div>
        <h1>
            <i className="fa fa-exclamation-triangle page-error" aria-hidden="true"/>
            <span> 503 Service Unavailable</span>
        </h1>
    </div>
);

export default Error503;