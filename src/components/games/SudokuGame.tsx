import { useState, useEffect, useCallback, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

const PUZZLE = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SOLUTION = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

type Cell = { value: number; given: boolean; error: boolean };

const buildBoard = (): Cell[][] =>
  PUZZLE.map((row) =>
    row.map((v) => ({ value: v, given: v !== 0, error: false })),
  );

const SudokuGame = function () {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Cell[][]>(buildBoard);
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(
    null,
  );
  const [errors, setErrors] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [won]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const isHighlighted = (r: number, c: number) => {
    if (!selected) return false;
    const sameBox =
      Math.floor(r / 3) === Math.floor(selected.r / 3) &&
      Math.floor(c / 3) === Math.floor(selected.c / 3);
    return r === selected.r || c === selected.c || sameBox;
  };

  const inputNum = useCallback(
    (n: number) => {
      if (!selected || won) return;
      const { r, c } = selected;
      if (board[r][c].given) return;
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
      newBoard[r][c].value = n;
      if (SOLUTION[r][c] !== n) {
        newBoard[r][c].error = true;
        const newErrors = errors + 1;
        setErrors(newErrors);
      } else {
        newBoard[r][c].error = false;
        const complete = newBoard.every((row, ri) =>
          row.every((cell, ci) => cell.value === SOLUTION[ri][ci]),
        );
        if (complete) setWon(true);
      }
      setBoard(newBoard);
    },
    [selected, board, errors, won],
  );

  const eraseCell = useCallback(() => {
    if (!selected) return;
    const { r, c } = selected;
    if (board[r][c].given) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].value = 0;
    newBoard[r][c].error = false;
    setBoard(newBoard);
  }, [selected, board]);

  const newGame = () => {
    setBoard(buildBoard());
    setSelected(null);
    setErrors(0);
    setSeconds(0);
    setWon(false);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const n = parseInt(e.key);
      if (!isNaN(n) && n >= 1 && n <= 9) inputNum(n);
      if (e.key === "Backspace" || e.key === "Delete") eraseCell();
      if (!selected) return;
      if (e.key === "ArrowUp" && selected.r > 0)
        setSelected({ r: selected.r - 1, c: selected.c });
      if (e.key === "ArrowDown" && selected.r < 8)
        setSelected({ r: selected.r + 1, c: selected.c });
      if (e.key === "ArrowLeft" && selected.c > 0)
        setSelected({ r: selected.r, c: selected.c - 1 });
      if (e.key === "ArrowRight" && selected.c < 8)
        setSelected({ r: selected.r, c: selected.c + 1 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [inputNum, eraseCell, selected]);

  const getCellStyle = (r: number, c: number): CSSProperties => {
    const isSelected = selected?.r === r && selected?.c === c;
    const highlighted = isHighlighted(r, c);
    return {
      background: isSelected ? "#e3f2fd" : highlighted ? "#f5f5f5" : "#fff",
      color: board[r][c].error
        ? "#e53935"
        : board[r][c].given
          ? "#111"
          : "#0a66c2",
      borderRight:
        c === 2 || c === 5 ? "2px solid #aaa" : "0.5px solid #e0e0e0",
      borderBottom:
        r === 2 || r === 5 ? "2px solid #aaa" : "0.5px solid #e0e0e0",
      fontWeight: board[r][c].given ? 600 : 400,
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      cursor: board[r][c].given ? "default" : "pointer",
      userSelect: "none",
    };
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "0 1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            fontSize: 13,
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          ← Indietro
        </button>
        <h4 style={{ margin: 0 }}>Sudoku</h4>
        <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#888" }}>
          <span>⏱ {formatTime(seconds)}</span>
          <span>✗ {errors}/3</span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          border: "2px solid #aaa",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              style={getCellStyle(r, c)}
              onClick={() => setSelected({ r, c })}
            >
              {cell.value !== 0 ? cell.value : ""}
            </div>
          )),
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gap: 6,
          marginTop: 12,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div
            key={n}
            onClick={() => inputNum(n)}
            style={{
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 500,
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              cursor: "pointer",
              background: "#fff",
            }}
          >
            {n}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={eraseCell}
          style={{
            flex: 1,
            padding: "8px",
            fontSize: 13,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Cancella
        </button>
        <button
          onClick={newGame}
          style={{
            flex: 1,
            padding: "8px",
            fontSize: 13,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Nuovo gioco
        </button>
      </div>

      {won && (
        <div
          style={{
            textAlign: "center",
            padding: "1rem",
            fontSize: 16,
            color: "#2e7d32",
            fontWeight: 500,
            marginTop: 12,
          }}
        >
          Complimenti! Hai risolto il Sudoku!
        </div>
      )}

      {errors >= 3 && !won && (
        <div
          style={{
            textAlign: "center",
            padding: "1rem",
            fontSize: 16,
            color: "#e53935",
            fontWeight: 500,
            marginTop: 12,
          }}
        >
          Hai esaurito i tentativi!{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={newGame}
          >
            Riprova
          </span>
        </div>
      )}
    </div>
  );
};

export default SudokuGame;
