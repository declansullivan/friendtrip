import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import tripIcon from "../Media/tripIcon.svg";
import friendsIcon from "../Media/friendsIcon.svg";
import homeIcon from "../Media/homeIcon.svg";
import createTripIcon from "../Media/createTripIcon.svg";
import navbarRetractableIcon from "../Media/navbarRetractableIcon.svg";
import friendtripLogo from "../Media/friendtripLogo.svg";
import "../Stylesheets/Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar mt-3">
        <div className="navbar-header">
          <img
            src={friendtripLogo}
            width="20%"
            className="d-inline-block rounded-circle align-top mr-2"
            alt="friendtripLogo"
            id="friendtripLogo"
          />
            <h1 className="navbar-title text-white m-0"> FriendTrip</h1>
        </div>
        <Button
          className="shadow-none mt-3"
          block
          onClick={(e) => this.props.page("home")}
        >
          <img
            src={homeIcon}
            width="25"
            height="25"
            className="d-inline-block align-top mr-2"
            alt="homeIcon"
            id="homeIcon"
          />
          <strong> Home </strong>
        </Button>
        <Button
          className="shadow-none"
          block
          onClick={(e) => this.props.page("trips")}
        >
          <img
            src={tripIcon}
            width="25"
            height="25"
            className="d-inline-block align-top mr-2"
            alt="tripIcon"
            id="tripIcon"
          />
          <strong> Trips</strong>
        </Button>
        <Button
          className="shadow-none"
          block
          onClick={(e) => this.props.page("friends")}
        >
          <img
            src={friendsIcon}
            width="25"
            height="25"
            className="d-inline-block align-top mr-2"
            alt="friendIcon"
            id="friendIcon"
          />
          <strong>Friends</strong>
        </Button>
        <Button
          className="shadow-none"
          block
          onClick={(e) => this.props.page("createTrip")}
        >
          <img
            src={createTripIcon}
            width="20"
            height="20"
            className="d-inline-block align-top mr-2"
            alt="createTripIcon"
            id="createTripIcon"
          />
          <strong>Create Trip</strong>
        </Button>
      </div>
    );
  }
}
export default Navbar;
