import './Metronome.css';
import React from 'react';
import { TapButton } from './components/TapButton';
import { Slider } from './components/Slider';
import tick from './assets/tick.wav';


export class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      bpm: 150,
      btnColor: "green"
    }
    this.tick = new Audio(tick);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleChange(event) {
    const bpm = event.target.value;
    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({ bpm: bpm });
    } else {
      this.setState({ bpm: bpm });
    }
  }

  handleClick() {
    if(this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false,
        btnColor: "green"
      });
    } else {
      this.timer = setInterval(this.playSound, (60 / this.state.bpm) * 1000);
      this.setState({
        playing: true,
        btnColor: "red"
      }, this.playSound);
    }
   }

   playSound() {
    this.tick.play();
   }

  render() {
    let btn_class = this.state.btnColor === "green" ? "greenBtn" : "redBtn";
    return (
      <div class="Metronome">
        <div class="container">
          <header>Metronome</header>
          <p class="bpmOutput">{this.state.bpm} BPM</p>
          <Slider value={this.state.bpm} onChange={this.handleChange}/>
          <button class={btn_class} onClick={this.handleClick}>
            {this.state.playing ? 'Stop' : 'Start'}
          </button>
          <TapButton />
        </div>
      </div>
    );
  }
}
