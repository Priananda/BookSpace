"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center px-1 w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer ${
        isDark ? "bg-blue-900" : "bg-yellow-300"
      }`}
    >
      <motion.div
        className={`flex items-center w-6 h-6 rounded-full justify-center text-white ${
          isDark ? "bg-blue-500" : "bg-yellow-500"
        }`}
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? "🌙" : "🌞"}
      </motion.div>
    </button>
  );
}
