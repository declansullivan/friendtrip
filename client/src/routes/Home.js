import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Home extends Component {
    constructor(props) {
        super(props);
    }


    logOut = () => {
        this.props.history.push('/');
        localStorage.clear();
    }
    
    getUserId = () => {
        return localStorage.getItem("id");
    }

    render() {
        return (
            <div className="centerdiv">
                <h1> HOME PAGE </h1>
                <Button variant="primary" onClick={this.logOut}>Logout</Button>
                <h2> Signed in as - {this.getUserId()}</h2>
            </div>
        )
    }
}

export default Home;