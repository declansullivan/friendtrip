import React, { Component } from "react";
import { Alert, Container, Row, Col, Card} from "react-bootstrap";

class Trips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: []
        }
    }

    getTripsJSON = () => {
        fetch("http://localhost:9000/trip/getTrips", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tripIds: this.props.tripIds }),
        }).then((res) => res.json())
            .then((res) => {
                this.setState({ trips: res.trips });
            });
    }

    createTrip(trip) {
        return (
            <Alert onClick={() => this.props.callback(trip.id)} key={trip.id} className="tripThumbnail" variant="secondary">
                <Row style={{color:"black"}} className="align-items-center">
                    <Col xs={2}>{trip.name}</Col>
                    <Col xs={2}>Owner name</Col>
                    <Col xs={2}>{Object.keys(trip.travelerIds).length}</Col>
                    <Col>{trip.description}</Col>
                </Row>
            </Alert>
        )
    }

    renderTrips() {
        if (!this.state.trips) return;

        var tripsJSX = [];
        for (const trip of this.state.trips) {
            tripsJSX.push(this.createTrip(trip));
        }
        return tripsJSX;
    }

    componentDidMount() {
        this.getTripsJSON();
    }

    render() {
        return (
            <div>
                <Card style={{ width: '64rem' }}>
                    <Card.Body>
                        <Container fluid>
                            <Row>
                                <Col xs={2}><h5>Trip Name</h5></Col>
                                <Col xs={2}><h5>Owner</h5></Col>
                                <Col xs={2}><h5>Members</h5></Col>
                                <Col><h5>Description</h5></Col>
                            </Row>

                            {this.renderTrips()}
                                
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Trips;