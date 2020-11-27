import React, { Component } from "react";
import ScrollToTopIcon from "../Media/scrollToTopIcon.svg";
import "./ScrollToTop.css";
import { Fade } from "react-reveal";

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }
  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", function (e) {
      scrollComponent.toggleVisibility();
    });
  }
  toggleVisibility() {
    if (window.pageYOffset > 1) {
      this.setState({ isVisible: true });
    } else {
      this.setState({ isVisible: false });
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  render() {
    return (
      <div className="scroll-to-top" onClick={() => this.scrollToTop()}>
        <Fade bottom when={this.state.isVisible}>
          <img
            src={ScrollToTopIcon}
            width="50"
            height="50"
            // className="d-inline-block align-center mr-2 p-0"
            alt="ScrollToTopIcon logo"
            id="ScrollToTopIcon"
          />
        </Fade>
      </div>
    );
  }
}
