export function WinnerModal({ winner, resetGame, modalState, closeModal }) {
  if (winner === null || !modalState) return;

  const winnerText = winner === false ? "Empate" : "Ganó";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        {winner && <header className="win">{winner}</header>}

        <footer>
          <button onClick={closeModal}>Cerrar ventana</button>
          <button
            style={{ backgroundColor: "#ccc", color: "black" }}
            onClick={resetGame}
          >
            Volver a jugar.
          </button>
        </footer>
      </div>
    </section>
  );
}
