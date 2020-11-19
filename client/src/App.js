import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI(endpoint) {
    fetch("http://localhost:9000/" + endpoint)
    .then(res => res.text())
    .then(res => this.setState({ apiResponse: res }))
    .catch(err => err);
  }

  componentDidMount() {
    this.callAPI("account");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <button onClick={() => this.callAPI("account")}>Account</button>
        <button onClick={() => this.callAPI("trip")}>Trip</button>
        <button onClick={() => this.callAPI("destination")}>Destination</button>
        <button onClick={() => this.callAPI("item")}>Item</button>
        <button onClick={() => this.callAPI("expense")}>Expense</button>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
