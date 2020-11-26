import React, { Component } from "react";
<<<<<<< HEAD
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
=======
import { Button } from "react-bootstrap";

>>>>>>> 8b31b12d9eec781b663c419f2f54ff0fd2ecd61c
class Home extends Component {
    constructor(props) {
        super(props);
    }


    logOut = () => {
        localStorage.clear();
        fetch('http://localhost:9000/logout', {
            method: 'POST'
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
                <Link to="/createTrip">
                    <Button variant="primary" type="submit">
                        Create Trip
                    </Button>{' '}
                </Link>
                <h1> HOME PAGE </h1>
                <Button variant="primary" onClick={this.logOut}>Logout</Button>
                <h2> Signed in as - {this.getUserId()}</h2>
            </div>
        )
    }
}

export default Home;