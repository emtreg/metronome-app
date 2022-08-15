import React from 'react';

export class TapButton extends React.Component {
  constructor(props) {
    super(props);
    this.props.text = "Tap Beat"
  }
  render() {
    return <button class="tapBtn">{this.props.text}</button>;
  }
}
