import { useState, useEffect } from "react";
import Board from "./Board";
import { aiAttack } from "../utils/ai";

const Game = () => {
  // Estado inicial del tablero
  const initialBoard = Array(10).fill(Array(10).fill(null));

  // Estado inicial de los barcos
  const initialShips = [
    { size: 5, orientation: "horizontal" },
    { size: 4, orientation: "horizontal" },
    { size: 3, orientation: "horizontal" },
    { size: 3, orientation: "horizontal" },
    { size: 2, orientation: "horizontal" },
  ];

  // Estados del juego
  const [board, setBoard] = useState(initialBoard);
  const [ships, setShips] = useState(initialShips); // Declaración de `ships`
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");

  // Guardar el estado del juego en localStorage
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("ships", JSON.stringify(ships));
  }, [board, ships]);

  // Función para colocar un barco
  const placeShip = (row, col, shipIndex) => {
    const ship = ships[shipIndex];
    const newBoard = board.map((row) => [...row]);

    for (let i = 0; i < ship.size; i++) {
      const r = ship.orientation === "horizontal" ? row : row + i;
      const c = ship.orientation === "horizontal" ? col + i : col;
      if (r >= 10 || c >= 10 || newBoard[r][c] === "ship") {
        alert("No puedes colocar el barco aquí.");
        return;
      }
      newBoard[r][c] = "ship";
    }

    setBoard(newBoard);
    setShips(ships.filter((_, i) => i !== shipIndex));
  };

  // Función para manejar clics en las celdas
  const handleCellClick = (row, col) => {
    if (!isPlayerTurn || isGameOver || board[row][col] !== null) return;

    const newBoard = board.map((r) => [...r]);
    if (newBoard[row][col] === "ship") {
      newBoard[row][col] = "hit";
      if (newBoard.flat().filter((cell) => cell === "ship").length === 0) {
        setIsGameOver(true);
        alert("¡Ganaste!");
      }
    } else {
      newBoard[row][col] = "miss";
    }

    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // Turno de la IA
  useEffect(() => {
    if (!isPlayerTurn && !isGameOver) {
      const [row, col] = aiAttack(board, difficulty);
      setTimeout(() => {
        const newBoard = board.map((r) => [...r]);
        if (newBoard[row][col] === "ship") {
          newBoard[row][col] = "hit";
          if (newBoard.flat().filter((cell) => cell === "ship").length === 0) {
            setIsGameOver(true);
            alert("¡Perdiste!");
          }
        } else {
          newBoard[row][col] = "miss";
        }
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }, 1000);
    }
  }, [isPlayerTurn]);

  return (
    <div className="game">
      <h1>Batalla Naval</h1>
      <div className="difficulty">
        <label>
          Dificultad:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Fácil</option>
            <option value="medium">Medio</option>
            <option value="hard">Difícil</option>
          </select>
        </label>
      </div>
      <Board board={board} onCellClick={handleCellClick} />
      {ships.length > 0 ? (
        <div>
          <p>Coloca tu barco de tamaño {ships[0].size}</p>
          <button
            onClick={() =>
              setShips([
                ...ships,
                {
                  ...ships[0],
                  orientation: ships[0].orientation === "horizontal" ? "vertical" : "horizontal",
                },
              ])
            }
          >
            Cambiar Orientación
          </button>
        </div>
      ) : (
        <div className="status">
          {isGameOver ? "¡Juego Terminado!" : isPlayerTurn ? "Tu turno" : "Turno de la IA"}
        </div>
      )}
    </div>
  );
};

export default Game;