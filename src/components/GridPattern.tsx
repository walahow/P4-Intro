"use client";

import React, { useEffect, useState, useRef } from "react";

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

export function GridPattern({ variant = "main" }: { variant?: "main" | "detail" }) {
  const [blocks, setBlocks] = useState<{ id: string, x: number, y: number }[]>([]);
  const [winSize, setWinSize] = useState({ w: 1536, h: 864 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridPixelWidth, setGridPixelWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      setGridPixelWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
      const vwScale = window.innerWidth / 1536;
      const vhScale = window.innerHeight / 864;
      setScale(window.innerWidth / window.innerHeight > 1536 / 864 ? vhScale : vwScale);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const size = 112 * scale;
  const gap = -1.5 * scale;
  const boxSize = size - gap;
  const radius = 20 * scale;

  useEffect(() => {
    if (size === 0 || gridPixelWidth === 0) return;
    const newBlocks: { id: string, x: number, y: number }[] = [];
    const cols = Math.ceil(gridPixelWidth / size) + 1;
    const rows = Math.ceil(winSize.h / size) + 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Align blocks to the right edge so the rightmost block is never cut.
        // i = 0 is the rightmost column.
        const blockX = gridPixelWidth - boxSize - i * size;
        const blockY = j * size + gap / 2;

        // Distance from right edge (normalized 0 to 1)
        const distToRight = (i * size) / gridPixelWidth;

        // 100% packed on the right edge, minimum 40% packed on the left
        const prob = Math.max(0.4, 1.0 - distToRight * 0.6);

        if (Math.random() < prob) {
          newBlocks.push({
            id: `${i}-${j}`,
            x: blockX,
            y: blockY
          });
        }
      }
    }
    setBlocks(newBlocks);
  }, [winSize, size, gap, gridPixelWidth, boxSize]);

  const mainStripeTotalWidth = 168;
  const prPadding = winSize.w * 0.45 * 0.04;
  // Subtract 12px to account for the parent container's padding, matching the exact SVG coordinates
  const rightOffset = variant === "main" ? Math.max(0, prPadding + mainStripeTotalWidth - 12) : 0;

  return (
    <div
      ref={containerRef}
      className="absolute top-0 h-full pointer-events-none z-0"
      style={{
        left: 0,
        right: 0,
        maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)'
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translateX(-${rightOffset}px)`,
          transition: 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      >
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
