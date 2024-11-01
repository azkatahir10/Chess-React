import React, { useState } from 'react';
import ChessPiece from './ChessPiece';
import '../scss/ChessBoard.scss';

const ChessBoard = ({ currentTurn, setCurrentTurn }) => {
  const [board, setBoard] = useState([
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
  ]);

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [blinkBorder, setBlinkBorder] = useState(false);

  const getLegalMoves = (piece, index) => {
    const moves = [];
    const isWhite = piece === piece.toUpperCase(); 
    const direction = isWhite ? -1 : 1; 
    const row = Math.floor(index / 8); 
    const col = index % 8; 
  
    if (piece.toLowerCase() === 'p') {
      if (board[index + direction * 8] === null) moves.push(index + direction * 8);
      if (col > 0 && board[index + direction * 8 - 1] && board[index + direction * 8 - 1].toLowerCase() !== piece.toLowerCase()) 
        moves.push(index + direction * 8 - 1); 
      if (col < 7 && board[index + direction * 8 + 1] && board[index + direction * 8 + 1].toLowerCase() !== piece.toLowerCase()) 
        moves.push(index + direction * 8 + 1); 
    }
  
    if (piece.toLowerCase() === 'n') {
      const knightMoves = [
        -17, -15, -10, -6, 
        6, 10, 15, 17
      ];
      knightMoves.forEach(move => {
        const targetIndex = index + move;
        if (targetIndex >= 0 && targetIndex < 64) {
          const targetRow = Math.floor(targetIndex / 8);
          const targetCol = targetIndex % 8;
          if (Math.abs(targetRow - row) <= 2 && Math.abs(targetCol - col) <= 2) {
            if (board[targetIndex] === null || board[targetIndex].toLowerCase() !== piece.toLowerCase()) {
              moves.push(targetIndex);
            }
          }
        }
      });
    }
  
    if (piece.toLowerCase() === 'r') {
      for (let i = 1; i < 8; i++) {
        const directions = [i, -i, i * 8, -i * 8]; 
        directions.forEach(dir => {
          const targetIndex = index + dir;
          if (targetIndex >= 0 && targetIndex < 64) {
            if (board[targetIndex] === null) {
              moves.push(targetIndex); 
            } else if (board[targetIndex].toLowerCase() !== piece.toLowerCase()) {
              moves.push(targetIndex); 
              return; 
            } else {
              return; 
            }
          } else {
            return; 
          }
        });
      }
    }

    if (piece.toLowerCase() === 'b') {
      for (let i = 1; i < 8; i++) {
        const directions = [i * 7, -i * 7, i * 9, -i * 9]; 
        directions.forEach(dir => {
          const targetIndex = index + dir;
          if (targetIndex >= 0 && targetIndex < 64) {
            if (board[targetIndex] === null) {
              moves.push(targetIndex); 
            } else if (board[targetIndex].toLowerCase() !== piece.toLowerCase()) {
              moves.push(targetIndex); 
              return; 
            } else {
              return; 
            }
          } else {
            return; 
          }
        });
      }
    }

    if (piece.toLowerCase() === 'q') {
      for (let i = 1; i < 8; i++) {
        const directions = [i, -i, i * 8, -i * 8, i * 7, -i * 7, i * 9, -i * 9]; 
        directions.forEach(dir => {
          const targetIndex = index + dir;
          if (targetIndex >= 0 && targetIndex < 64) {
            if (board[targetIndex] === null) {
              moves.push(targetIndex); 
            } else if (board[targetIndex].toLowerCase() !== piece.toLowerCase()) {
              moves.push(targetIndex); 
              return; 
            } else {
              return; 
            }
          } else {
            return; 
          }
        });
      }
    }
  
    if (piece.toLowerCase() === 'k') {
      const kingMoves = [
        -1, 1, -8, 8, 
        -7, -9, 7, 9
      ];
      kingMoves.forEach(move => {
        const targetIndex = index + move;
        if (targetIndex >= 0 && targetIndex < 64) {
          if (board[targetIndex] === null || board[targetIndex].toLowerCase() !== piece.toLowerCase()) {
            moves.push(targetIndex);
          }
        }
      });
    }
  
    return moves;
  };
  

  const handleSquareClick = (index) => {
    const piece = board[index];
    const isCurrentTurnWhite = currentTurn === 'Player 1';

    if (selectedSquare === null && piece && ((isCurrentTurnWhite && piece === piece.toUpperCase()) || (!isCurrentTurnWhite && piece === piece.toLowerCase()))) {
      setSelectedSquare(index);
      setLegalMoves(getLegalMoves(piece, index));
    } else if (selectedSquare !== null) {
      const moveIsLegal = legalMoves.includes(index);

      if (moveIsLegal) {
        const updatedBoard = [...board];
        updatedBoard[index] = board[selectedSquare];
        updatedBoard[selectedSquare] = null;
        setBoard(updatedBoard);
        setSelectedSquare(null);
        setLegalMoves([]);

        setCurrentTurn((prevTurn) => (prevTurn === 'Player 1' ? 'Player 2' : 'Player 1'));
      } else {
        setBlinkBorder(true);
        setTimeout(() => setBlinkBorder(false), 1000); 
      }
    }
  };

  return (
    <div className={`chess-board ${blinkBorder ? 'blink' : ''}`}>
      {board.map((piece, index) => (
        <div
          key={index}
          className={`square ${(Math.floor(index / 8) + index) % 2 === 0 ? 'light' : 'dark'} ${index === selectedSquare ? 'selected' : ''} ${legalMoves.includes(index) ? 'highlight' : ''}`}
          onClick={() => handleSquareClick(index)}
        >
          {piece && <ChessPiece type={piece.toLowerCase()} color={piece === piece.toUpperCase() ? 'white' : 'black'} />}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
