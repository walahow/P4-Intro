"use client";

import React from "react";
import { motion } from "framer-motion";
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
  return (
    <div className="w-full h-full relative overflow-hidden flex font-sans">
      {/* Bottom Right - Character Shadow */}
      <motion.div
        className="absolute right-[-2%] bottom-[-5%] h-[110%] w-[60%] flex items-end justify-center z-10 pointer-events-none"
        initial={{ x: "50vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.35 }}
      >
        <img
          src={member.image || "/image.png"}
          alt="shadow"
          className="object-contain w-[90%] h-[90%] scale-110 origin-bottom brightness-0 translate-x-[2.1875rem] translate-y-[0.9375rem]"
        />
      </motion.div>

      {/* Bottom Right - Character Portrait */}
      <motion.div
        className="absolute right-[-2%] bottom-[-5%] h-[110%] w-[60%] flex items-end justify-center z-10 pointer-events-none"
        initial={{ x: "50vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.3 }}
      >
        <img
          src={member.image || "/image.png"}
          alt={member.fullName}
          className="object-contain w-[90%] h-[90%] scale-110 origin-bottom"
        />
      </motion.div>

      {/* Left HUD Overlay */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-8 pl-10 pointer-events-none">

        <div className="flex flex-col gap-4 mt-8 scale-[1.35] origin-top-left transition-transform">
          {/* Top Header Container (Stats) */}
          <div className="flex items-start">
            {/* Orange Box protruding from stripes */}
            <motion.div
              className="bg-[hsl(40,94%,48%)] w-[13.125rem] ml-[-2rem] flex flex-col pr-4 pb-2 pt-1 relative z-20"
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
              transition={{ duration: 0.4, ease: "linear", delay: 0.3 }}
            >
              <div className="h-[2.875rem] flex items-end justify-end gap-2">
                <span className="text-[hsl(32,99%,38%)] font-black italic text-3xl tracking-tighter">PLV</span>
                <span className="text-[hsl(0,0%,100%)] font-black italic text-6xl drop-shadow-md leading-none -mb-1">{member.level}</span>
              </div>
              <div className="h-[1.875rem] flex items-end justify-end mt-2">
                <span className="text-[hsl(32,99%,38%)] font-black italic text-2xl leading-none">HP</span>
              </div>
              <div className="h-[1.875rem] flex items-end justify-end mt-0">
                <span className="text-[hsl(32,99%,38%)] font-black italic text-2xl leading-none">SP</span>
              </div>
            </motion.div>

            {/* Name and Progress Bars */}
            <div className="flex flex-col ml-2 mt-[-0.25rem] relative z-0">
              <motion.div
                initial={{ x: -800 }}
                animate={{ x: 0 }}
                exit={{ x: -800, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
                transition={{ duration: 0.4, ease: "linear", delay: 0.55 }}
              >
                <div className="h-[2.875rem] flex items-end">
                  <h2 className="text-[hsl(0,0%,0%)] font-bold text-[2.5rem] tracking-tight drop-shadow-md leading-none">{member.fullName}</h2>
                </div>

                <div className="h-[1.875rem] flex items-end gap-8 mt-2 pl-4">
                  <div className="flex items-baseline gap-2 w-[6.875rem] justify-start">
                    <span className="text-[hsl(0,0%,0%)] font-black italic text-3xl tracking-tighter leading-none">{member.hp.current}</span>
                    <span className="text-[hsl(40,94%,48%)] font-black italic text-2xl leading-none">/</span>
                    <span className="text-[hsl(40,94%,48%)] font-black italic text-2xl tracking-tighter leading-none">{member.hp.max}</span>
                  </div>
                  <div className="w-[11.25rem] h-[1.25rem] border-[0.25rem] border-[hsl(0,0%,0%)] bg-[hsl(0,0%,0%)] rounded-[0.5rem] overflow-hidden relative mb-1">
                    <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[hsl(55,100%,77%)] to-[hsl(40,94%,48%)] rounded-[0.25rem]" style={{ width: `${(member.hp.current / member.hp.max) * 100}%` }} />
                  </div>
                </div>

                <div className="h-[1.875rem] flex items-end gap-8 mt-0 pl-4">
                  <div className="flex items-baseline gap-2 w-[6.875rem] justify-start">
                    <span className="text-[hsl(0,0%,0%)] font-black italic text-3xl tracking-tighter leading-none">{member.sp.current}</span>
                    <span className="text-[hsl(40,94%,48%)] font-black italic text-2xl leading-none">/</span>
                    <span className="text-[hsl(40,94%,48%)] font-black italic text-2xl tracking-tighter leading-none">{member.sp.max}</span>
                  </div>
                  <div className="w-[11.25rem] h-[1.25rem] border-[0.25rem] border-[hsl(0,0%,0%)] bg-[hsl(0,0%,0%)] rounded-[0.5rem] overflow-hidden relative mb-1">
                    <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[hsl(120,73%,78%)] to-[hsl(120,71%,44%)] rounded-[0.25rem]" style={{ width: `${(member.sp.current / member.sp.max) * 100}%` }} />
                  </div>
                </div>
              </motion.div>

              {/* NEXT EXP */}
              <motion.div
                className="flex items-center ml-[-0.8rem] mt-2 relative z-0"
                initial={{ x: -800 }}
                animate={{ x: 0 }}
                exit={{ x: -800, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
                transition={{ duration: 0.4, ease: "linear", delay: 0.5 }}
              >
                <span className="text-[hsl(40,94%,48%)] font-bold text-2xl tracking-widest uppercase leading-none">Next Exp</span>
                <span className="text-[hsl(0,0%,0%)] font-black italic text-3xl ml-2 leading-none">{member.nextExp}</span>
              </motion.div>
            </div>
          </div>

          {/* Middle Left Container (Persona & Arcana) */}
          <div className="relative mt-[-0.75rem] flex items-start gap-2">
            <motion.div
              className="bg-[hsl(60,100%,76%)] px-2 pb-1 w-[10rem] h-[5.625rem] flex items-end justify-between relative ml-[1.625rem] z-20"
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
              transition={{ duration: 0.4, ease: "linear", delay: 0.3 }}
            >
              <span className="text-[hsl(40,94%,48%)] font-light text-2xl leading-none">LV</span>
              <span className="text-[hsl(40,94%,48%)] font-black text-5xl leading-none">{member.persona.level}</span>
            </motion.div>
            <motion.div
              className="flex flex-col justify-between h-[5.625rem] py-1 relative z-0"
              initial={{ x: -800 }}
                animate={{ x: 0 }}
                exit={{ x: -800, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
              transition={{ duration: 0.4, ease: "linear", delay: 0.45 }}
            >
              <span className="text-[hsl(40,94%,48%)] font-medium text-3xl leading-none tracking-tight">{member.persona.name}</span>
              <span className="text-[hsl(40,94%,48%)] font-medium text-3xl leading-none tracking-wide">{member.persona.arcana}</span>
            </motion.div>
          </div>

          {/* Lower Left Container (Attributes) */}
          <div className="flex flex-col gap-1 mt-4 relative">
            {member.stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <motion.div
                  className="bg-[hsl(60,100%,76%)] px-4 py-2 w-[10rem] flex items-center relative ml-[1.625rem] z-20"
                  initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
                  transition={{ duration: 0.4, ease: "linear", delay: 0.3 }}
                >
                  <span className="text-[hsl(38,95%,51%)] font-bold text-2xl leading-none">{stat.name}</span>
                </motion.div>
                <motion.span
                  className="text-[hsl(38,95%,51%)] font-medium text-3xl leading-none tracking-tight relative z-0"
                  initial={{ x: -800 }}
                animate={{ x: 0 }}
                exit={{ x: -800, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
                  transition={{ duration: 0.4, ease: "linear", delay: 0.4 - (idx * 0.05) }}
                >
                  {stat.value}
                </motion.span>
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
          <motion.div
            className="relative"
            initial={{ x: 300, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: 300, y: 0, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.55 }}
          >
            <div className="relative group-hover:-translate-x-1 transition-transform">
              {/* Background stroke layer */}
              <h1
                className="text-black text-[9.375rem] leading-none tracking-tighter absolute left-0 top-0 z-0 pointer-events-none"
                style={{
                  WebkitTextStroke: '0.5rem white'
                }}
              >
                Status
              </h1>
              {/* Foreground text layer */}
              <h1 className="text-black text-[9.375rem] leading-none tracking-tighter relative z-10">
                Status
              </h1>
            </div>
          </motion.div>

          {/* Subtitle underneath */}
          <motion.div
            className="relative mt-[-0.625rem] ml-4"
            initial={{ x: 300, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: 300, y: 0, opacity: 0, transition: { duration: 0.4, delay: 0 } }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.4 }}
          >
            <div className="relative group-hover:-translate-y-1 transition-transform">
              <div
                className="text-black text-4xl tracking-wider absolute left-0 top-0 z-0 pointer-events-none"
                style={{
                  WebkitTextStroke: '0.25rem white'
                }}
              >
                View team member status
              </div>
              <div className="text-black text-4xl tracking-wider relative z-10">
                View team member status
              </div>
            </div>
          </motion.div>
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
