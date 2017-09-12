import React, {Component} from "react";
import PropTypes from "prop-types";
import {Switch, Link, Route} from "react-router-dom";
import "../css/dashboard.scss";

const Home = () => <h2 className="content-subhead">Home</h2>;
const About = () => <h2 className="content-subhead">About</h2>;
class Dashboard extends Component {
    render() {
        const {computedMatch: match} = this.props;
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
                                <Link to={`${match.url}/home`} className="pure-menu-link" replace>Home</Link>
                            </li>
                            <li className="pure-menu-item">
                                <Link to={`${match.url}/about`} className="pure-menu-link" replace>About</Link>
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
                        <Switch>
                            <Route path={`${match.url}/home`} component={Home}/>
                            <Route path={`${match.url}/about`} component={About}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    computedMatch: PropTypes.object.isRequired
};

export default Dashboard;
