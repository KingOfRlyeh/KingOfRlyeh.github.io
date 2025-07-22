import React, { useRef, useEffect } from "react";

// Terminal color scheme (customize as needed)
const BG_COLOR = "#111";         // Very dark background
const GRID_COLOR = "#ffe066";    // Neon yellow
const GLOW = true;               // Toggle for soft glow/shadow

function drawTonnetzGrid(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  // Styling
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 2;
  ctx.shadowColor = GLOW ? GRID_COLOR : "transparent";
  ctx.shadowBlur = GLOW ? 16 : 0;

  // Tonnetz lattice parameters
  const cols = 9; // horizontal (perfect fifths)
  const rows = 7; // vertical (major/minor thirds)
  const cellW = width / (cols + 1);
  const cellH = height / (rows + 1);

  // Draw grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c + 1) * cellW;
      const y = (r + 1) * cellH;

      // Draw hex node
      ctx.beginPath();
      ctx.arc(x, y, cellW * 0.2, 0, 2 * Math.PI);
      ctx.stroke();

      // Draw horizontal line (perfect fifth)
      if (c < cols - 1) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellW, y);
        ctx.stroke();
      }

      // Draw diagonal up (major third)
      if (r > 0 && c < cols - 1) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellW, y - cellH);
        ctx.stroke();
      }

      // Draw diagonal down (minor third)
      if (r < rows - 1 && c < cols - 1) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellW, y + cellH);
        ctx.stroke();
      }
    }
  }
}

export default function TonnetzBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      drawTonnetzGrid(ctx, canvas.width, canvas.height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // The z-index should be 0, and main content should use higher z-index.
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",    // lets user click through it
        background: BG_COLOR,
        transition: "background 0.5s"
      }}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
