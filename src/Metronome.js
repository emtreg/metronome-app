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

  //handles manual slider movement
  handleChange = (event) => {
    //store current slider value in bpm variable
    const bpm = event.target.value;
    //check if metronome is playing
    if(this.state.playing) {
      //if playing, reset the timer with the new bpm
      clearInterval(this.timer);
      this.timer = setInterval(this.playTick, (60 / bpm) * 1000);
      //set the new bpm
      this.setState({ bpm: bpm });
    } else {
      //if not playing, update the bpm with the new slider value
      this.setState({ bpm: bpm });
    }
  }

  //stops the metronome
  stopPlaying = () => {
    //resets the last click time for the 'tap beat' button
    this.setState({lastClick: 0});
    //clears the timer interval
    clearInterval(this.timer);
    //changes the playing state to false and the Start/Stop button color to green
    this.setState({
      playing: false,
      btnColor: "green"
    });
  }

  startPlaying = () => {
    //create a new timer with the current bpm
    this.timer = setInterval(this.playTick, (60 / this.state.bpm) * 1000);
    //changes the playing state to false and the Start/Stop button color to green
    this.setState({
      playing: true,
      btnColor: "red"
    }, this.playTick); //begins playing metronome right after state is updated
  }

  //starts or stops the metronome
  togglePlay = () => {
    if(this.state.playing) {
      this.stopPlaying();
    } else {
      this.startPlaying();
    }
   }

   //plays a tick noise
  playTick = () => {
    this.tick.play();
   }

  //handles bpm changes when user taps the beat
  handleBPMChange = () => {
    //clears the old timer
    clearInterval(this.timer);
    //creates a new timer with the updated bpm
    this.timer = setInterval(this.playTick, (60 / this.state.bpm) * 1000);
  }

  //updates the last clicked time for the 'tap beat' button
  setLastClick = (currentTime) => {
    this.setState({lastClick: currentTime});
  }

  //pushes time between 'tap beat' button clicks to an array of intervals
  pushInterval = (interval) => {
    // if less than 4 intervals have been recorded, push interval to the array
    if (this.intervalsArr.length < 4) {
      this.intervalsArr.push(interval);
    } else {
      // else remove the first interval from the array and push the new interval
      this.intervalsArr.shift();
      this.intervalsArr.push(interval);
    }
  }

  decreaseBpm = () => {
    let decreasedBpm = this.state.bpm - 1;
    if (decreasedBpm > 30) {
      if (this.state.playing) {
        this.setState({ bpm: decreasedBpm }, this.handleBPMChange);
      } else {
        this.setState({ bpm: decreasedBpm });
      }
    }
  }

  increaseBpm = () => {
    let increasedBpm = Number(this.state.bpm) + 1;
    if (increasedBpm < 240) {
      if (this.state.playing) {
        this.setState({ bpm: increasedBpm }, this.handleBPMChange);
      } else {
        this.setState({ bpm: increasedBpm });
      }
    }
  }

  //calculates bpm based on 'tap beat' button intervals
  calculateBpm = () => {
    //sum the intervals in the intervalsArr
    let sumOfIntervals = this.intervalsArr.reduce((sum, interval) => {
      return sum + interval;
    });
    //calculate the average interval length
    let averageInterval = Math.floor((sumOfIntervals / this.intervalsArr.length));
    //use average interval length to calculate the new bpm
    let bpm = Math.floor((60 / (averageInterval)) * 1000);
    //if the bpm is greater than 240, set the final bpm to 240
    let finalBpm = bpm > 240 ? 240 : bpm;
    //update the bpm and handle change
    this.setState({ bpm: finalBpm }, this.handleBPMChange);
  }

  //begins recording intervals between 'tap beat' button clicks
  startListening = () => {
    //only start listening if metronome is playing
    if(this.state.playing) {
      //get the time of new click
      let currentDate = new Date();
      let currentTime = currentDate.getTime();
      //set the last clicked time to the current time
      this.setLastClick(currentTime);
      //calculate the interval between the last click and new click
      let interval = currentTime - this.state.lastClick;
      //check if there has been more than one click
      //check if the interval between clicks is less than 2 seconds
      if (this.state.lastClick !== 0 && interval < 2000) {
        //push the time between clicks to the interval array
        this.pushInterval(interval);
        //calculate the new bpm
        this.calculateBpm();
      } else {
        //if there are not at least 2 clicks or if there are more than 2 seconds between clicks
        //clear the intervals array
        this.intervalsArr = [];
      }
    }
  }

  //renders the metronome app
  render() {
    //changes the class name for the start/stop button to update css styling
    let btn_class = this.state.btnColor === "green" ? "greenBtn" : "redBtn";
    return (
      <div class="Metronome">
        <div class="container">
          <header>Metronome</header>
          <p class="bpmOutput">{this.state.bpm} BPM</p>
          <div class="row">
            <button class="block plusMinusBtn" onClick={this.decreaseBpm}>-</button>
            <div class="block">
              <div className="slider-parent">
                <input
                  class="slider"
                  type="range"
                  min="30"
                  max="240"
                  value={this.state.bpm}
                  onChange={this.handleChange}/>
              </div>
            </div>
            <button class="block plusMinusBtn" onClick={this.increaseBpm}>+</button>
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
