import React, { Component } from "react";
import { Alert, Button, Card, Form, Row, Col, Container } from "react-bootstrap";
import friendsPageImage from "../Media/friendsPageImage.svg";
import friendsIcon from "../Media/friendsIcon.svg";
import profileLogo from "../Media/profileIcon.svg";
import "../Stylesheets/Friends.css";

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      visible: false,
      message: "",
      friends: [],
      invitations: []
    }
  }

  addFriend = event => {
    event.preventDefault();
    const email = event.target.email.value.replace(".", "");
    const data = { id: this.getUserId(), friendId: email }

    fetch("/account/addFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      event.target.email.value = "";
      this.props.refreshTraveler();
      this.getFriends();
      
      if (res.status === 200)
        this.showAlert("Successfully added Friend!", "success");
      else if (res.status === 202)
        this.showAlert("You are already Friends with this Traveler.", "warning");
      else if (res.status === 203)
        this.showAlert("You have already requested to be friends with this Traveler.", "warning");
      else if (res.status === 204)
        this.showAlert("You have a request from this Traveler, either accept or decline it.", "warning");
      else if (res.status === 403)
        this.showAlert("You cannot add yourself as a Friend.", "danger");
      else if (res.status === 404)
        this.showAlert("This Traveler does not exist.", "danger");
      else
        this.showAlert("Failed to add Friend.", "danger");
    });
  }

  handleInvitation = (friendId, method) => {
    const data = { travelerId: this.getUserId(), friendId }
    fetch("/account/" + method, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      this.props.refreshTraveler();
      this.getFriends();
    });
  }

  removeFriend = (friendId) => {
    const data = { id: this.getUserId(), friendId }
    fetch("/account/removeFriend", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      this.props.refreshTraveler();
      this.getFriends();
    });
  }

  getFriends = () => {
    fetch("/account/getFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: this.getUserId() }),
    }).then((res) => res.json()).then((res) => {
      this.getFriendInvitations(res.friends)
    });
  }

  getFriendInvitations = (friends) => {
    fetch("/account/getFriendInvites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: this.getUserId() }),
    }).then((res) => res.json()).then((res) => {
      this.getFriendInvitations(res.friends)
    });
  }

  getFriendInvitations = (friends) => {
    fetch("/account/getFriendInvites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: this.getUserId() }),
    }).then((res) => res.json()).then((res) => {
      this.setState({ friends, invitations: res.invitations });
    });
  }

  getUserId = () => {
    return localStorage.getItem("id");
  };

  showAlert = (message, status) => {
    this.setState({ message, status, visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 2000);
    });
  };

  createFriendRequest = (traveler) => {
    const name = traveler.firstName + " " + traveler.lastName;
    return (
      <Row className="trips-invite m-0 text-center p-1" key={traveler.id} id={"row" + traveler.id}>
        <Col xs={2}>{name}</Col>
        <Col xs={5}>{traveler.username}</Col>
        <Col>
          <Button onClick={() => {this.handleInvitation(traveler.id, "acceptFriend")}} variant="success">
            Accept
          </Button>{" "}
          <Button onClick={() => {this.handleInvitation(traveler.id, "rejectFriend")}} className="ml-3" variant="danger">
            Decline
          </Button>
        </Col>
      </Row>
    )
  }

  createFriend = (friend) => {
    const name = friend.firstName + " " + friend.lastName;
    return (
      <Card key={friend.id} style={{ width: "25%", margin: "0 2.5%" }} variant="Light">
        <Card.Body>
          <Card.Title>
          <img
              src={profileLogo}
              width="25"
              height="25"
              className="d-inline-block align-top mr-1"
              alt="profileLogo"
              id="profileLogo"
            />
            {name}
            </Card.Title>
          <Card.Text>
            Username: {friend.username}
            <br/>
            Email: {friend.email}
          </Card.Text>
          <Button onClick={() => {this.removeFriend(friend.id)}} variant="danger">
            Remove Friend
          </Button>
        </Card.Body>
      </Card>
    )
  }

  renderFriendRequests = () => {
    if (!this.state.invitations) return;
    var invitesJSX = [];
    for (const invite of this.state.invitations) {
      invitesJSX.push(this.createFriendRequest(invite));
    }
    return invitesJSX;
  }

  renderFriends = () => {
    if (!this.state.friends) return;
    var friendsJSX = [];
    for (const friend of this.state.friends) {
      friendsJSX.push(this.createFriend(friend));
    }
    return friendsJSX;
  }

  componentDidMount = () => {
    this.getFriends();
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

        <Card className="trips-list" style={{ width: "100%" }}>
          <Card.Header className="trip-list-header">
            <h2> Friend Requests </h2>
          </Card.Header>
          <Card.Body>
            <Container fluid>
              <Row className="m-0 text-center">
                <Col xs={2}>
                  <h5>Friend</h5>
                </Col>
                <Col xs={5}>
                  <h5>Username</h5>
                </Col>
                <Col></Col>
              </Row>
              {this.renderFriendRequests()}
            </Container>
          </Card.Body>
        </Card>

        <Card className="mt-3" style={{ width: "100%" }} variant="Light">
          <Card.Header className="friend-list-header">
            <h2> Friend's List</h2>
            <Form onSubmit={this.addFriend} className="add-friend-form text-center">
              <h5 className="m-0 ">Find Friends</h5>
              <Form.Row className="m-0 p-0 ml-2">
                <Form.Group className="m-0" controlId="formBasicEmail">
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter friend's email"
                  />
                </Form.Group>
                <Button className="ml-2" variant="success" type="submit">
                  Add
                </Button>
              </Form.Row>
            </Form>
          </Card.Header>

          <Alert
              className="m-0"
              variant={this.state.status}
              show={this.state.visible}
              style={{ textAlign: "center" }}
            >
              {this.state.message}
          </Alert>

          <Card.Body className="friend-list-body">
            {this.renderFriends()}
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
