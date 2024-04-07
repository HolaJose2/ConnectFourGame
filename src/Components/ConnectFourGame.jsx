import { useState } from "react";
import { WinnerModal } from "./WinnerModal";
import { checkWinner, checkEndGame } from "../logic/board";
import { TURNS } from "../logic/consts";

//Create Columns and cells
function GameColumn({ col, index, onClick }) {
  return (
    <div className="column" key={`col-${index}`} onClick={onClick}>
      {col.map((cell, index) => {
        return (
          <span className="cell" key={`cell-${col}-${index}`}>
            {cell}
          </span>
        );
      })}
    </div>
  );
}

export function ConnectFourGame() {
  const [board, setBoard] = useState(
    new Array(7).fill(null).map(() => new Array(6).fill(null))
  );
  const [turn, setTurn] = useState(TURNS.Player1);
  const [winner, setWinner] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);

  const closeModal = () => {
    setModalOpen(false);
  };

  const resetGame = () => {
    setBoard(new Array(7).fill(null).map(() => new Array(6).fill(null)));
    setTurn(TURNS.Player1);
    setWinner(null);
  };

  const resetScores = () => {
    setScorePlayer1(0);
    setScorePlayer2(0);
  };

  const addPiece = (columnIndex) => {
    if (winner) return;
    const newBoard = [...board];
    const column = newBoard[columnIndex];
    const piecePosition = column.indexOf(null);

    if (piecePosition !== -1) {
      column[piecePosition] = turn;
      setBoard(newBoard);
      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
        setModalOpen(true);
        newWinner === TURNS.Player1
          ? setScorePlayer1(scorePlayer1 + 1)
          : setScorePlayer2(scorePlayer2 + 1);
        return;
      } else if (checkEndGame(newBoard)) {
        setWinner(false);
        setModalOpen(true);
        return;
      }
      setTurn(turn == TURNS.Player1 ? TURNS.Player2 : TURNS.Player1);
    }
  };

  return (
    <section className="game">
      <div className="board">
        {board.map((col, index) => {
          return (
            <GameColumn
              col={col}
              index={index}
              key={`${col} - ${index}`}
              onClick={() => addPiece(index)}
            />
          );
        })}
      </div>
      <div className="sidebar">
        <section className="turn-container">
          <h3 className="title">Turno:</h3>
          <p className="turn">{turn}</p>
        </section>
        <button onClick={resetGame}>Volver a jugar</button>
        <section className="scores">
          <h3 className="title">Puntajes:</h3>
          <p className="score">🔴Jugador 1 : {scorePlayer1}</p>
          <p className="score">🟡Jugador 2 : {scorePlayer2}</p>
          <button onClick={resetScores}>Borrar Scores</button>
        </section>
      </div>

      <WinnerModal
        winner={winner}
        resetGame={resetGame}
        closeModal={closeModal}
        modalState={modalOpen}
      />
    </section>
  );
}
