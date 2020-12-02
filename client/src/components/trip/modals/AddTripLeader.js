import React, { Component } from "react";
import { Form, Button, Modal, ListGroup, Alert } from "react-bootstrap";

class AddTripLeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            visible: false,
            message: "",
            status: "",
        }
    }

    setTripLeaders = (event) => {
        event.preventDefault();
        if (event.target.elements.length <= 2) {
            this.props.handleClose();
        }

        const numChecks = event.target.elements.length - 2;
        var tripLeaders = [this.props.tripOwner];
        for (var i = 0; i < numChecks; i++) {
            const currTraveler = event.target.elements[i];
            if (currTraveler.checked) tripLeaders.push(currTraveler.name);
        }

        fetch("http://localhost:9000/trip/addTripLeader", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: this.props.tripId, tripLeaders }),
        }).then((res) => {
            this.props.refreshTrip();
            this.props.handleClose();
        });
    }

    getTravelerJSON = () => {
        fetch("http://localhost:9000/trip/getTravelers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ travelerIds: this.props.travelerIds }),
        }).then((res) => res.json()).then((res) => {
            this.setState({ travelers: res.travelers, render: true })
        });
    }

    createTraveler = (traveler) => {
        const name = traveler.firstName + " " + traveler.lastName;
        const tripLeader = this.props.tripLeaders.includes(traveler.id);
        if (traveler.id === this.props.tripOwner) return;
        return (
            <Form.Row id={traveler.id} className="m-0 p-0">
                <Form.Check
                    type="checkbox"
                    size="lg"
                    key={traveler.id}
                    name={traveler.id}
                    label={name}
                    id={traveler.id}
                    defaultChecked={tripLeader}
                />
            </Form.Row>
        )

    }

    renderTravelers = () => {
        if (!this.state.travelers) return;
        var formChecks = [];
        for (const traveler of this.state.travelers) {
            formChecks.push(this.createTraveler(traveler));
        }
        return formChecks;
    }

    showAlert = (message, status) => {
        this.setState({ message, status, visible: true }, () => {
        window.setTimeout(() => {
            this.setState({ visible: false });
        }, 2000);
        });
    };

    componentDidMount() {
        this.getTravelerJSON();
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
            <Form onSubmit={this.setTripLeaders} className="p-3">
              <Modal.Body>
                <h4>Choose Trip Leaders</h4>
                {this.renderTravelers()}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.handleClose}>Close</Button>
                <Button variant="success" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        )
    }
}

export default AddTripLeader;

