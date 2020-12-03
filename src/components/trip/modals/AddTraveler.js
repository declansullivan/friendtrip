import React, { Component } from "react";
import { Button, Modal, ListGroup, Alert } from "react-bootstrap";

class AddTraveler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            visible: false,
            message: "",
            status: "",
            friends: []
        }
    }

    addTraveler = (travelerId) => {
        const data = { id: travelerId, tripId: this.props.id }

        fetch("/trip/sendInvite", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 200) 
                this.showAlert("Successfully invited Traveler!", "success");
            else if (res.status === 202) 
                this.showAlert("Traveler is already invited.", "warning")
            else 
                this.showAlert("Failed to invite Traveler.", "danger")
        });
    }

    getFriendsJSON = (friendIds) => {
        fetch("/trip/getTravelers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ travelerIds: friendIds }),
        }).then((res) => res.json()).then((res) => {
            this.setState({ friends: res.travelers, render: true });
        });
    }

    createFriend = (friend) => {
        const name = friend.firstName + " " + friend.lastName;

        return (
                <ListGroup.Item 
                    key={friend.id}
                    onClick={() => {this.addTraveler(friend.id)}}
                    action variant="info">
                    {name} - {friend.email}
                </ListGroup.Item>
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

    showAlert = (message, status) => {
        this.setState({ message, status, visible: true }, () => {
        window.setTimeout(() => {
            this.setState({ visible: false });
        }, 2000);
        });
    };

    componentWillReceiveProps(nextProps) {
        this.getFriendsJSON(nextProps.friendIds);
    }

    componentDidMount() {
        this.getFriendsJSON(this.props.friendIds);
    }

    render() {
        if (!this.state.render) return (<div></div>)
        return (
            <Modal
                show={this.props.show}
                dialogClassName="modal-60w"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={this.props.handleClose}
                animation={false}
                centered
                >
                <Modal.Body>
                    <h4>Click a Friend to add to them to the Trip</h4>
                    <ListGroup> 
                        {this.renderFriends()}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
                <Alert
                    className="m-0"
                    variant={this.state.status}
                    show={this.state.visible}
                    style={{ textAlign: "center" }}
                >
                    {this.state.message}
                </Alert>
            </Modal>
        )
    }
}

export default AddTraveler;

