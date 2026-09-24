"use client";

import React from "react";
import * as motion from "motion/react-client";
import { AnimatedTextProps } from "@/app/lib/Types";

const staggerDelay = 0.35;
const letterStaggerDelay = 0.05;

const createLineAnimation = (text: string, lineIndex: number): JSX.Element => {
  const characters: string[] = text.split("");

  const characterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div key={lineIndex} className="flex flex-wrap justify-center">
      {characters.map((char, index) => (
        <motion.span
          key={`${lineIndex}-${index}`}
          variants={characterVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * letterStaggerDelay, duration: 0.3 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const AnimateText: React.FC<AnimatedTextProps> = ({ textLines }) => {
  return (
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-center text-white drop-shadow-lg mb-8 space-y-1">
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
  );
};

export default AnimateText;
