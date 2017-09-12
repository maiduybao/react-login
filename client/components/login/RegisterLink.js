import React from "react";
import {Link} from "react-router-dom";

export default function RegisterLink() {
    return (
        <div className="pure-form-message-inline">
            <Link to="/register" className="pure-menu-link" replace>Register</Link>
        </div>
    );
}