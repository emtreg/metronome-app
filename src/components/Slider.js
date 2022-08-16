import './Slider.css';
import React from "react";

export class Slider extends React.Component {
  render() {
    return (
      <div className="slider-parent">
        <input type="range" min="60" max="240" value={this.props.bpm} onChange={this.props.onChange}/>
      </div>
    );
  }
}
