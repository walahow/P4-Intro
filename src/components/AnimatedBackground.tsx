"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { GridPattern } from "./GridPattern";

type BackgroundVariant = "main" | "detail";

interface Props {
  variant: BackgroundVariant;
}

// Set A: Main Page Stripes (Reverted to original sizes)
const mainStripeData = [
  { middle: "#FBEC24", glossy: "#ACA14E", width: 10 },
  { middle: "#F6B01F", glossy: "#AC790B", width: 14 },
  { middle: "#D2FF41", glossy: "#70E906", width: 8 },
  { middle: "#967014", glossy: "#927310", width: 12 },
  { middle: "#E9F6ED", glossy: "#88A9A0", width: 6 },
  { middle: "#E9F6ED", glossy: "#F9F4F8", width: 10 },
  { middle: "#72DD40", glossy: "#37A505", width: 8 },
  { middle: "#FCF818", glossy: "#E9A606", width: 14 },
  { middle: "#987C06", glossy: "#733B09", width: 10 },
  { middle: "#FEFF7B", glossy: "#DBBA08", width: 6 },
  { middle: "#7C68F3", glossy: "#5927C0", width: 12 },
  { middle: "#8CD6FB", glossy: "#8ED3FF", width: 8 },
  { middle: "#7C0027", glossy: "#540012", width: 14 },
  { middle: "#CCB8FE", glossy: "#C7BDF5", width: 10 },
  { middle: "#E90045", glossy: "#970021", width: 6 },
  { middle: "#FEFF87", glossy: "#FAC83E", width: 12 },
  { middle: "#FEFF87", glossy: "#FAC83E", width: 8 },
];

// Set B: Detail Page Stripes (Reverted to original sizes)
const detailStripeData = [
  { color: "hsl(37, 24%, 23%)", width: 10 },
  { color: "hsl(346, 100%, 26%)", width: 6 },
  { color: "hsl(293, 76%, 86%)", width: 4 },
  { color: "hsl(233, 40%, 97%)", width: 14 },
  { color: "hsl(342, 100%, 44%)", width: 24 },
  { color: "hsl(60, 100%, 76%)", width: 20 },
  { color: "hsl(61, 100%, 58%)", width: 8 },
  { color: "hsl(53, 53%, 65%)", width: 6 },
  { color: "hsl(61, 100%, 60%)", width: 12 },
  { color: "hsl(22, 99%, 45%)", width: 18 },
  { color: "hsl(38, 93%, 53%)", width: 6 },
  { color: "hsl(60, 100%, 58%)", width: 14 },
  { color: "hsl(38, 92%, 52%)", width: 20 }
];

function Stripe({ stripe, variant, totalStripes, staggerTime, screenHeight }: any) {
  const isGoingRight = variant === "main";

  // Stagger order:
  // Going Left (to Detail): Leftmost goes first (index 0)
  // Going Right (to Main): Rightmost goes first (index total-1)
  const delay = isGoingRight
    ? (totalStripes - 1 - stripe.index) * staggerTime
    : stripe.index * staggerTime;

  const isFirstRender = useRef(true);
  const x = useMotionValue(
    isFirstRender.current && variant === "main" ? stripe.detailX : (variant === "main" ? stripe.mainX : stripe.detailX)
  );
  const bow = useMotionValue(0);
  const previousVariant = useRef(isFirstRender.current && variant === "main" ? "detail" : variant);

  useEffect(() => {
    isFirstRender.current = false;
    const targetX = variant === "main" ? stripe.mainX : stripe.detailX;
    const isVariantChange = previousVariant.current !== variant;
    previousVariant.current = variant;

    // If it's just a window resize, snap immediately (duration 0, delay 0)
    // If it's a page transition, use the staggered animation
    const currentDelay = isVariantChange ? delay : 0;
    const duration = isVariantChange ? 0.7 : 0;

    animate(x, targetX, { delay: currentDelay, duration, ease: [0.25, 0.1, 0.25, 1] });

    if (isVariantChange) {
      // Bow direction: 
      // Moving Right: middle stays back or pulls forward? 
      // If moving Right, physics drag means middle pulls forward, edges trail back. 
      // So curve bulges Right (Positive).
      // Moving Left: curve bulges Left (Negative).
      const bowPeak = isGoingRight ? 120 : -120;
      animate(bow, [0, bowPeak, 0], { delay: currentDelay, duration, ease: "easeInOut", times: [0, 0.5, 1] });
    }
  }, [variant, stripe.mainX, stripe.detailX, delay, isGoingRight, x, bow]);

  const d = useTransform([x, bow], ([currentX, currentBow]) => {
    const w = stripe.width;
    const h = screenHeight;
    const cX = currentX as number;
    const b = currentBow as number;

    // Smooth Quadratic Bezier (C-shape)
    // Starts at top, bows at middle (h/2), connects to bottom.
    return `M ${cX} 0 Q ${cX + b} ${h / 2} ${cX} ${h} L ${cX + w} ${h} Q ${cX + w + b} ${h / 2} ${cX + w} 0 Z`;
  });

  return <motion.path d={d as any} fill={stripe.fill} />;
}

