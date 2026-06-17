import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          surface: "#141414",
          card: "#1C1C1C",
          elevated: "#242424",
        },
        bronze: {
          DEFAULT: "#CD7F32",
          light: "#E8A857",
          dark: "#8B5E23",
          subtle: "#2A1F0E",
          border: "#3D2E12",
        },
        text: {
          primary: "#F5F5F0",
          secondary: "#9A9A90",
          muted: "#5A5A55",
        },
        border: {
          DEFAULT: "#2A2A2A",
          strong: "#3A3A3A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
