import React, { Component } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import friendtripLogo from "../../Media/friendtripLogo.svg";
import loginImage from "../../Media/loginImage.svg";
import Fade from "react-reveal/Fade";
import "../../Stylesheets/SignIn.css";
class SignIn extends Component {
  constructor(props) {
    super(props);
  }
  signIn = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const data = {
      email: email.value,
      password: password.value,
    };

    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === "Success") {
          localStorage.setItem("id", res.id);
          this.props.history.push("/home");
        } else {
          alert("Incorrect email or password.");
        }
      });
  };

  redirectOnLogin = () => {
    if (localStorage.getItem("id")) this.props.history.push("/home");
  }

  render() {
    return (
      <Container fluid className="vh-100">
        {this.redirectOnLogin()}
        <Row className="h-100">
          <Col xs={4} className="p-0">
            <Fade left>
              <div className="landing-left">
                <img
                  src={friendtripLogo}
                  width="100"
                  height="100"
                  className="d-inline-block align-top mr-2 rounded-circle landingLogo"
                  alt="accountIcon logo"
                  id="accountIcon"
                />
                <div className="landing-content">
                  <h1> FriendTrip.</h1>
                  <h4 className="mt-3">
                    {" "}
                      A platform designed to making planning and going on trips
                      with your friends effortless through collaborative task
                      management, real-time trip notifications, and
                      user-friendly expense allocation.
                    </h4>
                </div>
              </div>
            </Fade>
          </Col>
          <Col xs={8} className="p-0 landing-login">
            <Fade right >
              <Card
                border="none"
                style={{
                  width: "24rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="border-0"
              >
                <Card.Header className="border-0 landing-login-header">
                  <Card.Title
                    style={{ textAlign: "center", verticalAlign: "center", margin: "0px" }}
                  >
                    Sign In
                    </Card.Title>
                </Card.Header>
                <Card.Body className="landing-login-body">
                  <Form onSubmit={this.signIn}>
                    <Form.Row>
                      <Form.Group as={Col} className="p-0 m-1" controlId="formGridUsername">
                        <Form.Label className="pl-1 m-0"><strong>Email address</strong></Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Enter Email"
                          className="landing-email-input pl-1"
                        />
                        <span className="landing-input-border"></span>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} className="p-0 m-1" controlId="formGridPassword">
                        <Form.Label className="pl-1 m-0"><strong>Password</strong></Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          className="landing-email-input pl-1"
                        />
                        <span className="landing-input-border"></span>
                      </Form.Group>
                    </Form.Row>
                    <div className="centerbuttons">
                      <Button variant="primary" type="submit">
                        Login
                        </Button>
                      <Link to="/signup">
                        <Button className="ml-1" variant="primary">Register</Button>
                      </Link>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignIn;
