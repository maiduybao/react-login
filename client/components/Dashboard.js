import React, {Component} from "react";
import "../css/dashboard.scss";

class Dashboard extends Component {
    render() {
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>
                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>
                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">About</a></li>
                        </ul>
                    </div>
                </div>
                <div id="main">
                    <div className="header">
                        <h1>Dashboard</h1>
                        <h2>A subtitle for your page goes here</h2>
                    </div>
                    <div className="content">
                        <h2 className="content-subhead">How to use this layout</h2>
                        <p>
                            To use this layout, you can just copy paste the HTML, along with the CSS
                        </p>
                        <h2 className="content-subhead">Try Resizing your Browser</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                </div>
        );
    }
}

export default Dashboard;
