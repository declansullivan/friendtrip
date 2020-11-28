import React, { Component } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import friendsPageImage from "../Media/friendsPageImage.svg";
import friendsIcon from "../Media/friendsIcon.svg";
import "./Friends.css";

class Friends extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w-100 h-100">
        <div className="friends-page-header">
          <img
            src={friendsIcon}
            width="40"
            height="40"
            className="d-inline-block align-top mr-2"
            alt="friendsIcon"
            id="friendsIcon"
          />
          <h1 className="d-inline-block">
            <strong> Friends</strong>
          </h1>
        </div>
        <hr></hr>
        <Form className="align-items-center" style={{ width: "48rem" }}>
          <h2>Add Friend</h2>
          <Form.Row>
            <Col xs={5}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter friend's email"
                />
              </Form.Group>
            </Col>
            <Col xs={2}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <br></br>
        <Card style={{ width: "48rem" }} variant="Light">
          <Card.Body>
            <Card.Title>Friend Name</Card.Title>
            <Card.Text>
              Some Friend Information... Emails etc. Will need to
              programmatically create one of these for each friend.
            </Card.Text>
            <Button>Remove Friend</Button>
          </Card.Body>
        </Card>
        <img
          src={friendsPageImage}
          width="40%"
          className="d-inline-block page-background-image mr-5"
          alt="tripPageImage"
          id="tripPageImage"
        />
      </div>
    );
  }
}

export default Friends;
