"use client";

import React from "react";
import { GridPattern } from "./GridPattern";

export interface MemberData {
  id: number;
  name: string;
  fullName: string;
  level: string;
  hp: { current: number; max: number };
  sp: { current: number; max: number };
  nextExp: number;
  persona: { name: string; level: number; arcana: string };
  stats: { name: string; value: number }[];
  image: string;
}

interface Props {
  member: MemberData;
  onBack: () => void;
}

export function MemberDetail({ member, onBack }: Props) {
  const leftStripes = [
    { color: "#493E2D", width: 10 },
    { color: "#840020", width: 6 },
    { color: "#E8B2F2", width: 4 },
    { color: "#F4F5FC", width: 14 },
    { color: "#E10042", width: 24 },
    { color: "#FEFF85", width: 20 }, // Anchor stripe
    { color: "#FAFF2B", width: 8 },
    { color: "#D6CB74", width: 6 },
    { color: "#FCFF33", width: 12 },
    { color: "#E25201", width: 18 },
    { color: "#F7A518", width: 6 },
    { color: "#FFFF29", width: 14 },
    { color: "#F6A214", width: 20 }
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex font-sans bg-[#FCFF2E]">
      {/* Background Radial Gradients & Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, #FBEC24 0%, transparent 70%), radial-gradient(circle at bottom right, #FFFF73 0%, transparent 70%)'
        }}
      />
      <GridPattern />

      {/* Far Left - Vertical Colored Stripes */}
      <div className="absolute left-0 top-0 h-full z-0 flex items-start opacity-100">
        {leftStripes.map((stripe, i) => (
          <div 
            key={i} 
            className="h-full relative" 
            style={{ 
              width: `${stripe.width}px`,
              backgroundColor: stripe.color,
              // Subtle inset shadow to simulate the darker top/bottom
              boxShadow: "inset 0px 40px 40px -20px rgba(0,0,0,0.15), inset 0px -40px 40px -20px rgba(0,0,0,0.15)"
            }} 
          />
        ))}
      </div>

      {/* Bottom Right - Character Portrait */}
      <div className="absolute right-[-2%] bottom-[-5%] h-[110%] w-[60%] flex items-end justify-center z-10 pointer-events-none">
        <div 
          className="relative w-full h-full flex items-end justify-center"
          style={{
            filter: 'drop-shadow(35px 15px 0px rgba(0,0,0,1))' // Shadow cast to the right
          }}
        >
          <img 
            src={member.image || "/image.png"} 
            alt={member.fullName} 
            className="object-contain w-[90%] h-[90%] scale-110 origin-bottom"
          />
        </div>
      </div>

      {/* Left HUD Overlay */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-8 pl-8 pointer-events-none">
        
        <div className="flex flex-col gap-6 mt-4">
          {/* Top Header Container (Stats) */}
          <div className="flex items-start">
            {/* Orange Box protruding from stripes */}
            <div className="bg-[#EFA008] w-[210px] ml-[-32px] flex flex-col pr-4 pb-2 pt-1 relative z-10">
              <div className="h-[46px] flex items-end justify-end gap-2">
                <span className="text-[#C17500] font-black italic text-3xl tracking-tighter">PLV</span>
                <span className="text-white font-black italic text-6xl drop-shadow-md leading-none -mb-1">{member.level}</span>
              </div>
              <div className="h-[30px] flex items-end justify-end mt-2">
                <span className="text-[#D87D00] font-black italic text-2xl leading-none">HP</span>
              </div>
              <div className="h-[30px] flex items-end justify-end mt-0">
                <span className="text-[#D87D00] font-black italic text-2xl leading-none">SP</span>
              </div>
            </div>
            
            {/* Name and Progress Bars */}
            <div className="flex flex-col ml-2 pt-1 relative z-10">
              <div className="h-[46px] flex items-end">
                <h2 className="text-black font-bold text-[40px] tracking-tight drop-shadow-md leading-none">{member.fullName}</h2>
              </div>
              
              <div className="h-[30px] flex items-end gap-8 mt-2 pl-4">
                <div className="flex items-baseline gap-2 w-[110px] justify-start">
                  <span className="text-black font-black italic text-3xl tracking-tighter leading-none">{member.hp.current}</span>
                  <span className="text-[#D87D00] font-black italic text-2xl leading-none">/</span>
                  <span className="text-[#D87D00] font-black italic text-2xl tracking-tighter leading-none">{member.hp.max}</span>
                </div>
                <div className="w-[180px] h-[20px] border-[4px] border-black bg-black rounded-[8px] overflow-hidden relative mb-1">
                  <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FFF58A] to-[#EFA008] rounded-[4px]" style={{ width: `${(member.hp.current / member.hp.max) * 100}%` }} />
                </div>
              </div>

              <div className="h-[30px] flex items-end gap-8 mt-0 pl-4">
                <div className="flex items-baseline gap-2 w-[110px] justify-start">
                  <span className="text-black font-black italic text-3xl tracking-tighter leading-none">{member.sp.current}</span>
                  <span className="text-[#D87D00] font-black italic text-2xl leading-none">/</span>
                  <span className="text-[#D87D00] font-black italic text-2xl tracking-tighter leading-none">{member.sp.max}</span>
                </div>
                <div className="w-[180px] h-[20px] border-[4px] border-black bg-black rounded-[8px] overflow-hidden relative mb-1">
                  <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#A0F0A0] to-[#20C020] rounded-[4px]" style={{ width: `${(member.sp.current / member.sp.max) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* NEXT EXP */}
          <div className="flex items-center ml-[178px] mt-[-24px] relative z-10">
            <span className="text-[#EFA008] font-bold text-xl tracking-widest uppercase leading-none">Next Exp</span>
            <span className="text-black font-black italic text-3xl ml-2 leading-none">{member.nextExp}</span>
          </div>

          {/* Middle Left Container (Persona & Arcana) */}
          <div className="relative mt-[-12px] flex items-start gap-2">
            <div className="bg-[#FEFF85] px-2 pb-1 w-[160px] h-[90px] flex items-end justify-between relative ml-[26px]">
              <span className="text-[#D38B00] font-light text-2xl leading-none">LV</span>
              <span className="text-[#D38B00] font-black text-5xl leading-none">{member.persona.level}</span>
            </div>
            <div className="flex flex-col justify-between h-[90px] py-1">
              <span className="text-[#D87D00] font-medium text-4xl drop-shadow-sm leading-none tracking-tight">{member.persona.name}</span>
              <span className="text-[#D87D00] font-medium text-3xl leading-none tracking-wide">{member.persona.arcana}</span>
            </div>
          </div>

          {/* Lower Left Container (Attributes) */}
          <div className="flex flex-col gap-1 mt-4 relative">
            {member.stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="bg-[#FEFF85] px-4 py-2 w-[160px] flex items-center relative ml-[26px]">
                  <span className="text-[#D38B00] font-bold text-2xl leading-none">{stat.name}</span>
                </div>
                <span className="text-[#D87D00] font-medium text-2xl leading-none tracking-tight drop-shadow-sm">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Left Corner (Title) */}
        {/* Bottom Left - HUD Status Text */}
        <div 
          className="absolute bottom-6 left-8 z-20 flex flex-col items-start pointer-events-auto cursor-pointer group"
          onClick={onBack}
        >
          {/* HUGE, NO BOLD, THICK WHITE OUTLINE FIXED OVERLAP */}
          <div className="relative group-hover:-translate-x-1 transition-transform">
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
          <div className="relative mt-[-10px] ml-4 group-hover:-translate-y-1 transition-transform">
            <div 
              className="text-black text-4xl tracking-wider absolute left-0 top-0 z-0 pointer-events-none"
              style={{
                WebkitTextStroke: '4px white'
              }}
            >
              View team member status
            </div>
            <div className="text-black text-4xl tracking-wider relative z-10">
              View team member status
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Corner (HUD / Web Controls) */}
      <div className="absolute bottom-6 right-8 z-30 flex gap-4 pointer-events-auto">
        <div className="flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full border-2 border-[#333] shadow-md">
          <span className="font-mono text-xs bg-[#444] px-2 py-1 rounded">L1</span>
          <span className="font-mono text-xs bg-[#444] px-2 py-1 rounded">R1</span>
          <span className="text-sm font-semibold tracking-wide ml-1 uppercase">Switch Char</span>
        </div>
        <div className="flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full border-2 border-[#333] shadow-md">
          <span className="font-mono text-xs bg-[#444] px-2 py-1 rounded border border-[#666]">Space</span>
          <span className="text-sm font-semibold tracking-wide ml-1 uppercase">Switch Info</span>
        </div>
        <div 
          className="flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full border-2 border-[#333] cursor-pointer hover:bg-[#333] transition-colors shadow-md"
          onClick={onBack}
        >
          <span className="font-mono text-xs bg-[#444] px-2 py-1 rounded border border-[#666]">Esc</span>
          <span className="text-sm font-semibold tracking-wide ml-1 uppercase">Back</span>
        </div>
      </div>
    </div>
  );
}
