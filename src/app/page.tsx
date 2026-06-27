"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { MemberDetail, MemberData } from "../components/MemberDetail";

const WipeBlock = ({ color, zIndex, delay }: { color: string, zIndex: string, delay: number }) => (
  <motion.div
    className={`fixed top-0 left-0 h-screen w-[150vw] ${color} ${zIndex} pointer-events-none`}
    style={{
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 20vw 50%)'
    }}
    initial={{ x: "-50vw" }}
    animate={{ x: "100vw" }}
    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: delay }}
  />
);

const ChevronTransition = () => {
  return (
    <>
      <WipeBlock color="bg-[hsl(180,100%,88%)]" zIndex="z-[60]" delay={0.09} /> {/* Cyan (Thin) */}
      <WipeBlock color="bg-[hsl(342,100%,46%)]" zIndex="z-[70]" delay={0.08} /> {/* Pink/Red (Thinner) */}
      <WipeBlock color="bg-[hsl(353,100%,19%)]" zIndex="z-[80]" delay={0.05} /> {/* Dark Red (Thin) */}
      <WipeBlock color="bg-[hsl(71,100%,52%)]" zIndex="z-[90]" delay={0.03} /> {/* Yellow (Thinner) */}
      <WipeBlock color="bg-black" zIndex="z-[100]" delay={0.0} /> {/* Black Initial Screen */}
    </>
  );
};

