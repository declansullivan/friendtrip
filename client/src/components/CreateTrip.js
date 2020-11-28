import React, { Component } from "react";
import { Form, Button, Col, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';

class CreateTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            message: "",
            status: "",
        }
    }

    createTrip = event => {
        event.preventDefault();

        const { name, description } = event.target.elements;

        const travelerId = this.getUserId();
        const data = {
            travelerId: travelerId,
            travelerIds: [travelerId],
            tripLeaders: [travelerId],
            name: name.value,
            description: description.value,
        }

        event.target.elements.name.value = "";
        event.target.elements.description.value = "";

        fetch('http://localhost:9000/createTrip', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            if (res.status === 200) {
                this.addTravelerToTrip(travelerId, res.tripId);
                this.showAlert("Successfully created Trip!", "success");
            } else {
                this.showAlert("Failed to create Trip.", "danger")
            }
        });
    }

    addTravelerToTrip = (travelerId, tripId) => {
        const data = { travelerId, tripId };
        fetch('http://localhost:9000/trip/addTraveler', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => {
            this.props.refreshTraveler();
        });
    }

    getUserId = () => {
        return localStorage.getItem("id");
    }

    showAlert = (message, status) => {
        this.setState({ message });
        this.setState({ status });
        this.setState({ visible: true }, () => {
            window.setTimeout(() => {
                this.setState({ visible: false });
            }, 2000);
        });
    }
    
    render() {
        return (
            <div className="centerdiv">
                <Card border="secondary" style={{ "width": "48rem", "marginLeft": "auto", "marginRight": "auto" }}>
                    <Card.Header>
                        <Card.Title style={{ "textAlign": "center" }}>Create Trip</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.createTrip}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridname">
                                    <Form.Label>Trip Name</Form.Label>
                                    <Form.Control name="name" type="name" placeholder="Trip Name" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="description" type="description" placeholder="Trip Description" />
                                </Form.Group>
                            </Form.Row>

                            <div style={{ "textAlign": "right" }}>
                                <Link to="/home">
                                    <Button variant="primary" type="submit">
                                        Cancel
                                    </Button>{' '}
                                </Link>
                                <Button variant="primary" type="submit">Create Trip</Button>
                            </div>
                        </Form>
                    </Card.Body>

                    <Alert variant={this.state.status} show={this.state.visible} style={{textAlign: "center"}}>
                        {this.state.message}
                    </Alert>
                </Card>
            </div>
        );
    }
}

export default CreateTrip;