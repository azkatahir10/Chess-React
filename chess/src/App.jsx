import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import GameUpdates from './components/GameUpdates';
import './App.css';

function App() {
  const [player1, setPlayer1] = useState({ name: 'Player 1', color: 'white', score: 0 });
  const [player2, setPlayer2] = useState({ name: 'Player 2', color: 'black', score: 0 });
  const [currentTurn, setCurrentTurn] = useState('Player 1');

  const handleCapture = (capturingPlayer) => {
    if (capturingPlayer === 'Player 1') {
      setPlayer1((prev) => ({ ...prev, score: prev.score + 1 }));
    } else {
      setPlayer2((prev) => ({ ...prev, score: prev.score + 1 }));
    }
  };

  return (
    <div className="App">
      <div className="game-container">
        <ChessBoard currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} onCapture={handleCapture} />
        <GameUpdates player1={player1} player2={player2} currentTurn={currentTurn} />
      </div>
    </div>
  );
}

export default App;
