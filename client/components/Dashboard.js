import React, {Component} from "react";
import {Switch, Link, Route} from "react-router-dom";

import "../css/dashboard.scss";

const Home = () => <h2 className="content-subhead">Home</h2>;
const About = () => <h2 className="content-subhead">About</h2>;


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
                            <li className="pure-menu-item">
                                <Link to="/dashboard/home" className="pure-menu-link">Home</Link>
                            </li>
                            <li className="pure-menu-item">
                                <Link to="/dashboard/about" className="pure-menu-link">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="main">
                    <div className="header">
                        <h1>Dashboard</h1>
                        <h2>A subtitle for your page goes here</h2>
                    </div>
                    <div className="content">
                            <Route key="dashboard/home" path="/dashboard/home" component={Home}/>
                            <Route key="/dashboard/about" path="/dashboard/about" component={About}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
