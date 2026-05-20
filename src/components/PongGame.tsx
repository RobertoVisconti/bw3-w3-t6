import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const W = 400,
  H = 260,
  PW = 10,
  PH = 60,
  BALL = 8,
  SPEED = 3;

const PongGame = function () {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const p1 = useRef({ y: H / 2 - PH / 2 });
  const p2 = useRef({ y: H / 2 - PH / 2 });
  const ball = useRef({ x: W / 2, y: H / 2, vx: SPEED, vy: SPEED });
  const keys = useRef<Record<string, boolean>>({});
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);
  const upRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const downRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [started, setStarted] = useState(false);
  const s1Ref = useRef(0);
  const s2Ref = useRef(0);

  const resetBall = (dir = 1) => {
    ball.current = {
      x: W / 2,
      y: H / 2,
      vx: SPEED * dir,
      vy: (Math.random() * 2 - 1) * SPEED,
    };
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, W, H);
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#fff";
    ctx.fillRect(10, p1.current.y, PW, PH);
    ctx.fillRect(W - 20, p2.current.y, PW, PH);
    ctx.beginPath();
    ctx.arc(ball.current.x, ball.current.y, BALL / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  };

  const step = () => {
    const k = keys.current;
    if (k["ArrowUp"] || k["w"] || k["W"])
      p1.current.y = Math.max(0, p1.current.y - 5);
    if (k["ArrowDown"] || k["s"] || k["S"])
      p1.current.y = Math.min(H - PH, p1.current.y + 5);
    const center = p2.current.y + PH / 2;
    if (center < ball.current.y - 4)
      p2.current.y = Math.min(H - PH, p2.current.y + 3);
    else if (center > ball.current.y + 4)
      p2.current.y = Math.max(0, p2.current.y - 3);
    ball.current.x += ball.current.vx;
    ball.current.y += ball.current.vy;
    if (ball.current.y - BALL / 2 < 0) {
      ball.current.y = BALL / 2;
      ball.current.vy *= -1;
    }
    if (ball.current.y + BALL / 2 > H) {
      ball.current.y = H - BALL / 2;
      ball.current.vy *= -1;
    }
    if (
      ball.current.x - BALL / 2 < 20 + PW &&
      ball.current.y > p1.current.y &&
      ball.current.y < p1.current.y + PH
    ) {
      ball.current.vx = Math.abs(ball.current.vx) * 1.05;
      ball.current.vy += ((ball.current.y - (p1.current.y + PH / 2)) / PH) * 4;
      ball.current.x = 20 + PW + BALL / 2;
    }
    if (
      ball.current.x + BALL / 2 > W - 20 - PW &&
      ball.current.y > p2.current.y &&
      ball.current.y < p2.current.y + PH
    ) {
      ball.current.vx = -Math.abs(ball.current.vx) * 1.05;
      ball.current.vy += ((ball.current.y - (p2.current.y + PH / 2)) / PH) * 4;
      ball.current.x = W - 20 - PW - BALL / 2;
    }
    if (ball.current.x < 0) {
      s2Ref.current++;
      setScore2(s2Ref.current);
      resetBall(1);
    }
    if (ball.current.x > W) {
      s1Ref.current++;
      setScore1(s1Ref.current);
      resetBall(-1);
    }
    draw();
  };

  const startGame = () => {
    if (loopRef.current) clearInterval(loopRef.current);
    p1.current = { y: H / 2 - PH / 2 };
    p2.current = { y: H / 2 - PH / 2 };
    s1Ref.current = 0;
    s2Ref.current = 0;
    setScore1(0);
    setScore2(0);
    resetBall(1);
    runningRef.current = true;
    setStarted(true);
    loopRef.current = setInterval(step, 16);
  };

  useEffect(() => {
    draw();
    const kd = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
      if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
    };
    const ku = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, []);

  const btnStyle = {
    width: 60,
    height: 44,
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    background: "#fff",
    fontSize: 18,
    cursor: "pointer",
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
        <h4 style={{ margin: 0 }}>🏓 Pong</h4>
        <div
          style={{ fontSize: 22, fontWeight: 500, display: "flex", gap: 12 }}
        >
          <span>{score1}</span>
          <span style={{ color: "#aaa" }}>:</span>
          <span>{score2}</span>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
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
          fontSize: 13,
          color: "#666",
          margin: "10px 0 4px",
        }}
      >
        {started
          ? "W/S o ↑↓ per muovere la racchetta sinistra"
          : "Premi Start — Tu controlli la racchetta sinistra"}
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
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 12,
          gap: 6,
        }}
      >
        <button
          style={btnStyle}
          onMouseDown={() => {
            upRef.current = setInterval(() => {
              p1.current.y = Math.max(0, p1.current.y - 5);
            }, 16);
          }}
          onMouseUp={() => {
            if (upRef.current) clearInterval(upRef.current);
          }}
          onTouchStart={() => {
            upRef.current = setInterval(() => {
              p1.current.y = Math.max(0, p1.current.y - 5);
            }, 16);
          }}
          onTouchEnd={() => {
            if (upRef.current) clearInterval(upRef.current);
          }}
        >
          ↑
        </button>
        <button
          style={btnStyle}
          onMouseDown={() => {
            downRef.current = setInterval(() => {
              p1.current.y = Math.min(H - PH, p1.current.y + 5);
            }, 16);
          }}
          onMouseUp={() => {
            if (downRef.current) clearInterval(downRef.current);
          }}
          onTouchStart={() => {
            downRef.current = setInterval(() => {
              p1.current.y = Math.min(H - PH, p1.current.y + 5);
            }, 16);
          }}
          onTouchEnd={() => {
            if (downRef.current) clearInterval(downRef.current);
          }}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default PongGame;
