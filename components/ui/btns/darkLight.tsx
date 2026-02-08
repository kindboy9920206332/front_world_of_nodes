"use client";

import React, { useState, useEffect } from "react";

export function DarkLightToggleButton() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    console.log(savedTheme)
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");  
    } else {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");  
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`w-full rounded-xl py-3.5 text-sm font-semibold cursor-pointer transition-all duration-200
        ${isDark ? 'bg-primary-dark text-text-dark hover:bg-primary-dark/80 hover:shadow-lg dark:hover:shadow-primary-dark/30' : 'bg-primary text-text hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/30'}
        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}
