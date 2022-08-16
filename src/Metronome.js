import './Metronome.css';
import React from 'react';
import { StartButton } from './components/StartButton';
import { TapButton } from './components/TapButton';
import { Slider } from './components/Slider';


export class Metronome extends React.Component {
  render() {
    return (
      <div class="Metronome">
        <div class="container">
          <header>Metronome</header>
          <Slider />
          <StartButton />
          <TapButton />
        </div>
      </div>
    );
  }
}
