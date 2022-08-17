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
      lastClick: 0
    }
    this.intervalsArr = [];
    this.tick = new Audio(tick);
  }

  handleChange = (event) => {
    const bpm = event.target.value;
    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playTick, (60 / bpm) * 1000);
      this.setState({ bpm: bpm });
    } else {
      this.setState({ bpm: bpm });
    }
  }

  togglePlay = () => {
    if(this.state.playing) {
      this.setState({lastClick: 0});
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

  playTick = () => {
    this.tick.play();
   }

  handleBPMChange = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.playTick, (60 / this.state.bpm) * 1000);
  }

  setlastClick = () => {
    if(this.state.playing) {
      let d = new Date();
      let t = d.getTime();
      this.setState({lastClick: t});
      if (this.state.lastClick !== 0 && t - this.state.lastClick < 2000) {
        console.log("Interval: " + t - this.state.lastClick);
        if (this.intervalsArr.length < 4) {
          this.intervalsArr.push(t - this.state.lastClick);
        } else {
          this.intervalsArr.shift();
          this.intervalsArr.push(t - this.state.lastClick);
        }
        console.log("Interval Array: " + this.intervalsArr);
        let sumOfIntervals = this.intervalsArr.reduce((sum, interval) => {
          return sum + interval;
        });
        console.log("Sum: " + sumOfIntervals);
        let averageInterval = Math.floor((sumOfIntervals / this.intervalsArr.length));
        console.log("Average: " + averageInterval);
        let bpm = Math.floor((60 / (averageInterval)) * 1000);
        //add logic if BPM is less than 30
        let finalBpm = bpm > 240 ? 240 : bpm;
        console.log("BPM: " + bpm);
        console.log("Final BPM: " + finalBpm);
        this.setState({bpm: finalBpm}, this.handleBPMChange);
      } else {
        this.intervalsArr = [];
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
          <button class="tapBtn" onClick={this.setlastClick}>Tap Beat</button>
        </div>
      </div>
    );
  }
}