export function AnimatedBackground({ variant }: Props) {
  const [winSize, setWinSize] = useState({ w: 1536, h: 864 });

  useEffect(() => {
    const handleResize = () => {
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const staggerTime = 0.025; // 25ms delay per stripe (approx 0.75s total stagger)

  // Calculate coordinates
  const mainStripeTotalWidth = mainStripeData.reduce((acc, s) => acc + s.width, 0); // 168px

  // Set A (Main Stripes)
  // Sits on right side of main page, 4% from the right edge.
  // We need to account for the flex container behavior in page.tsx that was:
  // right-0 w-[45%] pr-[4%] flex justify-end
  // So the rightmost edge of the stripes is winSize.w * 0.55 + winSize.w * 0.45 * 0.96
  // Or simply: winSize.w - (winSize.w * 0.45 * 0.04)
  const prPadding = winSize.w * 0.45 * 0.04;
  let currentMainX = winSize.w - prPadding - mainStripeTotalWidth;
  // Detail page: goes completely offscreen left
  let currentMainDetailX = -mainStripeTotalWidth - 200;

  const stripesA = mainStripeData.map((s, idx) => {
    const stripe = {
      id: `main-${idx}`,
      width: s.width,
      fill: `url(#grad-${idx})`,
      mainX: currentMainX,
      detailX: currentMainDetailX,
      index: idx
    };
    currentMainX += s.width;
    currentMainDetailX += s.width;
    return stripe;
  });

  // Set B (Detail Stripes) total width = 486px
  // Main page: goes completely offscreen right
  let currentDetailMainX = winSize.w + 200;
  // Detail page: Sits flush on the left edge
  let currentDetailDetailX = 0;

  const stripesB = detailStripeData.map((s, idx) => {
    const globalIdx = mainStripeData.length + idx;
    const stripe = {
      id: `detail-${idx}`,
      width: s.width,
      fill: s.color,
      mainX: currentDetailMainX,
      detailX: currentDetailDetailX,
      index: globalIdx
    };
    currentDetailMainX += s.width;
    currentDetailDetailX += s.width;
    return stripe;
  });

  const allStripes = [...stripesA, ...stripesB];

  return (
    <>
      {/* GRID LAYER - Z-index 0, stationary */}
      <div className="absolute left-0 top-0 h-full w-full pointer-events-none z-0 overflow-hidden">
        <GridPattern variant={variant} />
      </div>

      {/* MAIN MENU AESTHETIC BLOB - Z-index 5 */}
      {/* Moved from page.tsx so it renders BEHIND the stripes (which are z-10) */}
      {variant === "main" && (
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-[#E6D400] rounded-full blur-[100px] opacity-70 pointer-events-none z-5" />
      )}

      {/* SWEEPING STRIPES LAYER - Z-index 10 */}
      <svg
        className="absolute inset-0 z-10 pointer-events-none"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <defs>
          {mainStripeData.map((s, idx) => (
            <linearGradient key={`grad-${idx}`} id={`grad-${idx}`} x1="0" y1={-0.1 * winSize.h} x2="0" y2={1.1 * winSize.h} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={s.glossy} />
              <stop offset="50%" stopColor={s.middle} />
              <stop offset="100%" stopColor={s.glossy} />
            </linearGradient>
          ))}
        </defs>

        {allStripes.map((stripe) => (
          <Stripe
            key={stripe.id}
            stripe={stripe}
            variant={variant}
            totalStripes={allStripes.length}
            staggerTime={staggerTime}
            screenHeight={winSize.h}
          />
        ))}
      </svg>
    </>
  );
}
