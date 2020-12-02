import React, { Component } from "react";
import { ListGroup, Button, Card} from "react-bootstrap";

import AddTraveler from "./modals/AddTraveler"
import "../../Stylesheets/Travelers.css";
class Travelers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
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

    removeTraveler = (travelerId) => {
        const isTripLeader = this.props.tripLeaders.includes(travelerId);
        const data = {
            tripId: this.props.tripId,
            travelerId, 
            isTripLeader
        };
        
        fetch("http://localhost:9000/trip/leaveTrip", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            this.props.refreshTrip();
        });
    }

    getTravelersJSON = (travelerIds) => {
        fetch("http://localhost:9000/trip/getTravelers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ travelerIds }),
        }).then((res) => res.json()).then((res) => {
            var friends;
            if (!this.props.friendIds) friends = [];
            else friends = this.props.friendIds;
            
            // Friend Ids that aren't in the Trip
            friends = friends.filter(value => !travelerIds.includes(value))
            this.setState({ travelers: res.travelers, friendIds: friends, render: true })
        });
    }

    createTraveler = (traveler) => {
        const name = traveler.firstName + " " + traveler.lastName;
        var remove, strong;
        if (this.props.isTripLeader() && 
            traveler.id !== this.props.tripOwner && 
            traveler.id != this.props.travelerId) {
                remove = (<span 
                    onClick={() => {this.removeTraveler(traveler.id)}} 
                    id={traveler.id} 
                    className="close">❌
                    </span>);
        }
        if (traveler.id === this.props.tripOwner)
            strong = (<strong>{name}</strong>);
        else strong = name;
        
        return (
            <ListGroup.Item key={traveler.id}>
                {remove}
                {strong}
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

    componentWillReceiveProps(nextProps) {
        this.getTravelersJSON(nextProps.travelerIds);
    }
    
    componentDidMount() {
        this.getTravelersJSON(this.props.travelerIds);
    }

    render() {
        if (!this.state.render) return (<div></div>);
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

