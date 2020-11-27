import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import accountIcon from "../Media/accountIcon.svg"
import tripIcon from "../Media/tripIcon.svg";
import friendsIcon from "../Media/friendsIcon.svg";
import logoutLogo from "../Media/logoutLogo.svg";

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar mt-3">
                <Button className="navbar-btn shadow-none" block onClick={(e) => this.props.page('account')}>
                    <img
                        src={accountIcon}
                        width="25"
                        height="25"
                        className="d-inline-block align-top mr-2"
                        alt="accountIcon logo"
                        id="accountIcon"
                        />
                    Account
                    </Button>
                <Button className="navbar-btn shadow-none" block onClick={(e) => this.props.page('trips')}>
                    <img
                        src={tripIcon}
                        width="25"
                        height="25"
                        className="d-inline-block align-top mr-2"
                        alt="tripIcon logo"
                        id="tripIcon"
                        />
                    Trips
                    </Button>
                <Button className="navbar-btn shadow-none" block onClick={(e) => this.props.page('friends')}>
                <img
                        src={friendsIcon}
                        width="25"
                        height="25"
                        className="d-inline-block align-top mr-2"
                        alt="friendIcon logo"
                        id="friendIcon"
                        />
                    Friends
                    </Button>
                <Button className="navbar-btn shadow-none" block onClick={(e) => this.props.out()}>
                    <img
                        src={logoutLogo}
                        width="25"
                        height="25"
                        className="d-inline-block align-top mr-2"
                        alt="logoutLogo logo"
                        id="logoutLogo"
                        />
                    Logout
                </Button>
            </div>
        )
    }
}

export default Navbar;