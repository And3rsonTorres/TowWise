/**
 * AnimatedText component displays text with staggered reveal animation.
 * Each line fades in with a delay, and each character in a line also
 * fades in with a delay. Customizable delays are provided.
 */

import * as motion from "motion/react-client";
import { AnimatedTextProps } from "@/app/lib/Types";

const staggerDelay = 0.5;
const letterStaggerDelay = 0.2;

const createLineAnimation = (text: string, lineIndex: number): JSX.Element => {
  const characters: string[] = text.split("");

  const characterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div key={lineIndex} style={{ display: "flex flex-wrap" }}>
      {characters.map((char, index) => (
        <motion.span
          key={`${lineIndex}-${index}`}
          variants={characterVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * letterStaggerDelay }}
        >
          {char}
          {index !== characters.length - 1 && (
            <motion.span variants={{ visible: { opacity: 0 } }}>
              &#8203;
            </motion.span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

const AnimateText: React.FC<AnimatedTextProps> = ({ textLines }) => {
  return (
    <div className=" text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest text-center ">
      {textLines.map((line, index) => (
        <motion.div
          key={index}
          style={{ display: "Block-inline" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * staggerDelay }}
        >
          {createLineAnimation(line, index)}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimateText;
