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

    render() {
        return (
            <div class="centerdiv">
                <h1> HOME PAGE </h1>
                <Button variant="primary" onClick={this.logOut}>Logout</Button>
            </div>
        )
    }
}

export default Home;