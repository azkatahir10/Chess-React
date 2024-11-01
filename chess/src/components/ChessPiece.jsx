import React from 'react';
import '../scss/ChessPiece.scss';

const ChessPiece = ({ type, color }) => {
  const pieceMap = {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', 
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', 
  };

  return <span className={`piece ${color}`}>{pieceMap[type]}</span>;
};

export default ChessPiece;
