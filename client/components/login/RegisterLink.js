import React from "react";
import {Link} from "react-router-dom";

export default function RegisterLink() {
    return (
        <Link to="/register" className="nav-link" replace>Register</Link>
    );
}