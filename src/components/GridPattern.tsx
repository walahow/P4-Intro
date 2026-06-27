"use client";

import React, { useEffect, useState } from "react";

function GridBlock({ x, y, size }: { x: number, y: number, size: number }) {
  const [level, setLevel] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const tick = () => {
      setLevel(prev => {
        const rand = Math.random();
        if (prev === 0) {
          // Extremely high chance to turn ON so more blocks are lit simultaneously
          if (rand > 0.2) return 1;
          return 0;
        } else if (prev === 1) {
          // 2/3 chance to continue to level 2 (full cycle)
          // 1/3 chance to go back to level 0 (short cycle)
          if (rand > 0.333) return 2;
          return 0;
        } else {
          // Always complete the full cycle by returning to 0
          return 0;
        }
      });
      // Slower frequency so blocks stay in their states a bit longer
      timer = setTimeout(tick, 200 + Math.random() * 400);
    };

    // Initial random start
    timer = setTimeout(tick, Math.random() * 500);
    return () => clearTimeout(timer);
  }, []);

  if (level === 0) return null;

  // Hardcoded solid colors (using HSL)
  // 1 = slightly lighter, 2 = slightly darker
  const fill = level === 1 ? "hsl(60, 100%, 70%)" : "hsl(60, 100%, 65%)";

  const inset = size * 0.08; // Curve amount
  const mid = size / 2;

  const pathD = `
    M ${inset} ${inset}
    Q ${mid} 0, ${size - inset} ${inset}
    Q ${size} ${mid}, ${size - inset} ${size - inset}
    Q ${mid} ${size}, ${inset} ${size - inset}
    Q 0 ${mid}, ${inset} ${inset}
    Z
  `;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={pathD}
        fill={fill}
      />
    </g>
  );
}

export function GridPattern() {
  const [blocks, setBlocks] = useState<{ id: string, x: number, y: number }[]>([]);

  const size = 140;
  const gap = -2; // Maintains a consistent gap so they never overlap
  const boxSize = size - gap;
  const radius = 25;

  useEffect(() => {
    const newBlocks = [];
    const cols = Math.ceil(3000 / size);
    const rows = Math.ceil(2000 / size);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const normX = (i * size) / 1920;
        const normY = (j * size) / 1080;

        // Measure distance to the right edge instead of just the top corner
        const distToRight = 1 - normX;

        // 100% packed on the right edge, minimum 40% packed on the left
        const prob = Math.max(0.4, 1.0 - distToRight * 0.6);

        if (Math.random() < prob) {
          newBlocks.push({
            id: `${i}-${j}`,
            x: i * size + gap / 2,
            y: j * size + gap / 2
          });
        }
      }
    }
    setBlocks(newBlocks);
  }, []);

  return (
    <div
      className="absolute right-0 top-0 w-[80%] h-full pointer-events-none z-0"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)'
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {blocks.map(block => (
          <GridBlock
            key={block.id}
            x={block.x}
            y={block.y}
            size={boxSize}
          />
        ))}
      </svg>
    </div>
  );
}
