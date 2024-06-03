import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      className="w-full flex  flex-col justify-center items-center bg-chocolate_cosmos text-white py-3"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <p> © {new Date().getFullYear()} · Anderson Torres</p>
      <p className="text-tiny">
        Images from unplash by Aiden Frazier & Eugene Chystiakov
      </p>
    </motion.div>
  );
}
