"use client";
import { motion } from "framer-motion";
import HomeIcon from "./HomeIcon";
export default function Home() {
  return (
  <>
  <nav className="bg-redbase p-2 flex justify-center">
      <HomeIcon />
    </nav>
  <div className="flex items-center justify-center h-screen bg-gray-800">
      <motion.div
        initial={{ opacity: 0, x: '-100vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-yellow   text-8xl font-bold mb-4">Coming Soon</h1>
        <div className="text-2xl">
      <p>
        <span className="text-3xl font-bold text-yellow">L</span>earn  
        <span className="text-3xl font-bold text-yellow"> W</span>hat  
        <span className="text-3xl font-bold text-yellow"> Y</span>ou  
        <span className="text-3xl font-bold text-yellow"> C</span>an  
        <span className="text-3xl font-bold text-yellow"> T</span>ow
      </p>
    </div>
      </motion.div>
    </div>
  </>);
}
