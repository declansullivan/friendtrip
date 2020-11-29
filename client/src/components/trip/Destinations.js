import React, { Component } from "react";
import { Button, Card, Col, Row, Container, Alert} from "react-bootstrap";

import ViewDestination from "./modals/ViewDestination";
import AddDestination from "./modals/AddDestination";
import "../../Stylesheets/Destinations.css";
class Destinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showViewDestination: false,
            showAddDestination: false,
        }

        this.openViewDestinationModal = this.openViewDestinationModal.bind(this);
        this.closeViewDestinationModal = this.closeViewDestinationModal.bind(this);

        this.openAddDestinationModal = this.openAddDestinationModal.bind(this);
        this.closeAddDestinationModal = this.closeAddDestinationModal.bind(this);
    }

    closeViewDestinationModal = () => {
        this.setState({showViewDestination: false});
    }

    openViewDestinationModal = () => {
        this.setState({showViewDestination: true});
    }

    closeAddDestinationModal = () => {
        this.setState({showAddDestination: false});
    }

    openAddDestinationModal = () => {
        this.setState({showAddDestination: true});
    }

    render() {
        return (
            <div>
                <ViewDestination show={this.state.showViewDestination} handleClose={this.closeViewDestinationModal}>
                </ViewDestination>
                <AddDestination kind="Add" show={this.state.showAddDestination} handleClose={this.closeAddDestinationModal}></AddDestination>

                <Card className="destinations-list">
                    <Card.Header className="destinations-list-header">
                        <h5> Destinations</h5>
                    </Card.Header>
                    <Card.Body className="destinations-list-body">
                        <Container fluid>
                            <Row>
                                <Col xs={2}><h5>Destination</h5></Col>
                                <Col xs={2}><h5>Start Date</h5></Col>
                                <Col xs={2}><h5>End Date</h5></Col>
                                <Col><h5>Description</h5></Col>
                            </Row>

                            {/* Need to programmatically create rows. */}
                            <Alert onClick={this.openViewDestinationModal}
                                className="tripThumbnail" variant="secondary"
                            >
                                <Row style={{color:"black"}} className="align-items-center">
                                    <Col xs={2}>Destination Name</Col>
                                    <Col xs={2}>start date</Col>
                                    <Col xs={2}>end date</Col>
                                    <Col>this is a great destination with good food and friends and just wanna see what happens with a long string</Col>
                                </Row>
                            </Alert>

                            <Row>
                                <Col>
                                    <Button onClick={this.openAddDestinationModal}>Add Destination</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>                
            </div>
        )
    }
}

export default Destinations;

