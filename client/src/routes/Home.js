import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Home extends Component {
    constructor(props) {
        super(props);
    }


    logOut = () => {
        localStorage.clear();
        fetch('http://localhost:9000/logout', {
            method: 'GET'
        }).then(res => res.json())
            .then(res => {
                if (res.status === 200){
                    this.props.history.push('/');
                }else{
                    alert("Logout failed.")
                }
            });
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