import React, { Component } from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import "./Account.css";
import editIcon from "../../Media/accountEditIcon.svg";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user = {} // Get user JSON
    };
  }

  render() {
    return (
      <div>
        <div className="accountInfo">
          <h2> General Account Settings</h2>

          <Card style={{ width: "48rem" }}>
            <Card.Body>
              <ListGroup variant="flush" className="settingsList">
                <ListGroup.Item
                  className="settingsListItem"
                  action
                  onClick={() => alert("Replace this with a Modal")} // TODO
                >
                  <strong>Name</strong>
                  <p className="m-0"> Insert Name Here</p>
                  <div>
                    <img
                      src={editIcon}
                      width="24"
                      height="24"
                      className="align-top mr-2 editIcon"
                      alt="editIcon"
                      id="editIcon"
                    />
                    <p className="d-inline-block m-0"> EDIT </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  className="settingsListItem"
                  action
                  onClick={() => alert("Replace this with a Modal")} // TODO
                >
                  <strong>Username</strong>
                  <p className="m-0"> Insert Username Here</p>
                  <div>
                    <img
                      src={editIcon}
                      width="24"
                      height="24"
                      className="align-top mr-2 editIcon"
                      alt="editIcon"
                      id="editIcon"
                    />
                    <p className="d-inline-block m-0"> EDIT </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  className="settingsListItem"
                  action
                  onClick={() => alert("Replace this with a Modal")} // TODO
                >
                  <strong>Email</strong>
                  <p className="m-0"> Insert Email Here</p>
                  <div>
                    <img
                      src={editIcon}
                      width="24"
                      height="24"
                      className="align-top mr-2 editIcon"
                      alt="editIcon"
                      id="editIcon"
                    />
                    <p className="d-inline-block m-0"> EDIT </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  className="settingsListItem"
                  action
                  onClick={() => alert("Replace this with a Modal")} // TODO
                >
                  <strong>Account Creation Date</strong>
                  <p className="m-0"> A date and time</p>
                  <div>
                    <img
                      src={editIcon}
                      width="24"
                      height="24"
                      className="align-top mr-2 editIcon"
                      alt="editIcon"
                      id="editIcon"
                    />
                    <p className="d-inline-block m-0"> EDIT </p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>

        <hr></hr>

        <h2>Trip Invitations</h2>

        <div className="tripInvitations">
          <Card style={{ width: "64rem" }}>
            <Card.Body>
              <Container fluid>
                <Row>
                  <Col xs={2}>
                    <h5>Inviter</h5>
                  </Col>
                  <Col xs={2}>
                    <h5>Trip Name</h5>
                  </Col>
                  <Col xs={5}>
                    <h5>Description</h5>
                  </Col>
                  <Col></Col>
                </Row>

                {/* Need to programmatically create rows. */}
                <Row className="align-items-center">
                  <Col xs={2}>Username</Col>
                  <Col xs={2}>Trip Name</Col>
                  <Col xs={5}>Trip Description</Col>
                  <Col>
                    <Button variant="success">Accept</Button>{" "}
                    <Button className="ml-3" variant="danger">Decline</Button>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Account;
