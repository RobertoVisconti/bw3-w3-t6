import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GRID = 3;
const CELL = 100;
const IMAGE_URL = "https://picsum.photos/seed/linkedin/300/300";

const shuffle = (arr: number[]): number[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const formatTime = (s: number) => {
  const m = Math.floor(s / 60),
    sec = s % 60;
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
};

const PuzzleGame = function () {
  const navigate = useNavigate();
  const [tiles, setTiles] = useState<number[]>([...Array(GRID * GRID).keys()]);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [won, setWon] = useState(false);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSolved = useCallback((t: number[]) => t.every((v, i) => v === i), []);

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTiles(shuffle([...Array(GRID * GRID).keys()]));
    setSelected(null);
    setMoves(0);
    setSeconds(0);
    setWon(false);
    setStarted(true);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleClick = useCallback(
    (pos: number) => {
      if (won || !started) return;
      const emptyIdx = tiles.indexOf(GRID * GRID - 1);
      const posRow = Math.floor(pos / GRID),
        posCol = pos % GRID;
      const emptyRow = Math.floor(emptyIdx / GRID),
        emptyCol = emptyIdx % GRID;
      const adjacent =
        Math.abs(posRow - emptyRow) + Math.abs(posCol - emptyCol) === 1;

      if (adjacent) {
        const newTiles = [...tiles];
        [newTiles[pos], newTiles[emptyIdx]] = [
          newTiles[emptyIdx],
          newTiles[pos],
        ];
        setTiles(newTiles);
        setMoves((m) => m + 1);
        setSelected(null);
        if (isSolved(newTiles)) {
          setWon(true);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      } else {
        setSelected(selected === pos ? null : pos);
      }
    },
    [tiles, selected, won, started, isSolved],
  );

  const getCellStyle = (tileIdx: number, pos: number): React.CSSProperties => {
    const isEmpty = tileIdx === GRID * GRID - 1;
    if (isEmpty) {
      return {
        width: CELL,
        height: CELL,
        borderRadius: 6,
        background: "#f0f0f0",
        border: "2px dashed #ddd",
      };
    }
    const row = Math.floor(tileIdx / GRID);
    const col = tileIdx % GRID;
    return {
      width: CELL,
      height: CELL,
      borderRadius: 6,
      backgroundImage: `url(${IMAGE_URL})`,
      backgroundSize: `${CELL * GRID}px ${CELL * GRID}px`,
      backgroundPosition: `-${col * CELL}px -${row * CELL}px`,
      cursor: "pointer",
      border: selected === pos ? "2px solid #0a66c2" : "2px solid transparent",
      transition: "border 0.15s",
    };
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: "0 1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
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
        <h4 style={{ margin: 0 }}>🧩 Puzzle</h4>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#888" }}>
          <span>
            Mosse: <b style={{ color: "#111" }}>{moves}</b>
          </span>
          <span>
            ⏱ <b style={{ color: "#111" }}>{formatTime(seconds)}</b>
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`,
          gap: 4,
          margin: "0 auto",
          width: "fit-content",
        }}
      >
        {tiles.map((tileIdx, pos) => (
          <div
            key={pos}
            style={getCellStyle(tileIdx, pos)}
            onClick={() => tileIdx !== GRID * GRID - 1 && handleClick(pos)}
          />
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#666",
          margin: "12px 0 4px",
        }}
      >
        {won
          ? `Completato in ${moves} mosse e ${formatTime(seconds)}! 🎉`
          : started
            ? "Clicca un pezzo vicino allo spazio vuoto per spostarlo"
            : "Premi Start per giocare"}
      </p>

      <button
        onClick={startGame}
        style={{
          display: "block",
          margin: "0 auto",
          padding: "8px 24px",
          fontSize: 13,
          borderRadius: 8,
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {started ? "↺ Ricomincia" : "▶ Start"}
      </button>
    </div>
  );
};

export default PuzzleGame;
