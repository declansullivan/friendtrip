import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import Account from "../components/account/Account";
import Friends from "../components/Friends";
import Trips from "../components/trip/Trips";
import Trip from "../components/trip/Trip";
import HomePage from "../components/HomePage";
import CreateTrip from "../components/trip/CreateTrip";
import dropdownIcon from "../Media/dropdownIcon.svg";
import accountIcon from "../Media/accountIcon.svg";
import logoutLogo from "../Media/logoutLogo.svg";
import profileLogo from "../Media/profileIcon.svg";
import navBarImage from "../Media/loginImage.svg";
import Fade from "react-reveal/Fade";
import "../Stylesheets/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.page = this.switchPage.bind(this);
    this.logout = this.logoutFunc.bind(this);
    this.redirectTrip = this.redirectTrip.bind(this);
    this.state = {
      render: "",
      tripId: "",
      traveler: {},
    };
  }

  logoutFunc = () => {
    fetch("http://localhost:9000/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          this.props.history.push("/");
        } else {
          alert("Logout failed.");
        }
      });
  };

  getTravelerJSON = () => {
    fetch("http://localhost:9000/account/getAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: this.getUserId() }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ traveler: res });
      });
  };

  switchPage = (event) => {
    this.setState({ render: event });
  };

  selectTrip = (tripId) => {
    this.setState({ tripId, render: "trip" });
  };

  refreshTravelerJSON = () => {
    this.getTravelerJSON();
  };

  getUserId = () => {
    return localStorage.getItem("id");
  };

  // Updates Traveler JSON and redirects to Trips Page
  redirectTrip = () => {
    fetch("http://localhost:9000/account/getAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: this.getUserId() }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ traveler: res, render: "trips" });
      });
  };

  renderContent() {
    switch (this.state.render) {
      case "account":
        return (
          <Account
            traveler={this.state.traveler}
            refreshTraveler={this.refreshTravelerJSON}
            user={this.getUserId()}
          ></Account>
        );
      case "trips":
        return (
          <Trips
            tripIds={this.state.traveler.tripIds}
            invitations={this.state.traveler.invitations}
            refreshTraveler={this.refreshTravelerJSON}
            callback={this.selectTrip}
          ></Trips>
        );
      case "trip":
        return (
          <Trip
            redirectTrip={this.redirectTrip}
            tripId={this.state.tripId}
            traveler={this.state.traveler}
            history={this.props.history}
          />
        );
      case "friends":
        return <Friends refreshTraveler={this.refreshTravelerJSON} />;
      case "createTrip":
        return (
          <CreateTrip refreshTraveler={this.refreshTravelerJSON}></CreateTrip>
        );
      default:
        return <HomePage></HomePage>;
    }
  }

  componentDidMount() {
    this.getTravelerJSON();
  }

  redirectOnLoggedOut = () => {
    if (!localStorage.getItem("id")) this.props.history.push("/");
  };

  render() {
    return (
      <div className="homepage-wrapper">
        {this.redirectOnLoggedOut()}
        <Fade left>
          <div className="homepage-left">
            <Navbar
              page={this.switchPage}
              out={this.logoutFunc}
              className="position-sticky"
            ></Navbar>
            <img
              src={navBarImage}
              width="100%"
              className="d-inline-block homepage-left-image"
              alt="navBarImage"
              id="navBarImage"
            />
          </div>
        </Fade>
        <div className="homepage-right pt-5 pl-5 pr-5">
          {this.renderContent()}
        </div>
        <div className="homepage-account mt-3 pr-3">
          <div className="homepage-profile p-1">
            <img
              src={profileLogo}
              width="25"
              height="25"
              className="d-inline-block align-top"
              alt="profileLogo"
              id="profileLogo"
            />{" "}
            <strong>
              {this.state.traveler.firstName +
                " " +
                this.state.traveler.lastName}
            </strong>
          </div>
          <Dropdown className="ml-4 d-inline-block">
            <Dropdown.Toggle
              className="p-0"
              variant="light"
              id="dropdown-basic"
              bsPrefix="profile-dropdown"
            >
              <img
                src={dropdownIcon}
                width="25"
                height="25"
                className="d-inline-block align-top pb-1 dropdownIcon"
                alt="accountIcon"
                id="accountIcon"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="mt-1 profile-dropdown-menu">
              <Dropdown.Item
                className="profile-dropdown-menu-item"
                onClick={(e) => this.switchPage("account")}
              >
                <img
                  src={accountIcon}
                  width="25"
                  height="25"
                  className="d-inline-block align-top mr-2"
                  alt="accountIcon"
                  id="accountIcon"
                />
                Account
              </Dropdown.Item>
              <Dropdown.Item
                className="profile-dropdown-menu-item"
                onClick={(e) => this.logoutFunc()}
              >
                <img
                  src={logoutLogo}
                  width="24"
                  height="24"
                  className="d-inline-block align-top mr-2"
                  alt="logoutLogo"
                  id="logoutLogo"
                />
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <ScrollToTop></ScrollToTop>
      </div>
    );
  }
}

export default Home;
