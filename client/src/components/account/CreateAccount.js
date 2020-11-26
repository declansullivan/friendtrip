import React, { Component } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CreateAccount.css";
import Fade from "react-reveal/Fade";
import friendtripLogo from "../../Media/friendtripLogo.svg";
class CreateAccount extends Component {
  constructor(props) {
    super(props);
  }

  createAccount = (event) => {
    event.preventDefault();

    const { username, email, first, last, password } = event.target.elements;
    const data = {
      username: username.value,
      email: email.value,
      first: first.value,
      last: last.value,
      password: password.value,
    };

    fetch("http://localhost:9000/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === "auth/email-already-in-use") {
          alert("This email is already in use.");
        }
        if (res.code === "auth/weak-password") {
          alert("Your password is too weak.");
        }
      });
  };

  render() {
    return (
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col xs={4} className="p-0">
            <div className="landing-left">
              <img
                src={friendtripLogo}
                width="100"
                height="100"
                className="d-inline-block align-top mr-2 rounded-circle landingLogo"
                alt="friendTrip logo"
                id="friendtripLogo"
              />
              <div className="signup-content">
                <h1> Become a member!</h1>
                <h4 className="mt-3">Gain access to...</h4>
                <ul className="mt-3 align-center text-left">
                  <li>
                    <h5> A collaborative task management interface </h5>
                  </li>
                  <li>
                    <h5> Real-time trip notifications </h5>
                  </li>
                  <li>
                    <h5> User-friendly expense allocation </h5>
                  </li>
                  <li>
                    <h5> And many more features! </h5>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xs={8} className="p-0 signup-right">
              <Fade>
            <Card
              border="secondary"
              style={{
                width: "48rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Card.Header className="border-0 signup-header">
                <Card.Title style={{ textAlign: "center", margin: "0px" }}>
                  Create an Account
                </Card.Title>
              </Card.Header>
              <Card.Body className="signup-body">
                <Form onSubmit={this.createAccount}>
                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="p-0 m-1"
                      controlId="formGridUsername"
                    >
                      <Form.Control
                        name="username"
                        type="username"
                        placeholder="Username"
                        className="signup-input"
                      />
                      <span class="border"></span>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      className="p-0 m-1"
                      controlId="formGridEmail"
                    >
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="signup-input"
                      />
                      <span class="border"></span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="p-0 m-1"
                      controlId="formGridFirst"
                    >
                      <Form.Control
                        name="first"
                        type="first"
                        placeholder="First name"
                        className="signup-input"
                      />
                      <span class="border"></span>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      className="p-0 m-1"
                      controlId="formGridLast"
                    >
                      <Form.Control
                        name="last"
                        type="last"
                        placeholder="Last name"
                        className="signup-input"
                      />
                      <span class="border"></span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="p-0 m-1"
                      controlId="formGridPassword"
                    >
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="signup-input"
                      />
                      <span class="border"></span>
                    </Form.Group>
                  </Form.Row>

                  <div className="centerbuttons">
                    <Link to="/">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>{" "}
                    </Link>
                    <Button className="ml-1" variant="primary" type="submit">
                      Register
                    </Button>
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

export default CreateAccount;
