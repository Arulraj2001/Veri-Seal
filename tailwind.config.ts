import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E6570B",
          hover: "#cf4d08",
          light: "#fff1eb",
          dark: "#a63d04",
          foreground: "#FFFFFF",
        },
        "text-main": "#2E241F",
        surface: {
          DEFAULT: "#F1EFEE",
          darker: "#E5E2E0",
          card: "#FFFFFF",
        },
        background: "#FBFAF9",
        "text-on-primary": "#FFFFFF",
        success: {
          DEFAULT: "#16A34A",
          light: "#dcfce7",
          dark: "#15803d",
          foreground: "#FFFFFF",
        },
        error: {
          DEFAULT: "#DC2626",
          light: "#fee2e2",
          dark: "#b91c1c",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#D97706",
          light: "#fef3c7",
          dark: "#b45309",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        tamil: ["var(--font-noto-tamil)", "Noto Sans Tamil", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(46, 36, 31, 0.05), 0 4px 6px -4px rgba(46, 36, 31, 0.03)",
        card: "0 10px 30px -5px rgba(46, 36, 31, 0.06)",
        hover: "0 20px 40px -10px rgba(230, 87, 11, 0.15)",
        focus: "0 0 0 3px rgba(230, 87, 11, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
