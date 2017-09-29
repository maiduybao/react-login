import React from "react";
import {Link} from "react-router-dom";

export default function RegisterLink() {
    return (
        <Link to="/register" className="nav-link page-login__register-link__nav-link" replace>
            <i className="fa fa-user-plus" aria-hidden="true"/> Register
        </Link>
    );
}