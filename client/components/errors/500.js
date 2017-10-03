import React from "react";
import "./error.scss";

const Error500 = () => (
    <div className="page-error">
        <div>The server is returning an internal error</div>
        <h1>
            <i className="fa fa-fire page-error__danger-text" aria-hidden="true"/>
            <span> 500 Internal Server Error</span>
        </h1>
    </div>
);

export default Error500;