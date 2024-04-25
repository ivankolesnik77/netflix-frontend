import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/app/**/*.tsx",
    "./src/features/**/*.tsx",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      netflix: [
        "Netflix Sans",
        "Helvetica Neue",
        "Segoe UI",
        "Roboto",
        "Ubuntu",
        "sans-serif",
      ],
    },
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      animation: {
        fade: "fadeOut 0.5s ease-in-out",
        scroll: "scroll 40s linear infinite",
      },

      colors: {
        white: "#e5e5e5",
        link: "#0080ff",
        primary: "#333",
        secondary: "#999",
        black: "#393536",
        red: "#c82f27",
      },

      boxShadow: {
        field:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02), 0 0 0 3px hsla(210, 96%, 45%, 25%) , 0 1px 1px 0 rgba(0, 0, 0, 0.08)",
      },

      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 14))" },
        },
        fadeSize: {
          "0%": {
            height: "0",
          },
          "100%": {
            opacity: "100%",
          },
        },
      }),

      backgroundImage: {
        linearGradient:
          "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.68) 44%,#141414 68%,#141414)",
        bannerGradient:
          "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414), url('/images/main-bg-lg.png')",
      },
      fontFamily: {
        sans: ["var(--font-netflix)"],
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
export default config;
