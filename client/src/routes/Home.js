import React, { Component } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
class Home extends Component {
    constructor(props) {
        super(props);
    }

    getUserId = () => {
        return localStorage.getItem("id");
    }

    render() {
        return (
            
            <div className="centerdiv">
                <Link to="/createTrip">
                    <Button variant="primary" type="submit">
                        Create Trip
                    </Button>{' '}
                </Link>
                <h1> HOME PAGE </h1>
                <h2> Signed in as - {this.getUserId()}</h2>
            </div>
        )
    }
}

export default Home;