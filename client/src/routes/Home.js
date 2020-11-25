import React, { Component } from "react";

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
                <h1> HOME PAGE </h1>
                <h2> Signed in as - {this.getUserId()}</h2>
            </div>
        )
    }
}

export default Home;