export default function PersonaStatusScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const members: MemberData[] = [
    {
      id: 1,
      name: "Yu",
      fullName: "Yu Narukami",
      level: "50",
      hp: { current: 345, max: 345 },
      sp: { current: 154, max: 154 },
      nextExp: 2450,
      persona: { name: "Izanagi", level: 50, arcana: "Fool" },
      stats: [{ name: "Creativity", value: 42 }, { name: "Logic", value: 26 }],
      image: "/image.png"
    },
    {
      id: 2,
      name: "Yosuke",
      fullName: "Yosuke Hanamura",
      level: "48",
      hp: { current: 280, max: 300 },
      sp: { current: 110, max: 140 },
      nextExp: 1800,
      persona: { name: "Jiraiya", level: 48, arcana: "Magician" },
      stats: [{ name: "Creativity", value: 38 }, { name: "Logic", value: 30 }],
      image: "/image.png"
    },
    {
      id: 3,
      name: "Chie",
      fullName: "Chie Satonaka",
      level: "47",
      hp: { current: 310, max: 310 },
      sp: { current: 80, max: 95 },
      nextExp: 1200,
      persona: { name: "Tomoe", level: 47, arcana: "Chariot" },
      stats: [{ name: "Creativity", value: 35 }, { name: "Logic", value: 22 }],
      image: "/image.png"
    },
    {
      id: 4,
      name: "Yukiko",
      fullName: "Yukiko Amagi",
      level: "47",
      hp: { current: 220, max: 240 },
      sp: { current: 180, max: 190 },
      nextExp: 1500,
      persona: { name: "Konohana Sakuya", level: 47, arcana: "Priestess" },
      stats: [{ name: "Creativity", value: 45 }, { name: "Logic", value: 40 }],
      image: "/image.png"
    },
    {
      id: 5,
      name: "Kanji",
      fullName: "Kanji Tatsumi",
      level: "45",
      hp: { current: 400, max: 400 },
      sp: { current: 60, max: 70 },
      nextExp: 900,
      persona: { name: "Take-Mikazuchi", level: 45, arcana: "Emperor" },
      stats: [{ name: "Creativity", value: 48 }, { name: "Logic", value: 15 }],
      image: "/image.png"
    },
    {
      id: 6,
      name: "Rise",
      fullName: "Rise Kujikawa",
      level: "45",
      hp: { current: 200, max: 200 },
      sp: { current: 250, max: 250 },
      nextExp: 1100,
      persona: { name: "Himiko", level: 45, arcana: "Lovers" },
      stats: [{ name: "Creativity", value: 50 }, { name: "Logic", value: 35 }],
      image: "/image.png"
    },
    {
      id: 7,
      name: "Teddie",
      fullName: "Teddie",
      level: "44",
      hp: { current: 250, max: 280 },
      sp: { current: 130, max: 150 },
      nextExp: 800,
      persona: { name: "Kintoki-Douji", level: 44, arcana: "Star" },
      stats: [{ name: "Creativity", value: 40 }, { name: "Logic", value: 25 }],
      image: "/image.png"
    },
    {
      id: 8,
      name: "Naoto",
      fullName: "Naoto Shirogane",
      level: "46",
      hp: { current: 260, max: 260 },
      sp: { current: 160, max: 160 },
      nextExp: 1400,
      persona: { name: "Sukuna-Hikona", level: 46, arcana: "Fortune" },
      stats: [{ name: "Creativity", value: 35 }, { name: "Logic", value: 50 }],
      image: "/image.png"
    }
  ];

  useEffect(() => {
    if (isDetailView) return; // Disable keyboard nav when in detail view

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : members.length - 1));
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < members.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Enter") {
        setIsDetailView(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDetailView, members.length]);

  return (
    <div className="h-screen w-screen bg-[#141414] p-[0.375rem] flex items-center justify-center overflow-hidden font-sans">
      <ChevronTransition />
      <div
        className="w-full h-full rounded-[0.75rem] overflow-hidden relative flex text-black selection:bg-black selection:text-white p4-background"
      >
        {/* Universal Animated Background */}
        <AnimatedBackground variant={isDetailView ? "detail" : "main"} />

        <AnimatePresence>
          {isDetailView && (
            <motion.div
              key="detail-view"
              className="absolute inset-0 z-20 pointer-events-auto"
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              <MemberDetail member={members[selectedIndex]} onBack={() => setIsDetailView(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isDetailView && (
            /* --- MAIN MENU UI --- */
            <motion.div 
              key="main-menu"
              className="absolute inset-0 z-20 pointer-events-auto overflow-hidden"
              exit={{ opacity: 1, transition: { duration: 0.8 } }}
            >

              {/* Top Left - Title Section */}
            <div className="absolute top-2 left-4 z-20 flex flex-col items-start">
              {/* HUGE, NO BOLD, THICK WHITE OUTLINE FIXED OVERLAP */}
              <motion.div
                className="relative"
                initial={{ x: -800, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -800, opacity: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }}
                transition={{ duration: 800 / 2000, ease: "linear", delay: isInitialLoad ? 0.15 : 0 }}
              >
                {/* Background stroke layer */}
                <h1
                  className="text-black text-[150px] leading-none tracking-tighter absolute left-0 top-0 z-0 pointer-events-none"
                  style={{
                    WebkitTextStroke: '8px white'
                  }}
                >
                  Status
                </h1>
                {/* Foreground text layer */}
                <h1 className="text-black text-[150px] leading-none tracking-tighter relative z-10">
                  Status
                </h1>
              </motion.div>

              {/* Subtitle underneath */}
              <motion.div
                className="relative mt-[-10px] ml-4"
                initial={{ x: -1200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1200, opacity: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 } }}
                transition={{ duration: 1200 / 2000, ease: "linear", delay: (isInitialLoad ? 0.15 : 0) + (400 / 2000) }}
              >
                <div
                  className="text-black text-4xl tracking-wider absolute left-0 top-0 z-0 pointer-events-none"
                  style={{
                    WebkitTextStroke: '4px white'
                  }}
                >
                  View whose status?
                </div>
                <div className="text-black text-4xl tracking-wider relative z-10">
                  View whose status?
                </div>
              </motion.div>
            </div>

            {/* Center Left - Character Portrait */}
            <div className="absolute left-[-2%] top-[5%] h-[120%] w-[60%] flex items-center justify-center z-10 pointer-events-none">
              {/* Shadow Layer */}
              <motion.div
                key={`shadow-${selectedIndex}`}
                initial={{ x: "-25vw", y: "100vh" }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: "-50vw", opacity: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 } }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (isInitialLoad ? 0.15 : 0) + 0.05 }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <img
                  src={members[selectedIndex].image}
                  alt="Character Shadow"
                  className="object-contain w-[80%] h-[80%] scale-110 brightness-0 -translate-x-[35px] translate-y-[15px]"
                />
              </motion.div>

              {/* Character Layer */}
              <motion.div
                key={`char-${selectedIndex}`}
                initial={{ x: "-25vw", y: "100vh" }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: "-50vw", opacity: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isInitialLoad ? 0.15 : 0 }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <img
                  src={members[selectedIndex].image}
                  alt="Character Portrait"
                  className="object-contain w-[80%] h-[80%] scale-110"
                />
              </motion.div>
            </div>

            {/* Right Side - Menu Selection */}
            <div className="absolute right-0 top-0 h-full w-[45%] z-20 flex items-start">
              {/* Menu Items Container */}
              <div className="relative z-30 w-full flex flex-col items-end pr-[15%] space-y-[8px] mt-16">
                {members.map((member, index) => {
                  const isSelected = selectedIndex === index;
                  const spacing = 100; // Approximate pixel height + gap of each bar
                  const distance = 200 + index * spacing;
                  const speed = 1000; // pixels per second for a slower fall
                  const duration = distance / speed;
                  const fallDelay = (isInitialLoad ? 0.7 : 0) + index * (spacing / speed);

                  return (
                      <motion.button
                      key={member.id}
                      onClick={() => setIsDetailView(true)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      initial={{ y: -distance, opacity: 0, zIndex: 100 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transitionEnd: { zIndex: isSelected ? 50 : 1 }
                      }}
                      exit={{ 
                        x: 200, 
                        opacity: 0, 
                        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.04 } 
                      }}
                      transition={{
                        duration: duration,
                        ease: "linear", // constant speed, no slowing down
                        delay: fallDelay
                      }}
                      className={`
                      rounded-sm group relative flex items-center justify-between w-[90%] px-10 py-2 
                      transition-all duration-200
                      ${isSelected ? 'bg-[#252525] text-white shadow-lg z-10 scale-[1.02]' : 'bg-[#FFF380] text-[#D35400] hover:bg-[#FFF8A0]'}
                    `}
                    >
                      {/* Text and Level */}
                      <div className="flex w-full justify-center items-center z-10 px-2 relative">
                        <span className={`text-[28px] tracking-wide ${isSelected ? 'text-white font-normal' : 'text-[#D35400] font-semibold'}`}>
                          {member.name}
                        </span>

                        {/* Level Indicator */}
                        <div className="absolute right-0 flex items-center gap-3">
                          {isSelected && (
                            <span className="text-[#555555] font-black italic -skew-x-12 text-lg uppercase tracking-widest mt-1">
                              PLV
                            </span>
                          )}
                          <span className={`text-4xl font-black italic ${isSelected ? 'text-white' : 'text-[#D8BA12]'}`}>
                            {member.level}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Right - Action Prompts */}
            <div className="absolute bottom-8 right-12 z-30 flex gap-6">
              <div className="flex items-center gap-3 text-xl font-black italic -skew-x-12 bg-white px-5 py-2 border-4 border-black rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="w-6 h-6 rounded-full border-4 border-red-500 flex items-center justify-center bg-transparent"></div>
                <span className="tracking-widest mt-1 uppercase">Back</span>
              </div>
              <div
                className="flex items-center gap-3 text-xl font-black italic -skew-x-12 bg-white px-5 py-2 border-4 border-black rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setIsDetailView(true)}
              >
                <div className="text-blue-500 text-3xl font-bold leading-none -mt-1">×</div>
                <span className="tracking-widest mt-1 uppercase">OK</span>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
