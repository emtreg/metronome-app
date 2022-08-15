import './App.css';
import React from 'react';
import { StartButton } from './components/StartButton';

export class App extends React.Component {
  render() {
    return (
      <div class="App">
        <div class="metronome">
          <header>Metronome</header>
          <StartButton></StartButton>
        </div>
      </div>
    );
  }
}

// export default App;
