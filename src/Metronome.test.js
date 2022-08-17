import { render, screen } from '@testing-library/react';
import { Metronome } from './Metronome';

test('renders metronome', () => {
  render(<Metronome />);
  const headerText = screen.getByText(/Metronome/i);
  expect(headerText).toBeInTheDocument();
});

test('renders start/stop button', () => {
  render(<Metronome />);
  const startStopButtonText = screen.getByText(/Start/i);
  expect(startStopButtonText).toBeInTheDocument();
});

test('renders tap beat button', () => {
  render(<Metronome />);
  const tapBeatButtonText = screen.getByText(/Tap Beat/i);
  expect(tapBeatButtonText).toBeInTheDocument();
});

test('renders slider', () => {
  render(<Metronome />);
  const slider = screen.getByRole(/slider/i);
  expect(slider).toBeInTheDocument();
});
