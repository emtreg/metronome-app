import './App.css';
import React from 'react';
import { StartButton } from './components/StartButton';
import { TapButton } from './components/TapButton';


export class App extends React.Component {
  render() {
    return (
      <div class="App">
        <div class="metronome">
          <header>Metronome</header>
          <StartButton />
          <TapButton />
        </div>
      </div>
    );
  }
}
