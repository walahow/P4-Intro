"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GridPattern() {
  const [blocks, setBlocks] = useState<{
    id: string, 
    x: number, 
    y: number, 
    maxOpacity: number, 
    delay: number, 
    duration: number
  }[]>([]);
  
  const size = 80;
  const gap = 12; // Space between grid boxes
  const boxSize = size - gap;
  const radius = 16; // Rounded corners

  useEffect(() => {
    const newBlocks = [];
    const cols = Math.ceil(3000 / size);
    const rows = Math.ceil(2000 / size);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const normX = (i * size) / 1920;
        const normY = (j * size) / 1080;
        
        // Pivot on top right (x=1, y=0)
        const distToTopRight = Math.sqrt(Math.pow(1 - normX, 2) + Math.pow(normY, 2));
        
        // Probability of block existing, higher near top right
        const prob = Math.max(0, 0.45 - distToTopRight * 0.35);
        
        if (Math.random() < prob) {
          const maxOpacity = 0.15 + Math.random() * 0.35;
          const delay = Math.random() * 4; // Random delay up to 4s
          const duration = 2 + Math.random() * 4; // Random duration between 2s and 6s
          
          newBlocks.push({
            id: `${i}-${j}`,
            x: i * size + gap / 2,
            y: j * size + gap / 2,
            maxOpacity,
            delay,
            duration
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
        {/* Randomly Lit Up Blinking Blocks powered by Framer Motion */}
        {blocks.map(block => (
          <motion.rect 
            key={block.id}
            x={block.x}
            y={block.y}
            width={boxSize}
            height={boxSize}
            rx={radius}
            ry={radius}
            fill="#FFFFFF"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, block.maxOpacity, 0] }}
            transition={{
              duration: block.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: block.delay
            }}
          />
        ))}
      </svg>
    </div>
  );
}
