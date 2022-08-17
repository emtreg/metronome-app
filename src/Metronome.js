import './Metronome.css';
import React from 'react';
import tick from './assets/tick.wav';

export class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      bpm: 100,
      btnColor: "green",
      clickTime: 0
    }
    this.clickTimes = [];
    this.tick = new Audio(tick);
    this.handleChange = this.handleChange.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.playTick = this.playTick.bind(this);
    this.setClickTime = this.setClickTime.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
  }

  handleChange(event) {
    const bpm = event.target.value;
    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playTick, (60 / bpm) * 1000);
      this.setState({ bpm: bpm });
    } else {
      this.setState({ bpm: bpm });
    }
  }

  togglePlay() {
    if(this.state.playing) {
      this.setState({clickTime: 0});
      clearInterval(this.timer);
      this.setState({
        playing: false,
        btnColor: "green"
      });
    } else {
      this.timer = setInterval(this.playTick, (60 / this.state.bpm) * 1000);
      this.setState({
        playing: true,
        btnColor: "red"
      }, this.playTick);
    }
   }

  playTick() {
    this.tick.play();
   }

  handleBPMChange() {
    clearInterval(this.timer);
    this.timer = setInterval(this.playTick, (60 / this.state.bpm) * 1000);
  }

  setClickTime() {
    if(this.state.playing) {
      let d = new Date();
      let t = d.getTime();
      this.setState({clickTime: t});
      if (this.state.clickTime !== 0 && t - this.state.clickTime < 2500) {
        console.log("Interval: " + t - this.state.clickTime);
        if (this.clickTimes.length < 4) {
          this.clickTimes.push(t - this.state.clickTime);
        } else {
          this.clickTimes.shift();
          this.clickTimes.push(t - this.state.clickTime);
        }
        console.log("Interval Array: " + this.clickTimes);
        let sumOfIntervals = this.clickTimes.reduce((sum, interval) => {
          return sum + interval;
        });
        console.log("Sum: " + sumOfIntervals);
        let averageInterval = Math.floor((sumOfIntervals / this.clickTimes.length));
        console.log("Average: " + averageInterval);
        let bpm = Math.floor((60 / (averageInterval)) * 1000);
        //add logic if BPM is less than 30
        let finalBpm = bpm > 240 ? 240 : bpm;
        console.log("BPM: " + bpm);
        console.log("Final BPM: " + finalBpm);
        this.setState({bpm: finalBpm}, this.handleBPMChange);
      } else {
        this.clickTimes = [];
      }
    }
   }

  render() {
    let btn_class = this.state.btnColor === "green" ? "greenBtn" : "redBtn";
    return (
      <div class="Metronome">
        <div class="container">
          <header>Metronome</header>
          <p class="bpmOutput">{this.state.bpm} BPM</p>
          <div className="slider-parent">
            <input class="slider" type="range" min="30" max="240" value={this.state.bpm} onChange={this.handleChange}/>
          </div>
          <button class={btn_class} onClick={this.togglePlay}>
            {this.state.playing ? 'Stop' : 'Start'}
          </button>
          <button class="tapBtn" onClick={this.setClickTime}>Tap Beat</button>
        </div>
      </div>
    );
  }
}
