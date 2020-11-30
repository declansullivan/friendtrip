import React, { Component } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import friendsPageImage from "../Media/friendsPageImage.svg";
import friendsIcon from "../Media/friendsIcon.svg";
import "../Stylesheets/Friends.css";

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      visible: false,
      message: "",
      friends: []
    }
  }

  addFriend = event => {
    event.preventDefault();
    const email = event.target.email.value.replace(".", "");
    const data = { id: this.getUserId(), friendId: email }

    fetch("http://localhost:9000/account/addFriend", {
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
        this.showAlert("You are already Friends with this Traveler", "warning");
      else if (res.status === 403)
        this.showAlert("You cannot add yourself as a Friend.", "danger");
      else if (res.status === 404)
        this.showAlert("This Traveler does not exist.", "danger");
      else
        this.showAlert("Failed to add Friend.", "danger");
    });
  }

  getFriends = () => {
    fetch("http://localhost:9000/account/getFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: this.getUserId() }),
    }).then((res) => res.json()).then((res) => {
      this.setState({ friends: res.friends });
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

  removeFriend = (friendId) => {
    console.log(friendId);
  }

  createFriend = (friend) => {
    const name = friend.firstName + " " + friend.lastName;
    return (
      <Card key={friend.id} style={{ width: "25%", margin: "0 2.5%" }} variant="Light">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Username: {friend.username}
            Email: {friend.email}
          </Card.Text>
          <Button onClick={() => {this.removeFriend(friend.id)}} variant="danger">
            Remove Friend
          </Button>
        </Card.Body>
      </Card>
    )
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

        <Card style={{ width: "100%" }} variant="Light">
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
                <Button className="ml-2" variant="primary" type="submit">
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
