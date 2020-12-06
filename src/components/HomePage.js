import React, { Component } from "react";
import homeIcon from "../Media/homeIcon.svg";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import friendsPageImage from "../Media/friendsPageImage.svg";
import tripPageImage from "../Media/tripPageImage.svg";
import createTripImage from "../Media/createTripImage.svg";
import accountImage from "../Media/accountImage.svg";
import protectInfoImage from "../Media/protectInfoImage.svg";

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
        <div className="home-page-greeting p-4">
          <h1 className="home-page-greeting-title text-center">
            Welcome To FriendTrip!
          </h1>
          <p className="home-page-greeting-description p-3 rounded">
            FriendTrip is a travel app aimed at solving a problem that every
            traveler has experienced - disorganization and frustration at
            planning a fun trip with friends and family. After using FriendTrip,
            travelers can focus less on the logistical aspect of travelling, and
            focus more on the fun and social parts of their journeys. As states
            and countries begin to gradually open up more, FriendTrip will be
            there to supplement the trips and vacations of people worldwide.
          </p>
        </div>
        <br></br>
        <div className="home-page-greeting p-4">
          <h1 className="carousel-title text-center">Getting Started</h1>
          <Carousel fade className="carousel-body">
            <Carousel.Item className="carousel-item">
              <Container fluid>
                <Row>
                  <Col md={12} lg={6}>
                    <img
                      className="carousel-img"
                      width="100%"
                      src={friendsPageImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col className="carousel-description p-5" md={12} lg={6}>
                    <h1> Add a Friend</h1>
                    <p>
                      FriendTrip makes going on Trips a collaborative and fun
                      experience. To get started, navigate to the Friends Page
                      using the navigation bar on the left. Connect with your
                      friends today using our easy-to-use platform and start
                      going on Trips today!
                    </p>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
              <Container fluid>
                <Row>
                  <Col md={12} lg={6}>
                    <img
                      className="carousel-img"
                      width="100%"
                      src={createTripImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col className="carousel-description p-5" md={12} lg={6}>
                    <h1> Create a Trip</h1>
                    <p>
                      Have you ever experienced disorganization or frustration
                      planning Trips? Don't worry! FriendTrip has got your back.
                      To get started, navigate to the Create Trip Page using the
                      navigation bar on the left. Once you have filled out the
                      basic information, you gain access to our Destination,
                      Item, and Expense tracker.
                    </p>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
              <Container fluid>
                <Row>
                  <Col md={12} lg={6}>
                    <img
                      className="carousel-img"
                      width="100%"
                      src={tripPageImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col className="carousel-description p-5" md={12} lg={6}>
                    <h1> View your Trips</h1>
                    <p>
                      View current Trips by navigating to the Trips Page. Here,
                      you'll see if any friends have invited you to a Trip and
                      all the Trips you're currently involved in. If you don't
                      have either, that's okay! Create your Trip and start
                      inviting Friends today.
                    </p>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
              <Container fluid>
                <Row>
                  <Col md={12} lg={6}>
                    <img
                      className="carousel-img"
                      width="100%"
                      src={accountImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col className="carousel-description p-5" md={12} lg={6}>
                    <h1> Account Settings</h1>
                    <p>
                      Made a typo when creating your account? Don't fret! Access
                      your account settings from the dropdown-menu on the
                      top-right of the screen. Here, you'll gain access to your
                      private and public account information.
                    </p>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
              <Container fluid>
                <Row>
                  <Col md={12} lg={6}>
                    <img
                      className="carousel-img"
                      width="100%"
                      src={protectInfoImage}
                      alt="First slide"
                    />
                  </Col>
                  <Col className="carousel-description p-5" md={12} lg={6}>
                    <h1> Protect your Info</h1>
                    <p>
                      Although we do our best to protect our users, we need your
                      help. If you're done using our web application, don't
                      forget to log out using the dropdown-menu on the top-right
                      of the screen.
                    </p>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default HomePage;
