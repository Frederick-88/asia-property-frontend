import React, { Component } from "react";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      incremented: 0,
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  // https://github.com/alvianzf/ecommerce-shopping-cart/blob/master/src/App.js
  updateTime = () => {
    this.setState({
      date: new Date(),
    });
  };

  render() {
    return (
      <div>
        <h1 className="sample-title">Hello, world!</h1>
        <p>Supposely icon show below</p>
        <i className="icon-earth" />
        <i className="icon-language" />
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
