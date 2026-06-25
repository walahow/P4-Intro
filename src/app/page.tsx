"use client";

import React, { useState } from "react";

export default function PersonaStatusScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const members = [
    { id: 1, name: "Yu", level: "PLV 50" },
    { id: 2, name: "Yosuke", level: "PLV 48" },
    { id: 3, name: "Chie", level: "PLV 47" },
    { id: 4, name: "Yukiko", level: "PLV 47" },
    { id: 5, name: "Kanji", level: "PLV 45" },
    { id: 6, name: "Rise", level: "PLV 45" },
    { id: 7, name: "Teddie", level: "PLV 44" },
    { id: 8, name: "Naoto", level: "PLV 46" }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#FFEB00] font-sans selection:bg-black selection:text-white flex text-black">
      {/* Background Elements */}
      
      {/* Subtle darker yellow blob on the top right for name bar contrast */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-[#E6D400] rounded-full blur-[100px] opacity-70 pointer-events-none" />

      {/* Grid Pattern on the right side */}
      <div 
        className="absolute right-0 top-0 w-1/2 h-full opacity-50 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #E6D400 1px, transparent 1px), linear-gradient(to bottom, #E6D400 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Left - Title Section */}
      <div className="absolute top-8 left-12 z-20 flex flex-col items-start">
        {/* HUGE, BOLD, THICK BLACK OUTLINE */}
        <h1 
          className="text-white font-black text-[150px] leading-none italic -skew-x-12 tracking-tighter"
          style={{
            WebkitTextStroke: '4px black',
            textShadow: '8px 8px 0px rgba(0,0,0,1)'
          }}
        >
          Status
        </h1>
        {/* Pill underneath */}
        <div className="mt-[-10px] ml-10 bg-white text-black font-bold text-2xl px-8 py-2 rounded-full border-4 border-black -skew-x-12 shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center">
          <span className="skew-x-12 tracking-wider">View whose status?</span>
        </div>
      </div>

      {/* Center Left - Character Portrait */}
      <div className="absolute left-[-10%] top-[5%] h-[120%] w-[60%] flex items-center justify-center z-10 pointer-events-none">
        {/* A container for the image to apply the specific shadow */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{
            filter: 'drop-shadow(-15px 15px 0px rgba(0,0,0,1))'
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
      <div className="absolute right-0 top-0 h-full w-[45%] z-20 flex items-center">
        {/* Background Stripes */}
        <div className="absolute inset-0 flex justify-end overflow-hidden pointer-events-none opacity-80 -skew-x-12 scale-125 origin-right pr-20">
            <div className="w-12 bg-[#FF8C00] h-full mx-1"></div>
            <div className="w-3 bg-white h-full mx-1"></div>
            <div className="w-10 bg-[#D40000] h-full mx-1"></div>
            <div className="w-1 bg-[#000000] h-full mx-1 opacity-20"></div>
        </div>

        {/* Menu Items Container */}
        <div className="relative z-30 w-full flex flex-col items-end pr-16 space-y-2 mt-20">
          {members.map((member, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={member.id}
                onClick={() => setSelectedIndex(index)}
                className={`
                  group relative flex items-center justify-between w-[75%] px-6 py-3 
                  text-3xl font-black italic -skew-x-12 transition-all duration-200
                  border-y-4 border-l-4 border-black border-r-0
                  ${isSelected ? 'bg-black text-white scale-110 -translate-x-8 shadow-[-10px_10px_0px_rgba(230,212,0,1)]' : 'bg-[#FFEB00] text-black hover:bg-[#FFF580] hover:-translate-x-4 border-r-4'}
                `}
              >
                {/* Inner skew correction for text to keep it somewhat readable while maintaining the skew vibe */}
                <div className="flex w-full justify-between items-center z-10 px-2">
                  <span className="tracking-widest uppercase">{member.name}</span>
                  <span className={`text-xl font-bold ${isSelected ? 'text-[#FFEB00]' : 'text-gray-800'}`}>
                    {member.level}
                  </span>
                </div>
                
                {/* Decorative lines for unselected items to mimic the UI */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-transparent border-t border-b border-black/20 pointer-events-none m-1"></div>
                )}
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
        <div className="flex items-center gap-3 text-xl font-black italic -skew-x-12 bg-white px-5 py-2 border-4 border-black rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="text-blue-500 text-3xl font-bold leading-none -mt-1">×</div>
          <span className="tracking-widest mt-1 uppercase">OK</span>
        </div>
      </div>
    </div>
  );
}
