import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const COLS = 20,
  ROWS = 20,
  CELL = 20,
  SPEED = 140;

type Point = { x: number; y: number };

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const SnakePage = function () {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>([]);
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const nextRef = useRef<Point>({ x: 1, y: 0 });
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [msg, setMsg] = useState("Premi Start per giocare");
  const [started, setStarted] = useState(false);

  const placeFood = () => {
    let pos: Point;
    do {
      pos = { x: rand(0, COLS - 1), y: rand(0, ROWS - 1) };
    } while (snakeRef.current.some((s) => s.x === pos.x && s.y === pos.y));
    foodRef.current = pos;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff4444";
    ctx.beginPath();
    ctx.roundRect(
      foodRef.current.x * CELL + 2,
      foodRef.current.y * CELL + 2,
      CELL - 4,
      CELL - 4,
      4,
    );
    ctx.fill();

    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#4ade80" : "#22c55e";
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, 3);
      ctx.fill();
    });
  }, []);

  const step = useCallback(() => {
    dirRef.current = { ...nextRef.current };
    const head: Point = {
      x: snakeRef.current[0].x + dirRef.current.x,
      y: snakeRef.current[0].y + dirRef.current.y,
    };

    if (
      head.x < 0 ||
      head.x >= COLS ||
      head.y < 0 ||
      head.y >= ROWS ||
      snakeRef.current.some((s) => s.x === head.x && s.y === head.y)
    ) {
      if (loopRef.current) clearInterval(loopRef.current);
      runningRef.current = false;
      setMsg(`Game over! Punteggio: ${snakeRef.current.length - 3}`);
      setStarted(false);
      return;
    }

    snakeRef.current = [head, ...snakeRef.current];

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      const newScore = snakeRef.current.length - 3;
      setScore(newScore);
      setBest((b) => Math.max(b, newScore));
      placeFood();
    } else {
      snakeRef.current = snakeRef.current.slice(0, -1);
    }

    draw();
  }, [draw]);

  const startGame = useCallback(() => {
    if (loopRef.current) clearInterval(loopRef.current);
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    dirRef.current = { x: 1, y: 0 };
    nextRef.current = { x: 1, y: 0 };
    setScore(0);
    placeFood();
    setMsg("Usa le frecce o i bottoni per muoverti");
    setStarted(true);
    runningRef.current = true;
    draw();
    loopRef.current = setInterval(step, SPEED);
  }, [draw, step]);

  const setDir = (dx: number, dy: number) => {
    if (dx === -dirRef.current.x && dy === -dirRef.current.y) return;
    nextRef.current = { x: dx, y: dy };
  };

  useEffect(() => {
    draw();
    const handleKey = (e: KeyboardEvent) => {
      if (!runningRef.current) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setDir(0, -1);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setDir(0, 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setDir(-1, 0);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setDir(1, 0);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [draw]);

  const btnStyle = {
    width: 44,
    height: 44,
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    background: "#fff",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
        <h4 style={{ margin: 0 }}>🐍 Snake</h4>
        <div style={{ fontSize: 13, color: "#888", display: "flex", gap: 16 }}>
          <span>
            Punti: <b style={{ color: "#111" }}>{score}</b>
          </span>
          <span>
            Record: <b style={{ color: "#111" }}>{best}</b>
          </span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        style={{
          display: "block",
          border: "2px solid #ccc",
          borderRadius: 8,
          background: "#111",
          margin: "0 auto",
        }}
      />

      <p
        style={{
          textAlign: "center",
          fontSize: 14,
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
          gridTemplateColumns: "repeat(3, 44px)",
          gridTemplateRows: "repeat(2, 44px)",
          gap: 6,
          margin: "14px auto 0",
          width: "fit-content",
        }}
      >
        <div />
        <button style={btnStyle} onClick={() => setDir(0, -1)}>
          ↑
        </button>
        <div />
        <button style={btnStyle} onClick={() => setDir(-1, 0)}>
          ←
        </button>
        <button style={btnStyle} onClick={() => setDir(0, 1)}>
          ↓
        </button>
        <button style={btnStyle} onClick={() => setDir(1, 0)}>
          →
        </button>
      </div>
    </div>
  );
};

export default SnakePage;
