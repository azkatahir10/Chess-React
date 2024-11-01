// src/components/GameUpdates.jsx
import React from 'react';
import '../scss/GameUpdates.scss';

const GameUpdates = ({ player1, player2, currentTurn }) => {
  return (
    <div className="game-updates">
      <div className={`player-info ${currentTurn === player1.name ? 'active-player' : ''}`}>
        <h2>Player 1: {player1.name}</h2>
        <p>Pieces: {player1.color === 'white' ? 'White ♖' : 'Black ♜'}</p>
        <p>Score: {player1.score}</p>
      </div>
      <div className={`player-info ${currentTurn === player2.name ? 'active-player' : ''}`}>
        <h2>Player 2: {player2.name}</h2>
        <p>Pieces: {player2.color === 'white' ? 'White ♖' : 'Black ♜'}</p>
        <p>Score: {player2.score}</p>
      </div>
    </div>
  );
};

export default GameUpdates;
