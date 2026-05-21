import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const COLS = 10,
  ROWS = 20,
  CS = 24;
const COLORS = [
  "#111",
  "#00f0f0",
  "#f0a000",
  "#a000f0",
  "#00f000",
  "#f00000",
  "#0000f0",
  "#f0f000",
];
const SHAPES = [
  [],
  [[1, 1, 1, 1]],
  [
    [2, 2],
    [2, 2],
  ],
  [
    [0, 3, 0],
    [3, 3, 3],
  ],
  [
    [4, 4, 0],
    [0, 4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
  ],
  [
    [6, 0, 0],
    [6, 6, 6],
  ],
  [
    [0, 0, 7],
    [7, 7, 7],
  ],
];

type Piece = { id: number; shape: number[][]; x: number; y: number };

const newBoard = () =>
  Array.from({ length: ROWS }, () => new Array(COLS).fill(0));

const randPiece = (): Piece => {
  const id = Math.floor(Math.random() * 7) + 1;
  const shape = SHAPES[id].map((r) => [...r]);
  return {
    id,
    shape,
    x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
    y: 0,
  };
};

const rotate = (shape: number[][]): number[][] =>
  shape[0].map((_, i) => shape.map((r) => r[i]).reverse());

const TetrisGame = function () {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<number[][]>(newBoard());
  const pieceRef = useRef<Piece>(randPiece());
  const nextPieceRef = useRef<Piece>(randPiece());
  const runningRef = useRef(false);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const linesRef = useRef(0);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [msg, setMsg] = useState("Premi Start per giocare");
  const [started, setStarted] = useState(false);

  const valid = useCallback(
    (p: Piece, dx = 0, dy = 0, sh?: number[][]): boolean => {
      const s = sh || p.shape;
      return s.every((row, r) =>
        row.every((v, c) => {
          if (!v) return true;
          const nx = p.x + c + dx,
            ny = p.y + r + dy;
          return (
            nx >= 0 &&
            nx < COLS &&
            ny < ROWS &&
            (ny < 0 || boardRef.current[ny][nx] === 0)
          );
        }),
      );
    },
    [],
  );

  const drawNext = useCallback(() => {
    const canvas = nextRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 80, 80);
    const s = nextPieceRef.current.shape;
    const ox = Math.floor((4 - s[0].length) / 2) * 20;
    const oy = Math.floor((4 - s.length) / 2) * 20;
    s.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v) {
          ctx.fillStyle = COLORS[v];
          ctx.fillRect(ox + c * 20 + 1, oy + r * 20 + 1, 18, 18);
        }
      }),
    );
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 0.5;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (boardRef.current[r][c]) {
          ctx.fillStyle = COLORS[boardRef.current[r][c]];
          ctx.fillRect(c * CS + 1, r * CS + 1, CS - 2, CS - 2);
        }
        ctx.strokeRect(c * CS, r * CS, CS, CS);
      }
    }
    pieceRef.current.shape.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v) {
          ctx.fillStyle = COLORS[v];
          ctx.fillRect(
            (pieceRef.current.x + c) * CS + 1,
            (pieceRef.current.y + r) * CS + 1,
            CS - 2,
            CS - 2,
          );
        }
      }),
    );
  }, []);

  const place = useCallback(() => {
    const p = pieceRef.current;
    p.shape.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v) boardRef.current[p.y + r][p.x + c] = v;
      }),
    );
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (boardRef.current[r].every((v) => v)) {
        boardRef.current.splice(r, 1);
        boardRef.current.unshift(new Array(COLS).fill(0));
        cleared++;
        r++;
      }
    }
    if (cleared) {
      const pts = [0, 100, 300, 500, 800];
      scoreRef.current += pts[cleared] * levelRef.current;
      linesRef.current += cleared;
      levelRef.current = Math.floor(linesRef.current / 10) + 1;
      setScore(scoreRef.current);
      setLevel(levelRef.current);
      setLines(linesRef.current);
      if (loopRef.current) clearInterval(loopRef.current);
      loopRef.current = setInterval(
        tick,
        Math.max(100, 600 - levelRef.current * 50),
      );
    }
    pieceRef.current = nextPieceRef.current;
    nextPieceRef.current = randPiece();
    drawNext();
    if (!valid(pieceRef.current)) {
      if (loopRef.current) clearInterval(loopRef.current);
      runningRef.current = false;
      setMsg(`Game over! Punteggio: ${scoreRef.current}`);
      setStarted(false);
    }
  }, [valid, drawNext]);

  const tick = useCallback(() => {
    if (!runningRef.current) return;
    if (valid(pieceRef.current, 0, 1)) pieceRef.current.y++;
    else place();
    draw();
  }, [valid, place, draw]);

  const startGame = useCallback(() => {
    if (loopRef.current) clearInterval(loopRef.current);
    boardRef.current = newBoard();
    pieceRef.current = randPiece();
    nextPieceRef.current = randPiece();
    scoreRef.current = 0;
    levelRef.current = 1;
    linesRef.current = 0;
    setScore(0);
    setLevel(1);
    setLines(0);
    setMsg("← → muovi  ↓ scendi  ↑/spazio ruota");
    setStarted(true);
    runningRef.current = true;
    drawNext();
    draw();
    loopRef.current = setInterval(tick, 550);
  }, [draw, drawNext, tick]);

  useEffect(() => {
    draw();
    const handleKey = (e: KeyboardEvent) => {
      if (!runningRef.current) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (valid(pieceRef.current, -1, 0)) pieceRef.current.x--;
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (valid(pieceRef.current, 1, 0)) pieceRef.current.x++;
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (valid(pieceRef.current, 0, 1)) pieceRef.current.y++;
        else place();
      } else if (e.key === "ArrowUp" || e.key === " ") {
        e.preventDefault();
        const r = rotate(pieceRef.current.shape);
        if (valid(pieceRef.current, 0, 0, r)) pieceRef.current.shape = r;
      }
      draw();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [draw, valid, place, tick]);

  const btnStyle = {
    width: 44,
    height: 44,
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    background: "#fff",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={{ maxWidth: 360, margin: "2rem auto", padding: "0 1rem" }}>
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
        <h4 style={{ margin: 0 }}>🟦 Tetris</h4>
        <div style={{ width: 80 }} />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <canvas
          ref={canvasRef}
          width={COLS * CS}
          height={ROWS * CS}
          style={{
            border: "2px solid #ccc",
            borderRadius: 8,
            background: "#111",
            display: "block",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            minWidth: 80,
          }}
        >
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: 8,
              padding: 10,
              fontSize: 12,
              color: "#666",
            }}
          >
            Prossimo
            <canvas
              ref={nextRef}
              width={80}
              height={80}
              style={{
                background: "#111",
                borderRadius: 6,
                display: "block",
                marginTop: 4,
              }}
            />
          </div>
          {[
            ["Punti", score],
            ["Livello", level],
            ["Righe", lines],
          ].map(([label, val]) => (
            <div
              key={label as string}
              style={{
                background: "#f5f5f5",
                borderRadius: 8,
                padding: 10,
                fontSize: 12,
                color: "#666",
              }}
            >
              {label}
              <b
                style={{
                  display: "block",
                  fontSize: 18,
                  color: "#111",
                  marginTop: 2,
                }}
              >
                {val}
              </b>
            </div>
          ))}
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#666",
          margin: "10px 0 4px",
        }}
      >
        {msg}
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 44px)",
          gap: 6,
          margin: "12px auto 0",
          width: "fit-content",
        }}
      >
        <button
          style={btnStyle}
          onClick={() => {
            if (runningRef.current && valid(pieceRef.current, -1, 0)) {
              pieceRef.current.x--;
              draw();
            }
          }}
        >
          ←
        </button>
        <button
          style={btnStyle}
          onClick={() => {
            if (runningRef.current && valid(pieceRef.current, 0, 1)) {
              pieceRef.current.y++;
              draw();
            } else if (runningRef.current) {
              place();
              draw();
            }
          }}
        >
          ↓
        </button>
        <button
          style={btnStyle}
          onClick={() => {
            if (runningRef.current && valid(pieceRef.current, 1, 0)) {
              pieceRef.current.x++;
              draw();
            }
          }}
        >
          →
        </button>
        <button
          style={btnStyle}
          onClick={() => {
            if (!runningRef.current) return;
            const r = rotate(pieceRef.current.shape);
            if (valid(pieceRef.current, 0, 0, r)) {
              pieceRef.current.shape = r;
              draw();
            }
          }}
        >
          ↻
        </button>
      </div>
    </div>
  );
};

export default TetrisGame;
