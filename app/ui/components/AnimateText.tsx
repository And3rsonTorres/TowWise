"use client";

import React from "react";
import * as motion from "motion/react-client";
import { AnimatedTextProps } from "@/app/lib/Types";

const staggerDelay = 0.25;
const letterStaggerDelay = 0.03;

const createLineAnimation = (text: string, lineIndex: number): JSX.Element => {
  const words = text.split(" ");

  const characterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  let charOffset = 0;

  return (
    <div key={lineIndex} className="flex flex-wrap justify-center items-center gap-x-2">
      {words.map((word, wordIndex) => {
        const isGradient =
          word.toLowerCase() === "towwise" ||
          word.toLowerCase() === "simple" ||
          word.toLowerCase().includes("simple");

        const characters = word.split("");
        const startOffset = charOffset;
        charOffset += characters.length + 1;

        return (
          <span key={`${lineIndex}-w-${wordIndex}`} className="inline-flex">
            {characters.map((char, charIndex) => (
              <motion.span
                key={`${lineIndex}-${wordIndex}-${charIndex}`}
                variants={characterVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: (startOffset + charIndex) * letterStaggerDelay,
                  duration: 0.3,
                }}
                className={`inline-block ${
                  isGradient
                    ? "bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    : "text-white font-extrabold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                }`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </div>
  );
};

const AnimateText: React.FC<AnimatedTextProps> = ({ textLines }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 mb-6">
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
        className="max-w-2xl text-slate-100 sm:text-slate-200 text-sm sm:text-base mt-4 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
      >
        Calculate safe continuous towing capacity, discover hitch ratings from small cars to heavy-duty haulers, and verify specs using your 17-digit VIN.
      </motion.p>

      {/* Quick stats / highlights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-xs font-medium"
      >
        <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md flex items-center gap-1.5 text-slate-200">
          🚗 <span>2000–2026 Models</span>
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md flex items-center gap-1.5 text-slate-200">
          🛡️ <span>80% Continuous Safety Margin</span>
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md flex items-center gap-1.5 text-slate-200">
          ⚡ <span>100% Offline VIN Decoding</span>
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md flex items-center gap-1.5 text-slate-200">
          🚙 <span>Compact Sedans & EV Support</span>
        </span>
      </motion.div>
    </div>
  );
};

export default AnimateText;
