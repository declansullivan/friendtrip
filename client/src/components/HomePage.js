import React, { Component } from "react";
import HomePageImage from "../Media/homePageImage.svg";
import homeIcon from "../Media/homeIcon.svg";

import "../Stylesheets/HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w-100 h-100">
        <div className="home-page-header ">
          <img
            src={homeIcon}
            width="40"
            height="40"
            className="d-inline-block align-top mr-2"
            alt="homeIcon"
            id="homeIcon"
          />
          <h1 className="d-inline-block">
            <strong> Home</strong>
          </h1>
        </div>
        <hr></hr>
        <img
          src={HomePageImage}
          width="50%"
          className="d-inline-block page-background-image"
          alt="HomePageImage"
          id="HomePageImage"
        />
      </div>
    );
  }
}

export default HomePage;
