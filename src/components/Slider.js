import './Slider.css';
import React from "react";
import { useState } from 'react';

export class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '30'};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div className="slider-parent">
        <p className="bpmOutput">{this.state.value} BPM</p>
        <input type="range" min="30" max="244" value={this.state.value} onChange={this.handleChange}  />
      </div>

    );
  }
}
