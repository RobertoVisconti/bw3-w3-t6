import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const W = 300,
  H = 400,
  GAP = 110,
  PIPE_W = 40,
  SPEED = 2.2,
  GRAVITY = 0.35,
  JUMP = -7;

type Pipe = { x: number; top: number; scored: boolean };

const FlappyGame = function () {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bird = useRef({ x: 60, y: H / 2, vy: 0 });
  const pipes = useRef<Pipe[]>([]);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const frameRef = useRef(0);
  const runningRef = useRef(false);
  const startedRef = useRef(false);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [best, setBest] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const drawBird = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.translate(bird.current.x, bird.current.y);
    ctx.rotate(Math.min(Math.PI / 4, bird.current.vy * 0.05));
    ctx.fillStyle = "#f0c000";
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e08000";
    ctx.beginPath();
    ctx.moveTo(10, -2);
    ctx.lineTo(18, 0);
    ctx.lineTo(10, 4);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(5, -3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(6, -3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawPipe = (ctx: CanvasRenderingContext2D, p: Pipe) => {
    ctx.fillStyle = "#3a9e3a";
    ctx.fillRect(p.x, 0, PIPE_W, p.top);
    ctx.fillRect(p.x, p.top + GAP, PIPE_W, H - p.top - GAP);
    ctx.fillStyle = "#2d7d2d";
    ctx.fillRect(p.x - 4, p.top - 16, PIPE_W + 8, 16);
    ctx.fillRect(p.x - 4, p.top + GAP, PIPE_W + 8, 16);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#ded895";
    ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = "#5eb85e";
    ctx.fillRect(0, H - 48, W, 12);
    pipes.current.forEach((p) => drawPipe(ctx, p));
    drawBird(ctx);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(scoreRef.current), W / 2, 50);
    if (!runningRef.current && startedRef.current) {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("Game Over", W / 2, H / 2 - 20);
      ctx.font = "16px sans-serif";
      ctx.fillText(`Punteggio: ${scoreRef.current}`, W / 2, H / 2 + 10);
      ctx.fillText(`Record: ${bestRef.current}`, W / 2, H / 2 + 35);
    }
  }, []);

  const handleGameOver = useCallback(() => {
    runningRef.current = false;
    if (scoreRef.current > bestRef.current) {
      bestRef.current = scoreRef.current;
      setBest(bestRef.current);
    }
    setGameOver(true);
    draw();
  }, [draw]);

  const step = useCallback(() => {
    if (!runningRef.current) return;
    bird.current.vy += GRAVITY;
    bird.current.y += bird.current.vy;
    if (bird.current.y - 10 < 0 || bird.current.y + 10 > H - 40) {
      handleGameOver();
      return;
    }
    if (frameRef.current % 90 === 0) {
      const top = 60 + Math.random() * (H - GAP - 120);
      pipes.current.push({ x: W, top, scored: false });
    }
    pipes.current.forEach((p) => {
      p.x -= SPEED;
      if (!p.scored && p.x + PIPE_W < bird.current.x) {
        p.scored = true;
        scoreRef.current++;
      }
      if (
        bird.current.x + 12 > p.x &&
        bird.current.x - 12 < p.x + PIPE_W &&
        (bird.current.y - 10 < p.top || bird.current.y + 10 > p.top + GAP)
      ) {
        handleGameOver();
      }
    });
    pipes.current = pipes.current.filter((p) => p.x > -PIPE_W);
    frameRef.current++;
    draw();
  }, [draw, handleGameOver]);

  const flap = useCallback(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      runningRef.current = true;
      bird.current = { x: 60, y: H / 2, vy: 0 };
      pipes.current = [];
      scoreRef.current = 0;
      frameRef.current = 0;
      setStarted(true);
      setGameOver(false);
      if (loopRef.current) clearInterval(loopRef.current);
      loopRef.current = setInterval(step, 16);
    }
    if (!runningRef.current) return;
    bird.current.vy = JUMP;
  }, [step]);

  const restart = useCallback(() => {
    startedRef.current = false;
    runningRef.current = false;
    if (loopRef.current) clearInterval(loopRef.current);
    setStarted(false);
    setGameOver(false);
    bird.current = { x: 60, y: H / 2, vy: 0 };
    pipes.current = [];
    scoreRef.current = 0;
    frameRef.current = 0;
    draw();
  }, [draw]);

  useEffect(() => {
    draw();
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [draw, flap]);

  return (
    <div style={{ maxWidth: 320, margin: "2rem auto", padding: "0 1rem" }}>
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
        <h4 style={{ margin: 0 }}>🐦 Flappy Bird</h4>
        <span style={{ fontSize: 13, color: "#888" }}>
          Record: <b style={{ color: "#111" }}>{best}</b>
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={flap}
        style={{
          display: "block",
          border: "2px solid #ccc",
          borderRadius: 8,
          margin: "0 auto",
          cursor: "pointer",
        }}
      />
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#666",
          margin: "10px 0 4px",
        }}
      >
        {!started
          ? "Clicca o premi Spazio per iniziare"
          : gameOver
            ? "Clicca Riprova per giocare ancora"
            : "Clicca o premi Spazio per saltare"}
      </p>
      <button
        onClick={gameOver ? restart : flap}
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
        {!started ? "▶ Start" : gameOver ? "↺ Riprova" : "↑ Salta"}
      </button>
    </div>
  );
};

export default FlappyGame;
