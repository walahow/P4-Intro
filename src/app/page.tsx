"use client";

import React, { useState } from "react";
import { GridPattern } from "../components/GridPattern";
import { MemberDetail, MemberData } from "../components/MemberDetail";

export default function PersonaStatusScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDetailView, setIsDetailView] = useState(false);

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
      image: "/image.png" // Fallback to same image for dummy data
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

  if (isDetailView) {
    return (
      <div className="h-screen w-screen bg-[#141414] p-[6px] overflow-hidden font-sans">
        <div className="w-full h-full rounded-[12px] overflow-hidden relative flex">
          <MemberDetail member={members[selectedIndex]} onBack={() => setIsDetailView(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#141414] p-[6px] overflow-hidden font-sans">
      <div 
        className="w-full h-full rounded-[12px] overflow-hidden relative flex text-black selection:bg-black selection:text-white p4-background"
      >
      {/* Background Elements */}
      
      {/* Subtle darker yellow blob on the top right for name bar contrast */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-[#E6D400] rounded-full blur-[100px] opacity-70 pointer-events-none" />

      {/* Grid Pattern on the right side */}
      <GridPattern />

      {/* Top Left - Title Section */}
      <div className="absolute top-2 left-4 z-20 flex flex-col items-start">
        {/* HUGE, NO BOLD, THICK WHITE OUTLINE FIXED OVERLAP */}
        <div className="relative">
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
        </div>

        {/* Subtitle underneath */}
        <div className="relative mt-[-10px] ml-4">
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
        </div>
      </div>

      {/* Center Left - Character Portrait */}
      <div className="absolute left-[-2%] top-[5%] h-[120%] w-[60%] flex items-center justify-center z-10 pointer-events-none">
        {/* A container for the image to apply the specific shadow */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{
            filter: 'drop-shadow(-35px 15px 0px rgba(0,0,0,1))'
          }}
        >
          <img 
            src="/image.png" 
            alt="Character Portrait" 
            className="object-contain w-[80%] h-[80%] scale-110"
          />
        </div>
      </div>

      {/* Right Side - Vertical Stripes & Menu Selection */}
      <div className="absolute right-0 top-0 h-full w-[45%] z-20 flex items-start">
        {/* Background Stripes (Hard Edged with Vertical Gradients and Varying Widths) */}
        <div className="absolute inset-0 flex justify-end overflow-hidden pointer-events-none opacity-100 pr-[4%]">
          {[
            { middle: "#FEFF87", glossy: "#FAC83E", width: 8 },
            { middle: "#FEFF87", glossy: "#FAC83E", width: 12 },
            { middle: "#E90045", glossy: "#970021", width: 6 },
            { middle: "#CCB8FE", glossy: "#C7BDF5", width: 10 },
            { middle: "#7C0027", glossy: "#540012", width: 14 },
            { middle: "#8CD6FB", glossy: "#8ED3FF", width: 8 },
            { middle: "#7C68F3", glossy: "#5927C0", width: 12 },
            { middle: "#FEFF7B", glossy: "#DBBA08", width: 6 },
            { middle: "#987C06", glossy: "#733B09", width: 10 },
            { middle: "#FCF818", glossy: "#E9A606", width: 14 },
            { middle: "#72DD40", glossy: "#37A505", width: 8 },
            { middle: "#E9F6ED", glossy: "#F9F4F8", width: 10 },
            { middle: "#E9F6ED", glossy: "#88A9A0", width: 6 },
            { middle: "#967014", glossy: "#927310", width: 12 },
            { middle: "#D2FF41", glossy: "#70E906", width: 8 },
            { middle: "#F6B01F", glossy: "#AC790B", width: 14 },
            { middle: "#FBEC24", glossy: "#ACA14E", width: 10 }
          ].reverse().map((stripe, i) => (
            <div 
              key={i} 
              className="h-full" 
              style={{ 
                width: `${stripe.width}px`,
                background: `linear-gradient(to bottom, ${stripe.glossy} 0%, ${stripe.middle} 50%, ${stripe.glossy} 100%)` 
              }} 
            />
          ))}
        </div>

        {/* Menu Items Container */}
        <div className="relative z-30 w-full flex flex-col items-end pr-[15%] space-y-[8px] mt-16">
          {members.map((member, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={member.id}
                onClick={() => setIsDetailView(true)}
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
              </button>
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
    </div>
  </div>
  );
}
