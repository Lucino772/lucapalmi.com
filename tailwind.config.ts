import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#242424",
        secondary: "#272727",
        "accent-blue": "#4169E1",
      },

      backgroundImage: {
        "gradient-80deg": "linear-gradient(80deg, var(--tw-gradient-stops))",
      },

      animation: {
        "fade-in": "fade 300ms ease-in-out normal forwards",
      },

      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-y": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
