import './App.css';
import React from 'react';
import { StartButton } from './components/StartButton';
import { TapButton } from './components/TapButton';
import { Slider } from './components/Slider';


export class App extends React.Component {
  render() {
    return (
      <div class="App">
        <div class="metronome">
          <header>Metronome</header>
          <Slider />
          <StartButton />
          <TapButton />
        </div>
      </div>
    );
  }
}
