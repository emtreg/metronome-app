import './StartButton.css'
import React from 'react';

export class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Start",
      green: true
    }
    this.toggleText = this.toggleText.bind(this);
  }
  toggleText() {
    if(this.state.text === "Start") {
      this.setState({text: "Stop", green: false});
    } else {
      this.setState({text: "Start", green: true});
    }
  }
  render() {
    let btn_class = this.state.green ? "greenBtn" : "redBtn";
    return <button class={btn_class} onClick={this.toggleText}>{this.state.text}</button>;
  }
}
