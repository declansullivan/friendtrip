import React, { Component } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";

class AddTraveler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            friends: []
        }
    }

    addTraveler = (travelerId) => {
        const data = { id: travelerId, tripId: this.props.id }

        fetch("http://localhost:9000/trip/sendInvite", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((res) => {
            this.setState({ friends: res.travelers, render: true });
            this.props.refreshTrip();
        });
    }

    getFriendsJSON = () => {
        fetch("http://localhost:9000/trip/getTravelers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ travelerIds: this.props.friendIds }),
        }).then((res) => res.json()).then((res) => {
            this.setState({ friends: res.travelers, render: true });
        });
    }

    createFriend = (friend) => {
        const name = friend.firstName + " " + friend.lastName;

        return (
            <ListGroup>
                <ListGroup.Item 
                    key={friend.id}
                    onClick={() => {this.addTraveler(friend.id)}}
                    action variant="info">
                    {name} - {friend.email}
                </ListGroup.Item>
            </ListGroup>
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

    componentDidMount() {
        this.getFriendsJSON();
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
                    {this.renderFriends()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddTraveler;

