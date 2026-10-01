"use client";

import React from "react";
import * as motion from "motion/react-client";
import { AnimatedTextProps } from "@/app/lib/Types";

const staggerDelay = 0.25;
const letterStaggerDelay = 0.03;

const createLineAnimation = (text: string, lineIndex: number): JSX.Element => {
  const characters: string[] = text.split("");

  const characterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const isGradient = text.toLowerCase() === "towwise" || text.toLowerCase() === "simple";

  return (
    <div key={lineIndex} className="flex flex-wrap justify-center">
      {characters.map((char, index) => (
        <motion.span
          key={`${lineIndex}-${index}`}
          variants={characterVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * letterStaggerDelay, duration: 0.3 }}
          className={`inline-block ${
            isGradient
              ? "bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent font-black"
              : "text-white"
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const AnimateText: React.FC<AnimatedTextProps> = ({ textLines }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 mb-6">
      {/* Top feature badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-sm shadow-sm"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Next.js 15 • 2,000+ Vehicles • 100% Offline VIN Engine</span>
      </motion.div>

      {/* Main animated title */}
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-center drop-shadow-lg space-y-1">
        {textLines.map((line, index) => (
          <motion.div
            key={index}
            className="inline-block mx-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * staggerDelay, duration: 0.4 }}
          >
            {createLineAnimation(line, index)}
          </motion.div>
        ))}
      </div>

      {/* Subtitle description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="max-w-2xl text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-normal"
      >
        Calculate safe continuous towing capacity, discover hitch ratings from small cars to heavy-duty haulers, and verify specs using your 17-digit VIN.
      </motion.p>

      {/* Quick stats / highlights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-xs text-slate-300"
      >
        <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-sm flex items-center gap-1.5">
          🚗 <span>2000–2026 Models</span>
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-sm flex items-center gap-1.5">
          🛡️ <span>80% Continuous Safety Margin</span>
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-sm flex items-center gap-1.5">
          ⚡ <span>100% Offline VIN Decoding</span>
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-sm flex items-center gap-1.5">
          🚙 <span>Compact Sedans & EV Support</span>
        </span>
      </motion.div>
    </div>
  );
};

export default AnimateText;
