import React, { Component } from "react";
import { ListGroup, Button, Card} from "react-bootstrap";

import AddTraveler from "./modals/AddTraveler"
import "../../Stylesheets/Travelers.css";
class Travelers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddTraveler: false,
            travelers: [],
            friendIds: []
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

    getTravelersJSON = () => {
        fetch("http://localhost:9000/trip/getTravelers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ travelerIds: this.props.travelerIds }),
        }).then((res) => res.json()).then((res) => {
            this.setState({ travelers: res.travelers });
            var friends;
            if (!res.friendIds) friends = [];
            else friends = res.friendIds;
            
            // Friend Ids that aren't in the Trip
            friends.filter(value => !res.travelers.includes(value))
            this.setState({ friendIds: friends })
        });
    }

    createTraveler = (traveler) => {
        const name = traveler.firstName + " " + traveler.lastName;
        return (
            <ListGroup.Item key={traveler.id}>
                <span id={traveler.id} className="close">❌</span>
                {name}
            </ListGroup.Item>
        )
    }

    renderTravelers = () => {
        if (!this.state.travelers) return;

        var travelersJSX = [];
        for (const traveler of this.state.travelers) {
          travelersJSX.push(this.createTraveler(traveler));
        }
        return travelersJSX;
    }
    
    componentDidMount() {
        this.getTravelersJSON();
    }

    render() {
        return (
            <div>
                <AddTraveler 
                    id={this.props.id}
                    friendIds={this.state.friendIds}
                    show={this.state.showAddTraveler} 
                    handleClose={this.closeAddTravelerModal}/>

                <Card className="travelers-list">
                    <Card.Header className="travelers-list-header">Travelers</Card.Header>
                    <ListGroup variant="flush">
                        { this.renderTravelers() }
                        <Button variant="light" onClick={this.openAddTravelerModal}>Add Traveler</Button>
                    </ListGroup>
                </Card>
            </div>
        )
    }
}

export default Travelers;

