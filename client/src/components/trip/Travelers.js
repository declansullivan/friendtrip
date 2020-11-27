import React, { Component } from "react";
import { ListGroup, Button, Card} from "react-bootstrap";

import AddTraveler from "./modals/AddTraveler"

class Travelers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddTraveler: false
        }

        this.openAddTravelerModal = this.openAddTravelerModal.bind(this);
        this.closeAddTravelerModal = this.closeAddTravelerModal.bind(this);
    }

    closeAddTravelerModal = () => {
        this.setState({showAddTraveler: false});
    }

    openAddTravelerModal = () => {
        this.setState({showAddTraveler: true});
    }

    render() {
        return (
            <div>
                <AddTraveler show={this.state.showAddTraveler} handleClose={this.closeAddTravelerModal}></AddTraveler>

                <Card>
                    <Card.Header>Travelers</Card.Header>
                    <ListGroup variant="flush">
                        {/* Need to create rows programmatically */}
                        <ListGroup.Item><span className="close">❌</span>Declan</ListGroup.Item>
                        <ListGroup.Item><span className="close">❌</span>More Travelers</ListGroup.Item>
                        <Button variant="light" onClick={this.openAddTravelerModal}>Add Traveler</Button>
                    </ListGroup>
                </Card>
            </div>
        )
    }
}

export default Travelers;

