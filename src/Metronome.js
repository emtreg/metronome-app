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

  stopPlaying = () => {
    this.setState({lastClick: 0});
    clearInterval(this.timer);
    this.setState({
      playing: false,
      btnColor: "green"
    });
  }

  startPlaying = () => {
    this.timer = setInterval(this.playTick, (60 / this.state.bpm) * 1000);
    this.setState({
      playing: true,
      btnColor: "red"
    }, this.playTick);
  }

  togglePlay = () => {
    if(this.state.playing) {
      this.stopPlaying();
    } else {
      this.startPlaying();
    }
   }

  playTick = () => {
    this.tick.play();
   }

  handleBPMChange = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.playTick, (60 / this.state.bpm) * 1000);
  }

  setLastClick = (currentTime) => {
    this.setState({lastClick: currentTime});
  }

  pushInterval = (interval) => {
    if (this.intervalsArr.length < 4) {
      this.intervalsArr.push(interval);
    } else {
      this.intervalsArr.shift();
      this.intervalsArr.push(interval);
    }
  }

  calculateBpm = () => {
    let sumOfIntervals = this.intervalsArr.reduce((sum, interval) => {
      return sum + interval;
    });
    let averageInterval = Math.floor((sumOfIntervals / this.intervalsArr.length));
    let bpm = Math.floor((60 / (averageInterval)) * 1000);
    let finalBpm = bpm > 240 ? 240 : bpm;
    this.setState({bpm: finalBpm}, this.handleBPMChange);
  }

  startListening = () => {
    if(this.state.playing) {
      let currentDate = new Date();
      let currentTime = currentDate.getTime();
      this.setLastClick(currentTime);
      let interval = currentTime - this.state.lastClick;
      if (this.state.lastClick !== 0 && interval < 2000) {
        this.pushInterval(interval);
        this.calculateBpm();
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
            <input
              class="slider"
              type="range"
              min="30"
              max="240"
              value={this.state.bpm}
              onChange={this.handleChange}/>
          </div>
          <button class={btn_class} onClick={this.togglePlay}>
            {this.state.playing ? 'Stop' : 'Start'}
          </button>
          <button class="tapBtn" onClick={this.startListening}>Tap Beat</button>
        </div>
      </div>
    );
  }
}
